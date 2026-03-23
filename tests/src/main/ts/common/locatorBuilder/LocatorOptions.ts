import { Locator } from "common/testing/playwright";

export interface LocatorOptions {
  apply(baseLocator: Locator): Locator;
}
