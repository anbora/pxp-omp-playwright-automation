// @ts-nocheck
import { BaseScenario } from "common/BaseScenario";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator, Page } from "common/testing/playwright";

export type PageClass<T extends AbstractBasePage> = new (
  browser: Browser,
  pageHandler: PageHandler,
  logger: Logger,
  portalIndex: number
) => T;

export abstract class AbstractBasePage {
  private static readonly DEFAULT_TIMEOUT_30S = 30000;

  protected page: Page;
  public pageHandler: PageHandler;
  public readonly browser: Browser;
  public logger: Logger;
  protected portalIndex: number;
  public extendedTimeout: Page.WaitForSelectorOptions = new Page.WaitForSelectorOptions().setTimeout(120000);

  constructor(browser: Browser, pageHandler: PageHandler, url: string, logger: Logger, portalIndex: number);
  constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number);
  constructor(
    browser: Browser,
    pageHandler: PageHandler,
    urlOrLogger: string | Logger,
    loggerOrPortalIndex: Logger | number,
    maybePortalIndex?: number
  ) {
    const hasUrl = typeof urlOrLogger === "string";

    this.browser = browser;
    this.pageHandler = pageHandler;
    this.page = pageHandler.getCurrentPage();
    this.logger = hasUrl ? (loggerOrPortalIndex as Logger) : (urlOrLogger as Logger);
    this.portalIndex = hasUrl ? (maybePortalIndex ?? 0) : (loggerOrPortalIndex as number);

    this.page?.setDefaultTimeout?.(AbstractBasePage.DEFAULT_TIMEOUT_30S);

    if (hasUrl) {
      this.page?.navigate?.(urlOrLogger);
      this.logger?.info?.("Navigate to: " + urlOrLogger);
    }
  }

  public getPage(): Page {
    return this.page;
  }

  // Hand the current page to a reusable business scenario and return the next page.
  public run(scenario: BaseScenario<any, any>): any {
    return scenario.run(this);
  }

  public getPageClassInstance<T extends AbstractBasePage>(clazz: PageClass<T>): T {
    return new clazz(this.browser, this.pageHandler, this.logger, this.portalIndex);
  }

  protected openPageInNewTab<T extends AbstractBasePage>(locator: Locator, clazz: PageClass<T>): T {
    const popup = this.page.waitForPopup?.(() => locator.first().click()) ?? this.page;
    popup?.waitForLoadState?.(LoadState.DOMCONTENTLOADED);

    const pageList = this.pageHandler.getPageList() ?? [];
    pageList.push(popup);
    this.pageHandler.setPageList(pageList);
    this.pageHandler.setCurrentPageIndex(this.pageHandler.getCurrentPageIndex() + 1);

    return this.getPageClassInstance(clazz);
  }

  protected goBackToParentPage<T extends AbstractBasePage>(clazz: PageClass<T>): T {
    this.pageHandler.setCurrentPageIndex(Math.max(this.pageHandler.getCurrentPageIndex() - 1, 0));
    return this.getPageClassInstance(clazz);
  }

  protected aiLocator(section: string, locator: string, _element?: string, _elementType?: unknown): Locator;
  protected aiLocator(section: Locator, locator: Locator): Locator;
  protected aiLocator(section: string | Locator, locator: string | Locator): Locator {
    if (typeof section === "string" && typeof locator === "string") {
      return this.page.locator(section).locator(locator).first();
    }

    if (typeof section !== "string" && typeof locator !== "string") {
      return locator.first();
    }

    return typeof locator === "string" ? this.page.locator(locator).first() : locator.first();
  }

  public getLocatorWithParam(locator: string, ...params: string[]): Locator {
    return this.page.locator(String.format(locator, ...params));
  }

  public repeatUntilElementToBeVisible(
    action: () => unknown,
    locator: Locator,
    numberOfRepeats: number,
    _timeToWait: number,
    actionAfterEachFailure: () => unknown
  ): void {
    let attempt = 0;

    while (attempt < numberOfRepeats) {
      attempt += 1;

      try {
        action();
        locator.first().waitFor?.(new Locator.WaitForOptions().setState("visible"));
        return;
      } catch {
        actionAfterEachFailure();
      }
    }
  }

  public repeatUntilElementToBeNotVisible(
    action: () => unknown,
    locator: Locator,
    numberOfRepeats: number,
    _timeToWait: number,
    actionAfterEachFailure: () => unknown
  ): void {
    let attempt = 0;

    while (attempt < numberOfRepeats) {
      attempt += 1;

      try {
        action();
        locator.first().waitFor?.(new Locator.WaitForOptions().setState("detached"));
        return;
      } catch {
        actionAfterEachFailure();
      }
    }
  }

  public pause(timeToWait: number): void {
    void timeToWait;
    void this.page.waitForTimeout?.(timeToWait);
  }

  public forceClear(locator: Locator): void {
    this.page.waitForLoadState?.();
    locator.click?.();
    this.page.waitForLoadState?.();

    if (this.getOperatingSystem().includes("Mac")) {
      this.page.keyboard?.().press?.("Meta+A");
    } else {
      this.page.keyboard?.().press?.("Control+A");
    }

    this.page.keyboard?.().press?.("Delete");
  }

  public forceType(locator: Locator, text: string): void {
    locator.click?.();
    this.page.keyboard?.().type?.(text);
  }

  protected getByRole(role: AriaRole, name?: string | RegExp, exact = false): Locator {
    if (name == null) {
      return this.page.getByRole(role);
    }

    return this.page.getByRole(
      role,
      new Page.GetByRoleOptions().setName(name).setExact(typeof name === "string" ? exact : false)
    );
  }

  protected locator(value: string | Locator): Locator {
    return typeof value === "string" ? this.page.locator(value) : value;
  }

  protected locatorWithParams(selector: string, ...params: string[]): Locator {
    return this.locator(String.format(selector, ...params));
  }

  protected getByLabel(label: string, exact = false): Locator {
    return this.page.getByLabel(label, new Page.GetByLabelOptions().setExact(exact));
  }

  protected getByText(text: string, exact = false): Locator {
    return this.page.getByText(text, new Page.GetByTextOptions().setExact(exact));
  }

  protected getByAltText(altText: string, exact = false): Locator {
    return this.page.getByAltText(altText, new Page.GetByAltTextOptions().setExact(exact));
  }

  protected getByPlaceholder(placeholder: string, exact = false): Locator {
    return this.page.getByPlaceholder(placeholder, new Page.GetByPlaceholderOptions().setExact(exact));
  }

  protected getByTitle(title: string, exact = false): Locator {
    return this.page.getByTitle(title, new Page.GetByTitleOptions().setExact(exact));
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  protected refreshCurrentPage<T extends AbstractBasePage>(clazz: PageClass<T>): T {
    this.page.reload?.();
    return this.getPageClassInstance(clazz);
  }

  private getOperatingSystem(): string {
    return System.getProperty("os.name", "");
  }
}
