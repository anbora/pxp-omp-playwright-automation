import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJobFunctionPage } from "pages/admin/CreateJobFunctionPage";
import { EditJobFunctionPage } from "pages/admin/EditJobFunctionPage";
import { JobFunctionTranslationPage } from "pages/admin/JobFunctionTranslationPage";

export class HrDataJobFunctionsPage extends BasePage {

    public jobFunctionTitleInTable: Locator = this.page.locator("//tr[@class='new-table-row']/child::td/following-sibling::td");
    public addJobFunctionButton: Locator = this.page.locator("//button[text()='Add Job Function']");

    public searchInput: Locator = this.page.locator(".search__container__hr_data > input");

    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");
    public editJobFunctionButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Edit']");
    public translationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Translation']");
    public searchResults: Locator = this.page.locator(".no-records");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddJobFunctionButton(): CreateJobFunctionPage {
        addJobFunctionButton.click();
        return this.getPageClassInstance(CreateJobFunctionPage);
    }

    public clickSearchJobFunction(functionName: string): HrDataJobFunctionsPage {
        searchInput.fill(functionName);
        searchIcon.click();
        return this;
    }

    public clickEditJobFunctionButton(): EditJobFunctionPage {
        editJobFunctionButton.click();
        return this.getPageClassInstance(EditJobFunctionPage);
    }

    public clickJobFunctionTranslationButton(): JobFunctionTranslationPage {
        translationButton.click();
        return this.getPageClassInstance(JobFunctionTranslationPage);
    }
}
