import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class JobRolesUploadHistoryPage extends BasePage {
    public closeUploadHistory: Locator = this.page.locator("//button[contains(text(),'Close')]");
    public uploadHistoryResults: Locator = this.page.locator("//tr/td[contains(text(),'ROLE_SAMPLE.csv')]");
    public uploadHistoryResultsSuccess: Locator = this.page.locator("//tr[1]/td[5]/div/div[@class='omp-status-indicator']/span[@class='omp-status-completed omp-status']");
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public clickCloseUploadHistory(): HrDataJobRolesPage {
        closeUploadHistory.click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }
}
