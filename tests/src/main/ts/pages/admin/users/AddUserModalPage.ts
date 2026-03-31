// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { UsersAdminPage } from "pages/admin/users/UsersAdminPage";

export class AddUserModalPage extends BasePage {

    private uploadCsvFileLabel: Locator = this.page.locator("label[for = 'fileInput']");
    private sendWelcomeMessageCheckbox: Locator = this.page.locator("//input[@type = 'checkbox']/parent::label[contains(text(), 'Send Welcome Email')]/input");
    private previewButton: Locator = this.page.locator("//button[text()  = 'Preview']");
    private importButton: Locator = this.page.locator("//button[text()  = 'Import']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public uploadCsvFile(filePath: string): AddUserModalPage {
        this.uploadFile(filePath, uploadCsvFileLabel);
        return this;
    }

    public clickSendWelcomeMessageCheckbox(): AddUserModalPage {
        sendWelcomeMessageCheckbox.click();
        return this;
    }

    public clickPreviewButton(): AddUserModalPage {
        previewButton.click();
        return this;
    }

    public clickImportButton(): UsersAdminPage {
        importButton.click();
        this.pause(10000);
        return this.getPageClassInstance(UsersAdminPage);
    }
}
