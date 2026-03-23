import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { ShowInterestModalPage } from "pages/careergrowth/jobs/ShowInterestModalPage";

export class RecruitmentPlatformPage extends BasePage {

    public header: Locator = this.page.locator("//span[@id='headerlabel1']");
    public jobTitle: Locator = this.page.locator("//span[@id='headerlabel1']/following-sibling::span");

	public goBackToJobVacancyDetailsPage(): ShowInterestModalPage {
        this.page.goBack();
        return this.getPageClassInstance(ShowInterestModalPage);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
