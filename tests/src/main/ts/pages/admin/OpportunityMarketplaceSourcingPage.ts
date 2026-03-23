import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class OpportunityMarketplaceSourcingPage extends BasePage {

    public labelsTab: Locator = this.page.locator("//div[@id='talent-marketplace-sourcing-tabs']/ul[@role='tablist']/li[2]/a[@role='tab']");
    public enableSourcing: Locator = this.page.locator("//label[text()='Enable Sourcing']");
    public sourcingON: Locator = this.page.locator("//span[text()='ON']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLabelsButton(): OpportunityMarketplaceSourcingPage {
        labelsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceSourcingPage);
    }
}
