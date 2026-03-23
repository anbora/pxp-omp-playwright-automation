import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class FilterOptions implements LocatorOptions {
  constructor(
    private readonly value: string | Locator,
    private readonly has = true
  ) {}

  apply(baseLocator: Locator): Locator {
    const options = new Locator.FilterOptions();

    if (typeof this.value === "string") {
      if (this.has) {
        options.setHasText(this.value);
      } else {
        options.setHasNotText(this.value);
      }
    } else if (this.has) {
      options.setHas(this.value);
    } else {
      options.setHasNot(this.value);
    }

    return baseLocator.filter(options).first();
  }
}
