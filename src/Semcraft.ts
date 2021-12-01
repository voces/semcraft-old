import { Game, logLine, PathingSystem } from "webcraft";
import { Network } from "./Network.ts";
import { withSemcraft } from "./semcraftContext.ts";
import { makeTerrain } from "./Terrain.ts";

export class Semcraft extends Game {
  readonly isSemcraft = true;

  constructor(network: Network) {
    super(network);

    withSemcraft(this, () => {
      logLine("Creating Semcraft");

      this.add(makeTerrain());

      this.graphics.panTo(
        { x: 0, y: 1 },
        0,
      );

      this.pathingSystem = new PathingSystem({
        pathing: Array(99).fill(0).map(() => Array(99).fill(0)),
        layers: Array(99).fill(0).map(() => Array(99).fill(0)),
        resolution: 2,
      }).addToApp(this);
    });

    this.addNetworkListener("init", (...args) => {
      console.log("init", ...args);
    });
  }
}
