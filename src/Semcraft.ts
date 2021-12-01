import {
  Game,
  logLine,
  PathingSystem,
  Terrain,
  ThreeObjectComponent,
} from "webcraft";
import { Network } from "./Network.ts";
import { withSemcraft } from "./semcraftContext.ts";
import { terrain } from "./terrain.ts";

export class Semcraft extends Game {
  readonly isSemcraft = true;

  constructor(network: Network) {
    super(network);

    withSemcraft(this, () => {
      logLine("Creating Semcraft");
      this.terrain = new Terrain(terrain);
      this.terrain.get(ThreeObjectComponent)[0]!.object.scale.z = 0.5;
      this.add(this.terrain);
      this.graphics.panTo(
        { x: terrain.width / 2, y: terrain.height / 2  },
        0,
      );
      this.pathingSystem = new PathingSystem({
        pathing: terrain.pathing,
        layers: terrain.pathingCliffs.slice().reverse(),
        resolution: 2,
      }).addToApp(this);
    });

    this.addNetworkListener("init", (...args) => {
      console.log("init", ...args);
    });
  }
}
