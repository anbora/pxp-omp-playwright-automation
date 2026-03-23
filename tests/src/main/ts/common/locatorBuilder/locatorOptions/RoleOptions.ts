import { Locator, AriaRole } from "common/testing/playwright";
import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";

export class RoleOptions implements LocatorOptions {
  constructor(
    private readonly role: AriaRole,
    private readonly name?: string | RegExp,
    private readonly exact = false
  ) {}

  apply(baseLocator: Locator): Locator {
    if (this.name == null) {
      return baseLocator.getByRole(this.role);
    }

    return baseLocator.getByRole(
      this.role,
      new Locator.GetByRoleOptions().setName(this.name).setExact(typeof this.name === "string" ? this.exact : false)
    );
  }
}
