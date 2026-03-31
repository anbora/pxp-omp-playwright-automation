// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class HrDataConfigurationPage extends BasePage {
    public LOCATIONS_TAB(): Locator {
      return this.locator(".container-fluid");
    }
    public jobRoleConfigurationTitle: Locator = this.page.locator("//h4[normalize-space()='Job Role Configuration']");
    public organizationConfigurationTitle: Locator = this.page.locator("//a[contains(text(),'Organization')]");
    public organizationConfiguration: Locator = this.page.locator("//h4[text()='Organization Unit Configuration']");
    public automaticallyAssignDetectedSkillsToJobRoles: Locator = this.page.locator("//div[text()='Automatically assign detected skills to job roles']");
    public automaticallyAssignDetectedSkillsToJobRolesToggle: Locator = this.page.locator("(//input[@type='checkbox']/following-sibling::div)[2]");
    public overRideDetectedSkillsAssociatedForJobRoleUpdate: Locator = this.page.locator("(//input[@type='checkbox']/following-sibling::div)[1]");
    public detectedSkillLevel: Locator = this.page.locator("//p[text()='Detected skills level']\n");
    public detectedSkillsInput: Locator = this.page.locator("//p[text()='Detected skills level']/parent::div//div[contains(@class, 'control')]");
    public beginnerLevel: Locator = this.page.locator("//label[text()='Beginner']");
    public intermediateLevel: Locator = this.page.locator("//label[text()='Intermediate']");
    public advanceLevel: Locator = this.page.locator("//label[text()='Advanced']");
    public maximumNumberOfSkillsAssignedToJobRole: Locator = this.page.locator("//p[text()='Maximum number of skills assigned to job role']");
    public allowedRange: Locator = this.page.locator("//div[text()='Allowed range 1 to 50']");
    public automaticallyAssignDetectedNextRolesToJobRoles: Locator = this.page.locator("//div[text()='Automatically assign detected next roles to job roles']");
    public overRideRecalculatedNextRolesAssociatedForJobRoles: Locator = this.page.locator("//div[text()='Override recalculated Next Roles associated for Job roles']");
    public maximumNumberOfNextRolesAssociatedToJobRole: Locator = this.page.locator("//p[text()='Maximum number of next roles associated to job role']");
    public enableCareerPath: Locator = this.page.locator("//div[text()='Enable career path']");
    public enableOrganization: Locator = this.page.locator("(//div[@class='enable-org']//div)[1]");
    public usage: Locator = this.page.locator("(//div[@class='usage']//div)[1]");
    public organizationLevelValuesToBeDisplayed: Locator = this.page.locator("(//div[@class='usage']//div)[1]");
    public organizationTypeDisplayedOnTheOpportunityCard: Locator = this.page.locator("(//div[@class='usage']//div)[1]");
    public locations: Locator = this.getByRole(AriaRole.TAB, "Locations");
    public locationsConfiguration: Locator = this.page.locator("(//h4[@class='hrData-config-header'])[3]");
    public proficiencyLevels: Locator = this.page.locator("//div[@class='hrData-config-radio-skills']//div[contains(@id, 'select')]");
    public jobRoleFilter: Locator = this.page.locator("//p[text()='Job Role filter']");
    public jobRoleFilterCorrect: Locator = this.page.locator("//input[@id='job_role_filter'][@value='2']");
    public inputTypeNumber: Locator = this.page.locator("//input[@id='job_role_filter']");
    public organizationUnitType: Locator = this.page.locator("div:nth-of-type(2) > .rubix-panel-container-with-controls > .rubix-panel-container .css-s2j4wf-container .css-16pqwjk-indicatorContainer > .css-19bqh2r");
    public dropdownSelect(organizationUnitTypeDropdown: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", organizationUnitTypeDropdown);
    }
    public saveButton: Locator = this.page.locator("//div[2]/div[@class='rubix-panel-container-with-controls']//button[@type='button']");
    public association(associationLabel: string): Locator {
      return this.getLocatorWithParam("//div[@class='usage']/div[@class='form-group']/label[text()='%s']", associationLabel);
    }
    public specifyAssociation: Locator = this.page.locator("//p[text()='Specify association of organization unit type with']");
    public visibility: Locator = this.page.locator("//div[@class='usage']/div[4]/label[@class='control-label']");
    public specifyVisibility: Locator = this.page.locator("//p[text()='Specify visibility of organization unit type on']");
    public associationType: Locator = this.page.locator("//div[@class='usage']/div[3]/div[@class='css-1pcexqc-container']");
    public visibilityType: Locator = this.page.locator("//div[@class='usage']/div[4]/div[@class='css-1pcexqc-container']");
    public associationTypes(associationTypesLabel: string): Locator {
      return this.getLocatorWithParam("//div[@class='css-11unzgr']/div[text()='%s']", associationTypesLabel);
    }
    public visibilityTypesLoop(visibilityTypesLabel: string, visibilityTypesLabel2: string): Locator {
      return this.getLocatorWithParam("//div[@class='css-11unzgr']/div[text()='%s']| //div[@class='css-11unzgr']/div[text()='%s'] ", visibilityTypesLabel, visibilityTypesLabel2);
    }
    public visibilityTypes(visibilityTypesLabel: string): Locator {
      return this.getLocatorWithParam("//div[@class='css-11unzgr']/div[text()='%s']", visibilityTypesLabel);
    }
    public associationTypeClearIcon: Locator = this.page.locator("//div[@class='usage']/div[3]//div[@class='css-1wy0on6']/div[1]");
    public visibilityTypeClearIcon: Locator = this.page.locator(".usage .form-group:nth-of-type(4) [class] [class='css-16pqwjk-indicatorContainer']:nth-of-type(1)");
    public projectFilterInput: Locator = this.page.locator("//input[@id='project_filter']");
    public projectFormInput: Locator = this.page.locator("//input[@id='projects_form']");
    public errorWhileSaving: Locator = this.page.locator("//h4[.='Error while saving organization type configurations']");
    public standardFieldsTab: Locator = this.page.locator("//a[text() = 'Standard Fields']");
    public sourcingTable: Locator = this.page.locator("//p[text()='Sourcing Table']");
    public maximumNumberOfSkillsValue: Locator = this.page.locator("//div[@class='hrData-config-max-skills']/p[text()= 'Maximum number of skills assigned to job role']/following-sibling::input");
    public submenu(menu: string): Locator {
      return this.getLocatorWithParam("//li[contains(@class, 'open')]/descendant::span[text()='%s']/parent::a", menu);
    }
    public saveButtonJobRoleTab: Locator = this.page.locator("//div/h4[text()='Job Role Configuration']/following-sibling::button[text()='Save']");
    public removeAssociationSymbol(associationType: string): Locator {
      return this.getLocatorWithParam("//div[3]/div[@class='rubix-panel-container-with-controls']/div[@class='rubix-panel-container']/div[@class='rubix-panel-body']//div[@class='css-1pcexqc-container']/div[@class='css-bg1rzq-control']/div[@class='css-1hwfws3']/div/child::div[text()='%s']/parent::div/div[@class='css-1alnv5e']", associationType);
    }
    public addLocationAssociationDropdown(): Locator {
      return this.locator("//div[3]/div[@class='rubix-panel-container-with-controls']/div[@class='rubix-panel-container']/div[@class='rubix-panel-body']//div[@class='css-1pcexqc-container']/div[@class='css-bg1rzq-control']/div[@class='css-1wy0on6']/child::div[2]");
    }
    public addLocationVisibilityDropdown(): Locator {
      return this.locator("//label[text()='Location name']/parent::div/div[@class='css-pkazdl-container']/div[@class='css-bg1rzq-control']/div[@class='css-1wy0on6']/div[2]");
    }
    public saveLocationsConfigButton: Locator = this.getByRole(AriaRole.BUTTON, "Save");
    public addGeoLocationVisibilityDropdown(): Locator {
      return this.locator("//label[text()='Geo-location radius distance search']/parent::div/div[@class='css-pkazdl-container']/div[@class='css-bg1rzq-control']/div[@class='css-1wy0on6']/div[2]");
    }
    public industryDropdown: Locator = this.getByText( "Industry 20 results available");
    public industryDropdownSelect(industryTypeDropdown: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", industryTypeDropdown);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAutomaticallyAssignDetectedSkillsToJobRolesToggle(): HrDataConfigurationPage {
        automaticallyAssignDetectedSkillsToJobRolesToggle.click();
        return this;
    }

    public clickOrganizationConfiguration(): HrDataConfigurationPage {
        organizationConfigurationTitle.click();
        return this;
    }

    public clickAndFillProjectFilterInput(): HrDataConfigurationPage {
        projectFilterInput.click();
        projectFilterInput.clear();
        projectFilterInput.fill("4");
        return this;
    }

    public clickAndFillProjectFormInput(): HrDataConfigurationPage {
        projectFormInput.click();
        projectFormInput.clear();
        projectFormInput.fill("2");
        return this;
    }

    public clickBeginnerLevel(): HrDataConfigurationPage {
        beginnerLevel.click();
        return this;
    }

    public clickIntermediateLevel(): HrDataConfigurationPage {
        intermediateLevel.click();
        return this;
    }

    public clickAdvanceLevel(): HrDataConfigurationPage {
        advanceLevel.click();
        return this;
    }

    public clickIndustryDropdown(): HrDataConfigurationPage {
        industryDropdown.click();
        return this;
    }

    public clickLocations(): HrDataConfigurationPage {
        locations.click();
        return this;
    }

    public expandListOfProficiencyLevels(): HrDataConfigurationPage {
        this.repeatUntilElementToBeVisible(() => detectedSkillsInput.click(), this.page.locator("//div[@class='hrData-config-radio-skills']//div[contains(@class, 'menu')]"), 3, 2000, () => {
        });
        return this;
    }

    public clickEnterJobRoleFilterLevel(organizationLevel: string): HrDataConfigurationPage {
        this.inputTypeNumber.clear();
        this.inputTypeNumber.fill(organizationLevel);
        return this;
    }

    public clickEnterJobRoleFilterLevelIncorrect(organizationLevelIncorrect: string): HrDataConfigurationPage {
        this.inputTypeNumber.clear();
        this.inputTypeNumber.fill(organizationLevelIncorrect);
        return this;
    }

    public selectOrganizationUnitType(organizationUnitTypeDropdown: string): HrDataConfigurationPage {
        organizationUnitType.click();
        this.dropdownSelect(organizationUnitTypeDropdown).click();
        return this;
    }

    public clickSaveButton(): HrDataConfigurationPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataConfigurationPage);
    }

    public clickSaveButtonJobRoleTab(): HrDataConfigurationPage {
        saveButtonJobRoleTab.click();
        return this.getPageClassInstance(HrDataConfigurationPage);
    }

    public clearAssociationType(): HrDataConfigurationPage {
        associationTypeClearIcon.first().click();
        return this;
    }

    public clickAssociationType(): HrDataConfigurationPage {
        associationTypeClearIcon.click();
        associationType.click();
        return this;
    }

    public clearVisibilityType(): HrDataConfigurationPage {
        visibilityTypeClearIcon.first().click();
        return this;
    }

    public clickVisibilityType(): HrDataConfigurationPage {
        visibilityTypeClearIcon.click();
        visibilityType.click();
        return this;
    }

    public gotoStandardFieldPage(): HrDataConfigurationStandardFieldPage {
        standardFieldsTab.click();
        return this.getPageClassInstance(HrDataConfigurationStandardFieldPage);
    }

    public clearAndFillMaxNumberOfSkills(maxNumber: string): HrDataConfigurationPage {
        maximumNumberOfSkillsValue.click();
        maximumNumberOfSkillsValue.clear();
        maximumNumberOfSkillsValue.fill(maxNumber);
        return this;
    }

    public openMenuForJobRolesHRData(): HrDataJobRolesPage {
        this.submenu("Job Roles").click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }

    public removeAssociation(association: string): HrDataConfigurationPage {
        this.removeAssociationSymbol(association).click();
        return this;
    }

    public clickLocationConfigSaveButton(): HrDataConfigurationPage {
        saveLocationsConfigButton.click();
        this.pause(5000);
        return this;
    }

    public addAssociation(associationType: string): HrDataConfigurationPage {
        this.addLocationAssociationDropdown().click();
        this.dropdownSelect(associationType).click();
        return this;
    }

    public addLocationVisibility(visibilityType: string): HrDataConfigurationPage {
        this.addLocationVisibilityDropdown().click();
        this.dropdownSelect(visibilityType).click();
        return this;
    }

    public addGeoLocationVisibility(visibilityType: string): HrDataConfigurationPage {
        this.addGeoLocationVisibilityDropdown().click();
        this.dropdownSelect(visibilityType).click();
        return this;
    }

}
