import { build } from "./build.ts";

const watcher = Deno.watchFs("src");

let building = false;
const rebuild = async () => {
  if (building) return;
  building = true;
  await build();
  building = false;
};

rebuild();

for await (const event of watcher) {
  if (event.kind !== "modify") continue;
  rebuild();
}
