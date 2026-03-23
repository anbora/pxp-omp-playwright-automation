import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class TextOptions implements LocatorOptions {
  constructor(private readonly text: string, private readonly exact = false) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.getByText(
      this.text,
      new Locator.GetByTextOptions().setExact(this.exact)
    ).first();
  }
}
