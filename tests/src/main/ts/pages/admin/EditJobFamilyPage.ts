// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";

export class EditJobFamilyPage extends BasePage {

    public enterJobTitle: Locator = this.page.locator("//html//input[@id='TitleGroup']");

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");
    public deleteJobFamilyButton: Locator = this.page.locator(".delete-button");
    public areYouSureDeleteJobFamilyButton: Locator = this.page.locator(".btn-danger");

    public searchInput: Locator = this.page.locator(".search__container__hr_data > input");

    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public typeEnterJobTitle(familyName: string): EditJobFamilyPage {
        enterJobTitle.click();
        enterJobTitle.fill(familyName);
        return this;
    }

    public clickSaveButton(): HrDataJobFamiliesPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobFamiliesPage);
    }

    public clickDeleteJobFamilyButton(): EditJobFamilyPage {
        deleteJobFamilyButton.click();
        return this.getPageClassInstance(EditJobFamilyPage);
    }
    public clickAreYouSureDeleteJobFamilyButton(): EditJobFamilyPage {
        areYouSureDeleteJobFamilyButton.click();
        return this.getPageClassInstance(EditJobFamilyPage);
    }

     public clickSearchJobFamily(jobTitle: string): HrDataJobFamiliesPage {
        searchInput.fill(jobTitle);
        searchIcon.click();
        return this.getPageClassInstance(HrDataJobFamiliesPage);
    }
}
