import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class PlaceholderOptions implements LocatorOptions {
  constructor(private readonly placeholder: string, private readonly exact = false) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.getByPlaceholder(
      this.placeholder,
      new Locator.GetByPlaceholderOptions().setExact(this.exact)
    ).first();
  }
}
