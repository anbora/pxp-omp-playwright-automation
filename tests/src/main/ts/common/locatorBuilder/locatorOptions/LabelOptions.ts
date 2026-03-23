import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class LabelOptions implements LocatorOptions {
  constructor(private readonly label: string, private readonly exact = false) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.getByLabel(
      this.label,
      new Locator.GetByLabelOptions().setExact(this.exact)
    ).first();
  }
}
