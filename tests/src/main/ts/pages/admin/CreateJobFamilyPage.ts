// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";

export class CreateJobFamilyPage extends BasePage {

    public enterJobTitle: Locator = this.page.locator("//html//input[@id='TitleGroup']");
    public enterFamilyDescription: Locator = this.page.locator("//div[@class='DraftEditor-editorContainer']");
    public jobFamilyInput: Locator = this.page.locator("//div[contains(text(),'Select job function')]");
    public dropdownSelect(functionAndFamilyNameSelectOption: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", functionAndFamilyNameSelectOption);
    }

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public typeEnterJobTitle(JobTitle: string): CreateJobFamilyPage {
        enterJobTitle.click();
        enterJobTitle.fill(JobTitle);
        return this;
    }

    public typeFamilyDescription(FamilyDescription: string): CreateJobFamilyPage {
        enterFamilyDescription.click();
        enterFamilyDescription.pressSequentially(FamilyDescription);
        return this;
    }

    public selectFunction(functionAndFamilyNameSelect: string): CreateJobFamilyPage {
        jobFamilyInput.click();
        jobFamilyInput.pressSequentially(functionAndFamilyNameSelect);
        this.dropdownSelect(functionAndFamilyNameSelect).click();
        return this;
    }

    public clickSaveButton(): HrDataJobFamiliesPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobFamiliesPage);
    }
}
