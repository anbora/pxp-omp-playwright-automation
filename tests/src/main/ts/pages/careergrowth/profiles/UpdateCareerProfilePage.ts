// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";

export class UpdateCareerProfilePage extends BasePage {

    public xButton: Locator = this.page.locator("//button[@class = 'close-btn'][text() = '×']");
    public goToCareerPreferenceTab: Locator = this.page.locator("//ul[@role='list']//button[.='4']");
    public skipForNow: Locator = this.getByText("Skip for now");
    public completeYourProfileModalHeader(): Locator {
      return this.getByRole(AriaRole.HEADING, "Complete your profile");
    }
    public completeYourProfileModalSubHeader(subHeaderName: string): Locator {
      return this.getByText(subHeaderName, true);
    }
    public completeYourProfileModalProgressCount(progressPercentage: string): Locator {
      return this.getByText(progressPercentage + "%");
    }
    public saveAndContinue(): Locator {
      return this.getByText("Save and continue");
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
