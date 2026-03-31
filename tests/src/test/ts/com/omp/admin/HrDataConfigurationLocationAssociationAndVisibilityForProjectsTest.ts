// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationLocationAssociationAndVisibilityForProjectsTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;
    //private String projectTitle = "LocationTest" + UUID.randomUUID();
    private projectDesc: string = "Location Test Desc";
    private locationTextToEnter: string = "Santa Monica HQ";
    private locationName: string = "Santa Monica HQ";
    private projectTitle: string = "LocationProject_DND";

    public initialize(): void {

    this.user = this.createUser(true);

    }
    // Project creation is intentionally skipped here because indexing takes too long
    // for this scenario and the project can miss the search window.

    public locationVisibilityForProjectsTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToProjectsPageViaTab();
        __page1 = __page1.searchForAProject(this.projectTitle);
        expect(__page1.projectCardLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickProjectCardCardDetails(this.projectTitle);
        expect(__page1.projectDetailsLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickBackButton();
        __page1 = __page1.clickInFiltersButton();
        expect(__page1.projectFilterLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickFilterCancelButton();
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("Project")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibleForProjectsTest(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToProjectsPageViaCard();
        __page2 = __page2.searchForAProject(this.projectTitle);
        expect(__page2.projectCardLocation).toBeHidden();
        __page2 = __page2.clickProjectCardCardDetails(this.projectTitle);
        expect(__page2.projectDetailsLocation).toBeHidden();
        __page2 = __page2.clickBackButton();
        __page2 = __page2.clickInFiltersButton();
        expect(__page2.projectFilterLocation).toBeHidden();
        __page2 = __page2.clickFilterCancelButton();
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("Project")
                .addLocationVisibility("Project details")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Project filter")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Project card")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
