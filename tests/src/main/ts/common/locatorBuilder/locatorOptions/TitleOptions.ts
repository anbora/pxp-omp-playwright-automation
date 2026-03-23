import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class TitleOptions implements LocatorOptions {
  constructor(private readonly title: string, private readonly exact = false) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.getByTitle(
      this.title,
      new Locator.GetByTitleOptions().setExact(this.exact)
    ).first();
  }
}
