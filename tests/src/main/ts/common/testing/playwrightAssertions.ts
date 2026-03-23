import { expect } from "./playwright";

class AssertionFacade<T> {
  constructor(private target: T, private inverted = false) {}

  not() {
    return new AssertionFacade(this.target, !this.inverted);
  }

  async containsText(value: unknown, options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toContainText(String(value), options as never);
      return;
    }
    await expect(this.target as never).toContainText(String(value), options as never);
  }

  async hasAttribute(name: string, value?: unknown, options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveAttribute(name, String(value ?? ""), options as never);
      return;
    }
    await expect(this.target as never).toHaveAttribute(name, String(value ?? ""), options as never);
  }

  async hasCSS(name: string, value: unknown) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveCSS(name, String(value));
      return;
    }
    await expect(this.target as never).toHaveCSS(name, String(value));
  }

  async hasClass(value: unknown, options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveClass(value as never, options as never);
      return;
    }
    await expect(this.target as never).toHaveClass(value as never, options as never);
  }

  async hasCount(value: number, options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveCount(value, options as never);
      return;
    }
    await expect(this.target as never).toHaveCount(value, options as never);
  }

  async hasText(value: unknown, options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveText(value as never, options as never);
      return;
    }
    await expect(this.target as never).toHaveText(value as never, options as never);
  }

  async hasURL(value: unknown) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveURL(value as never);
      return;
    }
    await expect(this.target as never).toHaveURL(value as never);
  }

  async hasValue(value: unknown, options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toHaveValue(String(value), options as never);
      return;
    }
    await expect(this.target as never).toHaveValue(String(value), options as never);
  }

  async isEnabled(options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toBeEnabled(options as never);
      return;
    }
    await expect(this.target as never).toBeEnabled(options as never);
  }

  async isChecked(options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toBeChecked(options as never);
      return;
    }
    await expect(this.target as never).toBeChecked(options as never);
  }

  async isDisabled(options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toBeDisabled(options as never);
      return;
    }
    await expect(this.target as never).toBeDisabled(options as never);
  }

  async isEmpty(options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toBeEmpty(options as never);
      return;
    }
    await expect(this.target as never).toBeEmpty(options as never);
  }

  async isHidden(options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toBeHidden(options as never);
      return;
    }
    await expect(this.target as never).toBeHidden(options as never);
  }

  async isVisible(options?: Record<string, unknown>) {
    if (this.inverted) {
      await expect(this.target as never).not.toBeVisible(options as never);
      return;
    }
    await expect(this.target as never).toBeVisible(options as never);
  }
}

export function assertThat<T>(target: T) {
  return new AssertionFacade(target);
}
