import {
  processArena,
  stringMapWithRamps as _stringMapWithRamps,
} from "webcraft";

const stringMapWithRamps: typeof _stringMapWithRamps = (s) =>
  _stringMapWithRamps(s).map((r) =>
    r.map((v) => typeof v === "string" ? v : v * 2)
  );

const { tiles: _, ..._terrain } = processArena({
  name: "Semcraft",
  cliffs: stringMapWithRamps(`
    0000000
    0111110
    0111110
    02r1110
    0111110
    0111110
    0000000`),
  tiles: [],
});

console.log(_terrain);

export const terrain = _terrain;
