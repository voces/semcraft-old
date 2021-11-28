import { Semcraft } from "./Semcraft.ts";
import { Network } from "./Network.ts";

declare global {
  // deno-lint-ignore no-var
  var game: Semcraft;
}

globalThis.game = new Semcraft(new Network());
