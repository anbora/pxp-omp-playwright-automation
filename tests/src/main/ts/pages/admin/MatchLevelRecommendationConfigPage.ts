import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { OpportunityMarketplaceGeneralPage } from "pages/admin/OpportunityMarketplaceGeneralPage";

export class MatchLevelRecommendationConfigPage extends BasePage {

    public matchLevelLanguage: Locator = this.page.locator("//label[text()='Match level label']/parent::div/following-sibling::div/descendant::div[contains(@class, 'singleValue')]");
    public defaultLabel: Locator = this.page.locator("//label[text()='Default Label']/following-sibling::input");
    public cancelButton: Locator = this.page.locator("//button[text()='Cancel']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickCancelButton(): OpportunityMarketplaceGeneralPage {
        cancelButton.click();
        return this.getPageClassInstance(OpportunityMarketplaceGeneralPage);
    }
}
