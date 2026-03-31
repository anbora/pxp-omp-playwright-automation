// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";

export class UploadHistoryPage extends BasePage {
    public closeUploadHistory: Locator = this.page.locator("//button[contains(text(),'Close')]");
    public uploadHistoryResults: Locator = this.page.locator("//tr/td[contains(text(),'FAMILY_SAMPLE.csv')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickCloseUploadHistory(): HrDataJobFamiliesPage {
        closeUploadHistory.click();
        return this.getPageClassInstance(HrDataJobFamiliesPage);
    }
}
