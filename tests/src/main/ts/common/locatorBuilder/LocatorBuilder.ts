import { LocatorOptions } from "common/locatorBuilder/LocatorOptions";
import { AltTextOptions } from "common/locatorBuilder/locatorOptions/AltTextOptions";
import { FilterOptions } from "common/locatorBuilder/locatorOptions/FilterOptions";
import { LabelOptions } from "common/locatorBuilder/locatorOptions/LabelOptions";
import { LocOptions } from "common/locatorBuilder/locatorOptions/LocOptions";
import { PlaceholderOptions } from "common/locatorBuilder/locatorOptions/PlaceholderOptions";
import { RoleOptions } from "common/locatorBuilder/locatorOptions/RoleOptions";
import { TestIdOptions } from "common/locatorBuilder/locatorOptions/TestIdOptions";
import { TextOptions } from "common/locatorBuilder/locatorOptions/TextOptions";
import { TitleOptions } from "common/locatorBuilder/locatorOptions/TitleOptions";
import { Logger } from "common/testing/logger";
import { AriaRole, Locator, Page } from "common/testing/playwright";

export class LocatorBuilder {
  private readonly options: LocatorOptions[] = [];

  constructor(
    private readonly baseLocator: Locator,
    private readonly page: Page,
    private readonly logger: Logger
  ) {
    void this.page;
    void this.logger;
  }

  public locator(value: string | Locator): LocatorBuilder {
    this.options.push(new LocOptions(value));
    return this;
  }

  public locatorWithParams(selector: string, ...params: string[]): LocatorBuilder {
    this.options.push(new LocOptions(String.format(selector, ...params)));
    return this;
  }

  public getByAltText(altText: string, exact = false): LocatorBuilder {
    this.options.push(new AltTextOptions(altText, exact));
    return this;
  }

  public getByLabel(label: string, exact = false): LocatorBuilder {
    this.options.push(new LabelOptions(label, exact));
    return this;
  }

  public getByPlaceholder(placeholder: string, exact = false): LocatorBuilder {
    this.options.push(new PlaceholderOptions(placeholder, exact));
    return this;
  }

  public getByRole(role: AriaRole, text?: string | RegExp, exact = false): LocatorBuilder {
    this.options.push(new RoleOptions(role, text, exact));
    return this;
  }

  public getByTestId(testId: string): LocatorBuilder {
    this.options.push(new TestIdOptions(testId));
    return this;
  }

  public getByText(text: string, exact = false): LocatorBuilder {
    this.options.push(new TextOptions(text, exact));
    return this;
  }

  public getByTitle(title: string, exact = false): LocatorBuilder {
    this.options.push(new TitleOptions(title, exact));
    return this;
  }

  public filter(value: string | Locator, has = true): LocatorBuilder {
    this.options.push(new FilterOptions(value, has));
    return this;
  }

  public build(_parentLocator?: Locator): Locator {
    let currentLocator = this.baseLocator;

    for (const option of this.options) {
      currentLocator = option.apply(currentLocator);
    }

    return currentLocator;
  }
}
