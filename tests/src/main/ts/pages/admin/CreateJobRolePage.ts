import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class CreateJobRolePage extends BasePage {

    public roleNameField: Locator = this.page.locator("//label[text()='Role name*']/following-sibling::input");
    public enterRoleDescription: Locator = this.page.locator(".job-role-form .form-group:nth-of-type(3) [contenteditable]");
     public jobFunctionAndFamily: Locator = this.page.locator("//div[contains(text(),'Select role family from list')]");
    public dropdownSelect(jobFunctionAndFamilyNameOption: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", jobFunctionAndFamilyNameOption);
    }
    public saveButton: Locator = this.page.locator("//button[text()='Save']");
    public jobLevel: Locator = this.page.locator("//div[contains(text(),'Choose job level')]");
    public dropdownSelectJobLevel: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");
    public locationField: Locator = getByText ("Select Geographical Location").build();
    public dropdownSelectLocation: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");
    public enterRoleSummary: Locator = this.page.locator(".job-role-form .form-group:nth-of-type(2) [contenteditable]");
    public enterAdditionalDescription: Locator = this.page.locator(".job-role-form .form-group:nth-of-type(4) [contenteditable]");
    public clickAddNoviceSkills: Locator = this.page.locator("//div[@id='skill-search-Novice']/div[1]/div[1]");
    public typeSkillName: Locator = this.page.locator("//div[@id='skill-search-Novice']/div[1]/div[1]/div/div/input");
    public addSkillValues(skillValue: string): Locator {
      return this.getLocatorWithParam("//div[@id='skill-search-Novice']/div[2]/div/div[text()='%s']", skillValue);
    }
    public maximumNumberOfSkillsMessage: Locator = this.page.locator("//div[@class='modal-body']");
    public closeButton: Locator = this.page.locator("//button[text()='Close']");
    public jobFamilyDropdown: Locator = getByText("Select role family from list").build();
    public jobLevelDropdown: Locator = getByText("Choose job level").build();
    public jobLocationDropdown: Locator = getByText("Select Location", true).build();
    public externalIdText: Locator = getByText("System will auto generate and", true).build();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public typeRoleName(roleName: string): CreateJobRolePage {
        roleNameField.click();
        roleNameField.fill(roleName);
        return this;
    }

    public typeRoleDescription(RoleDescription: string): CreateJobRolePage {
        enterRoleDescription.click();
        enterRoleDescription.fill(RoleDescription);
        return this;
    }

    public typeRoleSummary(RoleSummary: string): CreateJobRolePage {
        enterRoleSummary.click();
        enterRoleSummary.fill(RoleSummary);
        return this;
    }

    public typeAdiitionalDescription(AdditionalDescription: string): CreateJobRolePage {
        enterAdditionalDescription.click();
        enterAdditionalDescription.fill(AdditionalDescription);
        return this;
    }

    public selectFunctionAndFamily(functionName: string, functionAndFamilyName: string): CreateJobRolePage {
        jobFunctionAndFamily.click();
        jobFunctionAndFamily.pressSequentially(functionName);
        this.dropdownSelect(functionAndFamilyName).click();
        return this;
    }

    public clickSaveButton(): HrDataJobRolesPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }

    public clickCloseButton(): CreateJobRolePage {
        closeButton.click();
        return this;
    }

    public clickJobLevelDropdown(): CreateJobRolePage {
        jobLevel.click();
        dropdownSelectJobLevel.click();
        return this;
    }

    public clickLocationDropdown(): CreateJobRolePage {
        locationField.click();
        dropdownSelectLocation.click();
        return this;
    }

    public addSkillsToTheJobRole(skillName: string): CreateJobRolePage {
    clickAddNoviceSkills.click();
    typeSkillName.fill(skillName);
    this.addSkillValues(skillName).click();
    return this;
    }

    public selectJobFamily(partialName: string, familyName: string): CreateJobRolePage {
        jobFamilyDropdown.click();
        jobFamilyDropdown.pressSequentially(partialName);
        this.pause(3000);
        this.dropdownSelect(familyName).click();
        return this;
    }

    public selectJobLevel(levelName: string): CreateJobRolePage {
        jobLevelDropdown.click();
        this.dropdownSelect(levelName).click();
        return this;
    }

    public selectJobLocation(partialName: string, locationName: string): CreateJobRolePage {
        jobLocationDropdown.click();
        jobLocationDropdown.pressSequentially(partialName);
        this.pause(3000);
        this.dropdownSelect(locationName).click();
        return this;
    }
}
