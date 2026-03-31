// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class HrDataConfigurationTest extends BaseRestTest {
    private expectedProficiencyLevels: Set<string> = new Set(["Novice", "Beginner", "Intermediate", "Advanced", "Expert"]);
    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleConfigurationPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHrConfiguration();
        expect(__page1.jobRoleConfigurationTitle).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role configuration title is visible");
        expect(__page1.automaticallyAssignDetectedSkillsToJobRoles).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Automatically Assign Detected Skills To Job Roles is visible");
        expect(__page1.overRideDetectedSkillsAssociatedForJobRoleUpdate).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Override detected skills associated for Job Role update is visible");
        expect(__page1.detectedSkillLevel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Detected skill level is visible");
        __page1 = __page1.expandListOfProficiencyLevels();
        Assert.assertTrue(__page1.proficiencyLevels.allTextContents().containsAll(this.expectedProficiencyLevels));
        Assert.assertTrue(__page1.proficiencyLevels.allInnerTexts().length == this.expectedProficiencyLevels.length);
        expect(__page1.maximumNumberOfSkillsAssignedToJobRole).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Maximum number of skills assigned to job role Is visible");
        expect(__page1.allowedRange).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Allowed range 1 to 50 Is visible");
        expect(__page1.automaticallyAssignDetectedNextRolesToJobRoles).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Automatically assign detected next roles to job roles Is visible");
        expect(__page1.overRideRecalculatedNextRolesAssociatedForJobRoles).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Automatically assign detected next roles to job roles Is visible");
        expect(__page1.maximumNumberOfNextRolesAssociatedToJobRole).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Maximum number of next roles associated to job role Is visible");
        expect(__page1.enableCareerPath).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Enable Career Path Is visible");
    }

    public organizationConfigurationTab(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.hrData);
        __page2 = __page2.openMenuForHrConfiguration();
        __page2 = __page2.clickOrganizationConfiguration();
        expect(__page2.organizationConfigurationTitle).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified data. Organization configuration title is visible");
        expect(__page2.organizationConfiguration).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified data. Organization configuration is visible");
        expect(__page2.enableOrganization).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Enable organization Is visible");
        expect(__page2.usage).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Usage Is visible");
        expect(__page2.organizationLevelValuesToBeDisplayed).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Organization Level Values To Be Displayed Is visible");
        expect(__page2.organizationTypeDisplayedOnTheOpportunityCard).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Organization Type Displayed On The Opportunity Card Is visible");
        __page2 = __page2.clickAndFillProjectFilterInput();
        __page2 = __page2.clickAndFillProjectFilterInput();
        __page2 = __page2.clickSaveButton();
        expect(__page2.errorWhileSaving).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified data. Error message is visible");
    }

    public locationConfigurationTab(): void {
                  let __page3: any = this;
         __page3 = __page3.getOmpLoginPage();
         __page3 = __page3.run(new LoginScenario(this.user));
         __page3 = __page3.goToAdminPanel();
         __page3 = __page3.selectMainTab(this.hrData);
         __page3 = __page3.openMenuForHrConfiguration();
         __page3 = __page3.clickLocations();
         expect(__page3.locationsConfiguration).toBeVisible({ timeout: 30000 });
         __page3.logger.info("Locations Configuration Is visible");
    }

    public standardFieldsConfigurationTab(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.goToAdminPanel();
        __page4 = __page4.selectMainTab(this.hrData);
        __page4 = __page4.openMenuForHrConfiguration();
        __page4 = __page4.gotoStandardFieldPage();
        __page4 = __page4.clickInLevelFieldEditIcon();
        __page4 = __page4.selectFirstRank();
        __page4 = __page4.selectSecondRank();
        __page4 = __page4.clickSaveButtonEditLevelModal();
        __page4 = __page4.clickInLevelFieldEditIcon();
        expect(__page4.rankValueOne.first()).toBeVisible({ timeout: 30000 });
        expect(__page4.rankValueTwo.first()).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
