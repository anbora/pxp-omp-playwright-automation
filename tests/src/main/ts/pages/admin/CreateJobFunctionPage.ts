// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";

export class CreateJobFunctionPage extends BasePage {

    public functionNameField: Locator = this.page.locator("//label[text()='Function name*']/following-sibling::input");
    public saveButton: Locator = this.page.locator("//button[text()='Save']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public typeFunctionName(functionName: string): CreateJobFunctionPage {
        functionNameField.click();
        functionNameField.fill(functionName);
        return this.getPageClassInstance(CreateJobFunctionPage);
    }

    public clickSaveButton(): HrDataJobFunctionsPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobFunctionsPage);
    }
}
