// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationLocationAssociationAndVisibilityForCareerPreferencesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public locationVisibilityForCareerPreferencesTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.editProfile();
        __page1 = __page1.goToCareerPreferencesTab();
        expect(__page1.careerPreferencesLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        expect(__page1.careerPreferencesLocation).toBeVisible({ timeout: 30000 });
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("Career preference")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibleForCareerPreferencesTest(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToProfileFromUserDropDown(this.user.name);
        __page2 = __page2.editProfile();
        __page2 = __page2.goToCareerPreferencesTab();
        expect(__page2.careerPreferencesLocation).toBeHidden();
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.clickUpdateCareerProfileLink();
        __page2 = __page2.clickSkipForNowButton();
        __page2 = __page2.clickSkipForNowButton();
        __page2 = __page2.clickSkipForNowButton();
        expect(__page2.careerPreferencesLocation).toBeHidden();
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("Career preference")
                .addLocationVisibility("Career preferences")
                .clickLocationConfigSaveButton()
                .addGeoLocationVisibility("Career preferences")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
