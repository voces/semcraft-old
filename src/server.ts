import { Semcraft as Game } from "./Semcraft.ts";
import { Network } from "./Network.ts";
import { withSemcraft as withGame } from "./semcraftContext.ts";

declare global {
  // deno-lint-ignore no-var no-explicit-any
  var module: any;
}

module.exports = { Game, Network, withGame };
