import { Game, logLine } from "webcraft";
import { Network } from "./Network.ts";

export class Semcraft extends Game {
  readonly isSemcraft = true;

  constructor(network: Network) {
    logLine("Creating Semcraft");
    super(network);
  }
}
