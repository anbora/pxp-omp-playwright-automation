import type { AbstractBasePage } from "common/AbstractBasePage";

export interface LocatorHelper<T extends AbstractBasePage> {
  getBasePage(): T;
}
