// @ts-nocheck
import { BasePage } from "common/BasePage";
import { assertEquals, assertFalse, assertNotEquals, assertTrue } from "common/testing/runtime";

export abstract class BaseAssertion<T extends BasePage> {
  protected page!: T;
  protected readonly isVisibleOptions = { timeout: 30000 };
  protected readonly extendedIsVisibleOptions = { timeout: 60000 };
  protected readonly isNotVisibleOptions = { timeout: 5000 };
  protected readonly containsTextOptions = { timeout: 30000 };
  protected readonly hasClassOptions = { timeout: 30000 };
  protected readonly hasValueOptions = { timeout: 30000 };
  protected readonly hasCountOptions = { timeout: 30000 };
  protected readonly hasAttributeOptions = { timeout: 30000 };

  public setPage(page: T): void {
    page.logger.info(page.constructor.name + " checking has begun.");
    this.page = page;
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
