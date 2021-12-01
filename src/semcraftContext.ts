import { currentApp, withApp, wrapApp } from "webcraft";

import type { Semcraft } from "./Semcraft.ts";
import { isSemcraft } from "./typeguards.ts";

export const withSemcraft = <T>(
  semcraft: Semcraft,
  fn: (semcraft: Semcraft) => T
): T => withApp(semcraft, fn);

export const wrapSemcraft = <Args extends unknown[], Return extends unknown>(
  semcraft: Semcraft,
  fn: (...args: Args) => Return
): ((...args: Args) => Return) => wrapApp(semcraft, fn);

export const currentSemcraft = (): Semcraft => {
  const app = currentApp();
  if (!isSemcraft(app)) throw new Error("Expected a Semcraft context");
  return app;
};
