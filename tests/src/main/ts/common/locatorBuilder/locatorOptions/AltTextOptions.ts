import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class AltTextOptions implements LocatorOptions {
  constructor(private readonly altText: string, private readonly exact = false) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.getByAltText(
      this.altText,
      new Locator.GetByAltTextOptions().setExact(this.exact)
    ).first();
  }
}
