import { BasePage } from "common/BasePage";
import { LocatorAssertions } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertEquals, assertFalse, assertNotEquals, assertTrue } from "common/testing/runtime";

export abstract class BaseAssertion<T extends BasePage> {
  protected page!: T;
  protected isVisibleOptions: LocatorAssertions.IsVisibleOptions = new LocatorAssertions.IsVisibleOptions().setTimeout(30000);
  protected extendedIsVisibleOptions: LocatorAssertions.IsVisibleOptions = new LocatorAssertions.IsVisibleOptions().setTimeout(60000);
  protected isNotVisibleOptions: LocatorAssertions.IsVisibleOptions = new LocatorAssertions.IsVisibleOptions().setTimeout(5000);
  protected containsTextOptions: LocatorAssertions.ContainsTextOptions = new LocatorAssertions.ContainsTextOptions().setTimeout(30000);
  protected hasClassOptions: LocatorAssertions.HasClassOptions = new LocatorAssertions.HasClassOptions().setTimeout(30000);
  protected hasValueOptions: LocatorAssertions.HasValueOptions = new LocatorAssertions.HasValueOptions().setTimeout(30000);
  protected hasCountOptions: LocatorAssertions.HasCountOptions = new LocatorAssertions.HasCountOptions().setTimeout(30000);
  protected hasAttributeOptions: LocatorAssertions.HasAttributeOptions = new LocatorAssertions.HasAttributeOptions().setTimeout(30000);

  public endAssertion(): T {
    return this.page;
  }

  public setPage(page: T): void {
    page.logger.info(page.constructor.name + " checking has begun.");
    this.page = page;
  }

  protected assertThat(target: unknown) {
    return assertThat(target);
  }

  protected assertTrue(value: unknown, message?: string) {
    assertTrue(value, message);
  }

  protected assertFalse(value: unknown, message?: string) {
    assertFalse(value, message);
  }

  protected assertEquals(actual: unknown, expected: unknown, message?: string) {
    assertEquals(actual, expected, message);
  }

  protected assertNotEquals(actual: unknown, expected: unknown, message?: string) {
    assertNotEquals(actual, expected, message);
  }
}
