// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";

export class ShowInterestModalPage extends BasePage {

    public readonly header: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/child::h1");
    public readonly content: Locator = this.page.locator("//div[@class='confirmation-modal-content__text']");
    public readonly hint: Locator = this.page.locator("//div[@class='confirmation-modal-content__hint']");
    public readonly profileButton: Locator = this.page.locator("//button[text()='Profile']");
    public readonly closeButton: Locator = this.page.locator("//button[text()='Close']");
    public readonly applyButtonMessage: Locator = this.page.locator(".confirmation-modal-content__text");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickProfileButton(): MyOpportunitiesPage {
        profileButton.click();
        return this.getPageClassInstance(MyOpportunitiesPage);
    }

	public clickCloseButton(): JobVacancyDetailsPage {
        this.pause(2000);
        closeButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }
}
