import type { UnitProps } from "webcraft";
import { PathingComponent, Unit } from "webcraft";

export class Character extends Unit {
  constructor(props: UnitProps) {
    super(props);
    new PathingComponent(this);
  }
}
