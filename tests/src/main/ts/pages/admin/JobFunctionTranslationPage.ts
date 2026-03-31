// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";

export class JobFunctionTranslationPage extends BasePage {

    public language: Locator = this.page.locator("//div[@class='css-1hwfws3']");
    public dropdownSelect: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");
    public functionName: Locator = this.page.locator("//label[text()='Function name']/following-sibling::input");
    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickTranslationDropdown(): JobFunctionTranslationPage {
        language.click();
        dropdownSelect.click();
        return this;
    }

    public typeEnterFunctionName(JobFunction: string): JobFunctionTranslationPage {
        functionName.click();
        functionName.type(JobFunction);
        return this;
    }

    public clickJobFunctionSaveButton(): HrDataJobFunctionsPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobFunctionsPage);
    }
}
