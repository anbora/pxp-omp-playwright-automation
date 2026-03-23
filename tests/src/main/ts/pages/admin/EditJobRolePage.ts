import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJobRolePage } from "pages/admin/CreateJobRolePage";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class EditJobRolePage extends BasePage {

    public enterRoleName: Locator = this.page.locator("//html//input[@id='Title']");

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");
    public jobRoleName: Locator = this.page.locator("tr.new-table-row > td:nth-of-type(2)");
    public selectedLocationFieldValue: Locator = this.page.locator("//label[text()='Geographical Location']/parent::div/div[1]");
    public enterRoleSummary: Locator = this.page.locator(".job-role-form .form-group:nth-of-type(2) [contenteditable]");
    public enterAdditionalDescription: Locator = this.page.locator(".job-role-form .form-group:nth-of-type(4) [contenteditable]");
    public enterRoleDescription: Locator = this.page.locator(".job-role-form .form-group:nth-of-type(3) [contenteditable]");
    public locationValue(value: string): Locator {
      return this.getLocatorWithParam("//div/child::label[text()='Location (Optional)']/parent::div/div/div/div[1]/div[%s]", value);
    }
    public additionalLocationField: Locator = this.page.locator("//div/child::label[text()='Location (Optional)']/parent::div/div/div/div[1]/div[3]");
    public dropdownSelectLocation: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");
    public addNoviceSkills: Locator = this.page.locator("//div[@id='skill-search-Novice']/div/div[1]");
    public typeSkillName: Locator = this.page.locator("//div[@id='skill-search-Novice']/div[1]/div[1]/div/div/input");
    public addSkillValues(skillValue: string): Locator {
      return this.getLocatorWithParam("//div[@id='skill-search-Novice']/div[2]/div/div[text()='%s']", skillValue);
    }
    public maximumNumberOfSkillsMessage: Locator = this.page.locator("//div[@class='modal-body']");
    public closeButton: Locator = this.page.locator("//button[text()='Close']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public typeEnterRoleName(roleName: string): EditJobRolePage {
        enterRoleName.click();
        enterRoleName.fill(roleName);
        return this;
    }

    public clickSaveButton(): HrDataJobRolesPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }

    public addAdditionalLocation(): EditJobRolePage {
        additionalLocationField.click();
        dropdownSelectLocation.click();
        return this;
    }

    public clickCloseButton(): EditJobRolePage {
        closeButton.click();
        return this;
    }

    public tryAddingOneMoreSkill(sixthSkill: string): EditJobRolePage {
        addNoviceSkills.click();
        typeSkillName.fill(sixthSkill);
        this.addSkillValues(sixthSkill).click();
        return this;
    }
}
