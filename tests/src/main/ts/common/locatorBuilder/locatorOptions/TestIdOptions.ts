import { Locator } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class TestIdOptions implements LocatorOptions {
  constructor(private readonly testId: string) {}

  apply(baseLocator: Locator): Locator {
    return baseLocator.getByTestId(this.testId).first();
  }
}
