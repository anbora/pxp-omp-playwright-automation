import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJobFamilyPage } from "pages/admin/CreateJobFamilyPage";
import { EditJobFamilyPage } from "pages/admin/EditJobFamilyPage";
import { JobFamilyTranslationPage } from "pages/admin/JobFamilyTranslationPage";
import { UploadCsvPage } from "pages/admin/UploadCsvPage";
import { UploadHistoryPage } from "pages/admin/users/UploadHistoryPage";

export class HrDataJobFamiliesPage extends BasePage {

    public addJobFamilyButton: Locator = this.page.locator("//button[contains(text(),'Add Job Family')]");
    public searchInput: Locator = this.page.locator(".search__container__hr_data > input");
    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");
    public familyName: Locator = this.page.locator("tr.new-table-row > td:nth-of-type(2)");
    public editJobFamilyButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Edit']");
    public translationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Translation']");
    public uploadCsvButton: Locator = this.page.locator("//button[contains(text(),'Upload CSV')]");
    public searchResults: Locator = this.page.locator(".no-records");
    public uploadHistoryButton: Locator = this.page.locator("//button[contains(text(),'Upload History')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddJobFamilyButton(): CreateJobFamilyPage {
        addJobFamilyButton.click();
        return this.getPageClassInstance(CreateJobFamilyPage);
    }

    public clickSearchJobFamily(familyName: string): HrDataJobFamiliesPage {
        searchInput.fill(familyName);
        searchIcon.click();
        return this;
    }

    public clickEditJobFamilyButton(): EditJobFamilyPage {
        editJobFamilyButton.click();
        return this.getPageClassInstance(EditJobFamilyPage);
    }

    public clickTranslationButton(): JobFamilyTranslationPage {
        translationButton.click();
        return this.getPageClassInstance(JobFamilyTranslationPage);

    }

    public clickUploadCsvButton(): UploadCsvPage {
        uploadCsvButton.click();
        return this.getPageClassInstance(UploadCsvPage);

    }
    public clickUploadHistoryButton(): UploadHistoryPage {
        uploadHistoryButton.click();
        return this.getPageClassInstance(UploadHistoryPage);
    }
}
