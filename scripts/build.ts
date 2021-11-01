import { green, gray } from "std/fmt/colors.ts";

const byteLevels = ["B", "KiB", "MiB", "GiB"];
const formatBytes = (num: number) => {
  let levels = 0;
  while (num > 1024) {
    num = num / 1024;
    levels++;
  }
  return [
    num > 1000 ? Math.round(num) : Math.round(num * 100) / 100,
    byteLevels[levels],
  ];
};

const compilerOptions = JSON.parse(
  await Deno.readTextFile("./tsconfig.json")
).compilerOptions;

const genericBuild = async (source: "index" | "server") => {
  console.log(green("Bundle"), `src/${source}.ts`);
  const res = await Deno.emit(`src/${source}.ts`, {
    bundle: "module",
    importMapPath: "./importMap.json",
    compilerOptions,
  });

  const filePathTransform = (path: string) =>
    path.replace("deno:///", "public/").replace("bundle", source);

  if (res.diagnostics.length) {
    console.warn(Deno.formatDiagnostics(res.diagnostics));
    console.log();
  }

  await Promise.all(
    Object.entries(res.files)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, content]) => {
        const finalPath = path
          .replace("deno:///", "public/")
          .replace("bundle", source);

        const mapPath = path + ".map";
        if (mapPath in res.files) {
          content += `\n//# sourceMappingURL=./${mapPath
            .replace("deno:///", "")
            .replace("bundle", source)}`;
        }

        const [value, unit] = formatBytes(content.length);
        console.log(green("Emit"), finalPath, `(${gray(`${value}${unit}`)})`);

        return Deno.writeTextFile(filePathTransform(finalPath), content);
      })
  );
};

export const build = () =>
  Promise.all([genericBuild("index"), genericBuild("server")]);

if (import.meta.main) {
  build();
}
