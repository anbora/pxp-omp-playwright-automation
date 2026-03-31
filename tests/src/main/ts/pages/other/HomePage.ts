// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class HomePage extends BasePage {

    public errorMessage: Locator = this.page.locator("//div/p[text()='Sorry, we cannot display requested content.']");
    public configureHomePageButton: Locator = this.page.locator("//button[@aria-label='Configure Home Page']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
