// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationLocationAssociationAndVisibilityForJobRolesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;
    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private familyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private jobRoleName: string = UUID.randomUUID().toString();
    private partialName: string = "QA";
    private levelName: string = "Associate";
    private locationName: string = "TestingQA";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createJobRoleWithLocationField(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobRolesHRData();
        __page1 = __page1.clickAddJobRoleButton();
        __page1 = __page1.typeRoleName(this.jobRoleName);
        __page1 = __page1.selectJobFamily(this.partialName, this.familyName);
        __page1 = __page1.selectJobLevel(this.levelName);
        __page1 = __page1.selectJobLocation(this.partialName, this.locationName);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.jobRoleName);
        expect(__page1.jobRoleName.first()).toContainText(this.jobRoleName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role name found on the list.");
    }

    public locationVisibilityForJobRolesTest(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page2 = __page2.run(new AddSkillToNewUserScenario_SkillLevel());
        __page2 = __page2.goToRolesPageViaTab();
        __page2 = __page2.typeSearchValue(this.jobRoleName);
        expect(__page2.jobRoleLocation).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickJobRoleCardDetails(this.jobRoleName);
        expect(__page2.jobRoleDetailsLocation).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickBackButton();
        __page2 = __page2.openFiltersModal(AllFiltersModalPage);
        expect(__page2.jobFilterLocation).toBeVisible({ timeout: 30000 });
        __page2 = __page2.closeFiltersModal();
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("Job Role")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibleForJobVacancyTest(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToRolesPageViaCard();
        __page3 = __page3.typeSearchValue(this.jobRoleName);
        expect(__page3.jobRoleLocation).toBeHidden();
        __page3 = __page3.clickJobRoleCardDetails(this.jobRoleName);
        expect(__page3.jobRoleDetailsLocation).toBeHidden();
        __page3 = __page3.clickBackButton();
        __page3 = __page3.openFiltersModal(AllFiltersModalPage);
        expect(__page3.jobFilterLocation).toBeHidden();
        __page3 = __page3.closeFiltersModal();
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("Job Role")
                .addLocationVisibility("Job Role details")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Job Role filter")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Job Role card")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
