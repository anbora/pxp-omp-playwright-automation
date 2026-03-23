import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class HrDataJobRolesUploadCsvPage extends BasePage {

    private uploadCsvFileLabel: Locator = this.page.locator("//label[contains(text(),'Submit File')]");
    public submitCsvButton: Locator = this.page.locator("//button[contains(text(),'Submit')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public uploadCsvFile(filePath: string): HrDataJobRolesUploadCsvPage {
        this.uploadFile(filePath, uploadCsvFileLabel);
        return this;
    }

    public clickSubmitCsvButton(): HrDataJobRolesPage {
        submitCsvButton.click();
        this.pause(10000);
        return this.getPageClassInstance(HrDataJobRolesPage);

    }
}
