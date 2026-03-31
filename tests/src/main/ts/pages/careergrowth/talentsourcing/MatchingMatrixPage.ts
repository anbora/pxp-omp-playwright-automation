// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { TalentSourcingPage } from "pages/careergrowth/talentsourcing/TalentSourcingPage";

export class MatchingMatrixPage extends BasePage {

    public matchingSkill: Locator = this.getByRole(AriaRole.HEADING, "Matching skills");
    public getFirstMatchingSkills: Locator = this.page.locator("//div[@class='ed-table-wrapper ']/table/tbody/tr[2]");

    public closeButton: Locator = this.page.locator("//button[text()='Close']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickOnCloseButton(): TalentSourcingPage {
        closeButton.click();
        return this.getPageClassInstance(TalentSourcingPage);
    }
}
