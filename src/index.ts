import { Semcraft } from "./Semcraft.ts";
import { Network } from "./Network.ts";

declare global {
  var game: Semcraft;
}

globalThis.game = new Semcraft(new Network());
