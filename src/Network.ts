import { Emitter, Network as WebcraftNetwork } from "webcraft";
import type {
  InitEvent as WebcraftInitEvent,
  StateEvent as WebcraftStateEvent,
} from "webcraft";
import type { Semcraft } from "./Semcraft.ts";

interface InitEvent extends WebcraftInitEvent {
  state: ReturnType<Semcraft["toJSON"]>;
}

interface StateEvent extends WebcraftStateEvent {
  state: ReturnType<Semcraft["toJSON"]>;
}

export type NetworkEventCallbacks = {
  init: (data: InitEvent) => void;
  state: (data: StateEvent) => void;
};

export class Network extends WebcraftNetwork
  implements Emitter<NetworkEventCallbacks> {
  static networkEvents = new Proxy({}, {
    has: () => true,
  });
}
