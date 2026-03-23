import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";

export class JobFamilyTranslationPage extends BasePage {

    public language: Locator = this.page.locator("//div[@class='css-1hwfws3']");
    public dropdownSelect: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");
    public familyName: Locator = this.page.locator("div:nth-of-type(3) > input");
    public familyDescription: Locator = this.page.locator("div[role='textbox']");

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");
    public translationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Translation']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickTranslationButton(): JobFamilyTranslationPage {
        translationButton.click();
        return this.getPageClassInstance(JobFamilyTranslationPage);

    }
    public clickTranslationDropdown(): JobFamilyTranslationPage {
        language.click();
        dropdownSelect.click();
        return this;
    }
    public typeEnterFamilyName(JobTitle: string): JobFamilyTranslationPage {
        familyName.click();
        familyName.fill(JobTitle);
        return this;
    }
    public typeEnterFamilyDescription(FamilyDescription: string): JobFamilyTranslationPage {
        familyDescription.click();
        familyDescription.fill(FamilyDescription);
        return this;
    }
    public clickSaveButton(): HrDataJobFamiliesPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobFamiliesPage);
    }
}
