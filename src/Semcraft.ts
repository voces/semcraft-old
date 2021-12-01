import {
  ConnectionEvent,
  Entity,
  Game,
  logLine,
  nextColor,
  PathingSystem,
  Player,
  releaseColor,
  takeColor,
} from "webcraft";
import { Network, NetworkEventCallbacks } from "./Network.ts";
import { withSemcraft } from "./semcraftContext.ts";
import { Terrain } from "./entities/Terrain.ts";
import { ForPlayer } from "./components/ForPlayer.ts";

export class Semcraft extends Game {
  readonly isSemcraft = true;
  static protocol = "semcraft";
  static displayName = "Semcraft";

  // swc doesn't support this correctly...
  // declare addNetworkListener: Emitter<
  //   NetworkEventCallbacks
  // >["addEventListener"];
  // declare removeNetworkListener: Emitter<
  //   NetworkEventCallbacks
  // >["removeEventListener"];

  constructor(network: Network) {
    super(network);

    withSemcraft(this, () => {
      logLine("Creating Semcraft");

      this.add(new Terrain());

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

    // swc doesn't support 'declare property' syntax correctly.
    // deno-lint-ignore no-explicit-any
    this.addNetworkListener("init", (e) => this.onInit(e as any));
  }

  private onInit: NetworkEventCallbacks["init"] = (
    { connections, state: { entityId, players } },
  ) => {
    if (connections === 0) this.synchronizationState = "synchronized";

    this.entityId = entityId;

    players.forEach(({ color, id, ...playerData }) => {
      const player = this.players.find((p) => p.id === id) ??
        new Player({ ...playerData, id, game: this });

      if (
        color !== undefined &&
        (!player.color || player.color.index !== color)
      ) {
        if (player.color) releaseColor(player.color);
        player.color = takeColor(color);
      }
    });
    this.players.sort((a, b) => a.id - b.id);
  };

  onPlayerJoin(data: ConnectionEvent): Player {
    const player = new Player({
      color: nextColor(),
      game: this,
      id: data.connection,
      username: data.username,
    });

    return player;
  }

  onPlayerLeave(player: Player): void {
    super.onPlayerLeave(player);
    player.sprites.forEach((s) => s.remove());

    // Clear all entities, except terrain, if no players left
    if (this.players.every((s) => s.id < 0)) {
      for (const entity of this.entities) {
        if (entity.id !== "TERRAIN") this.remove(entity);
      }
    }

    // Otherwise clear out the player's entities
    for (const entity of this.entities) {
      const forPlayer = entity.get(ForPlayer)[0];
      if (forPlayer && forPlayer.player === player) this.remove(entity);
    }
  }

  toJSON(): ReturnType<Game["toJSON"]> & {
    entities: ReturnType<Entity["toJSON"]>[];
  } {
    return {
      ...super.toJSON(),
      entities: this.entities.map((e) => e.toJSON()),
    };
  }
}
