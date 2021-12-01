import type { Entity, Mutable, Player } from "webcraft";
import { Component } from "webcraft";
import { currentSemcraft } from "../semcraftContext.ts";

export class ForPlayer extends Component<[player: Player]> {
  readonly player!: Player;

  initialize(player: Player): void {
    // deno-lint-ignore no-this-alias
    const mutable: Mutable<ForPlayer> = this;
    mutable.player = player;
  }

  toJSON(): { type: string; player: number } {
    return { type: this.constructor.name, player: this.player.id };
  }

  static fromJSON(entity: Entity, { player }: { player: number }): ForPlayer {
    const semcraft = currentSemcraft();
    return new ForPlayer(
      entity,
      semcraft.players.find((p) => p.id === player)!,
    );
  }
}
