// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";

export class EditJobFunctionPage extends BasePage {

    public enterJobFunction: Locator = this.page.locator("//label[text()='Function name*']/following-sibling::input");

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");
    public deleteJobFunctionButton: Locator = this.page.locator(".delete-button");
    public areYouSureDeleteJobFunctionButton: Locator = this.page.locator(".btn-danger");

    public searchInput: Locator = this.page.locator(".search__container__hr_data > input");

    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public typeEnterJobFunction(functionNameAfterEdit: string): EditJobFunctionPage {
        enterJobFunction.click();
        enterJobFunction.type(functionNameAfterEdit);
        return this;
    }

    public clickSaveButton(): HrDataJobFunctionsPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobFunctionsPage);
    }
    public clickDeleteJobFunctionButton(): EditJobFunctionPage {
        deleteJobFunctionButton.click();
        return this.getPageClassInstance(EditJobFunctionPage);
    }
    public clickAreYouSureDeleteJobFunctionButton(): EditJobFunctionPage {
        areYouSureDeleteJobFunctionButton.click();
        return this.getPageClassInstance(EditJobFunctionPage);
    }
    public clickSearchJobFunction(jobTitle: string): HrDataJobFunctionsPage {
        searchInput.fill(jobTitle);
        searchIcon.click();
        return this.getPageClassInstance(HrDataJobFunctionsPage);
    }
}
