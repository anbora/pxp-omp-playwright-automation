import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class LocOptions implements LocatorOptions {
  constructor(private readonly value: string | Locator) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.locator(this.value).first();
  }
}
