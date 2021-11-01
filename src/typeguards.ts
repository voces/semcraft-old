import { App } from "webcraft";
import { Semcraft } from "./Semcraft.ts";

export const isSemcraft = (value: App): value is Semcraft =>
  "isSemcraft" in value.constructor;
