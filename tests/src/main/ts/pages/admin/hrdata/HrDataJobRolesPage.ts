import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJobRolePage } from "pages/admin/CreateJobRolePage";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";
import { HrDataJobRolesUploadCsvPage } from "pages/admin/hrdata/HrDataJobRolesUploadCsvPage";
import { JobRolesUploadHistoryPage } from "pages/admin/JobRolesUploadHistoryPage";
import { NextJobRolesGenerationalStatusPage } from "pages/admin/NextJobRolesGenerationalStatusPage";
import { EditJobRolePage } from "pages/admin/users/EditJobRolePage";
import { JobRoleTranslationPage } from "pages/admin/users/JobRoleTranslationPage";

export class HrDataJobRolesPage extends BasePage {
    public addJobRoleButton: Locator = this.page.locator("//button[contains(text(),'Add Job Role')]");
    public searchInput: Locator = this.page.locator(".search__container__hr_data > input");
    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");
    public jobRoleName: Locator = this.page.locator("tr.new-table-row > td:nth-of-type(2)");
    public editJobRoleButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Edit']");
    public translationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Translation']");
    public threeDotsButton: Locator = this.page.locator("//button[@id='role-dropdown']/span[@class='icon-fontello-dot-3']");
    public nextRoleGenerationalStatusButton: Locator = this.page.locator("[aria-labelledby='role-dropdown'] [href]");
    public roleName: Locator = this.page.locator("div:nth-of-type(3) > input");
     public uploadCsvButton: Locator = this.page.locator("//button[contains(text(),'Upload CSV')]");
    public searchResults: Locator = this.page.locator(".new-table-row td:nth-of-type(2) span");
    public uploadHistoryButton: Locator = this.page.locator("//button[contains(text(),'Upload History')]");
    public jobRoleTitleInTable: Locator = this.page.locator("//tr[@class='new-table-row']/child::td/following-sibling::td");
    public submenu(menu: string): Locator {
      return this.getLocatorWithParam("//li[contains(@class, 'open')]/descendant::span[text()='%s']/parent::a", menu);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddJobRoleButton(): CreateJobRolePage {
        addJobRoleButton.click();
        return this.getPageClassInstance(CreateJobRolePage);
    }

    public clickSearchJobRole(jobRoleName: string): HrDataJobRolesPage {
        searchInput.fill(jobRoleName);
        searchIcon.click();
        return this;
    }

    public clickEditJobRoleButton(): EditJobRolePage {
        editJobRoleButton.click();
        return this.getPageClassInstance(EditJobRolePage);
    }

    public clickTranslationButton(): JobRoleTranslationPage {
        translationButton.click();
        return this.getPageClassInstance(JobRoleTranslationPage);

    }

    public clickThreeDotsButton(): HrDataJobRolesPage {
        threeDotsButton.click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }

    public clickNextRoleGenerationalStatusButton(): NextJobRolesGenerationalStatusPage {
        nextRoleGenerationalStatusButton.click();
        return this.getPageClassInstance(NextJobRolesGenerationalStatusPage);
    }

    public clickUploadCsvButton(): HrDataJobRolesUploadCsvPage {
        uploadCsvButton.click();
        return this.getPageClassInstance(HrDataJobRolesUploadCsvPage);

    }
    public clickUploadHistoryButton(): JobRolesUploadHistoryPage {
        uploadHistoryButton.click();
        return this.getPageClassInstance(JobRolesUploadHistoryPage);
    }

    public openMenuForHrConfiguration(): HrDataConfigurationPage {
        this.submenu("Configuration").click();
        return this.getPageClassInstance(HrDataConfigurationPage);
    }
}
