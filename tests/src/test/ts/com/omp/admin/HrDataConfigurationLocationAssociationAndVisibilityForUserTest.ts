// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationLocationAssociationAndVisibilityForUserTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;
    private accounts: string = "Accounts";
    private skillName: string = "java 8";
    private advancedSkillLevel: string = "Advanced";
    private description: string = "I want to become mentor in Java 8 am open.";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public CreateMentorProfileTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        __page1 = __page1.clickBecomeAMentor();
        __page1 = __page1.addSkillsToSkillPassport(this.skillName, this.skillName, this.advancedSkillLevel);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        __page1 = __page1.clickBecomeAMentor();
        __page1 = __page1.addSkillsAndDescription(this.skillName, this.skillName, this.description);
        __page1 = __page1.clickOnCreateProfileButton();
        expect(__page1.createdMentorProfileText()).toBeVisible({ timeout: 30000 });
    }

    public locationVisibilityForUserTest(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToEditProfileFromUserDropDown(this.user.name);
        expect(__page2.userProfileLocation).toBeVisible({ timeout: 30000 });
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.accounts);
        __page2 = __page2.openUsersPage();
        __page2 = __page2.fillInSearchInput(this.user.email);
        __page2 = __page2.editUser(this.user.name);
        expect(__page2.userManagementLocation()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickCancel();
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.goToHomePage();
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToMentorshipPageViaCard();
        __page2 = __page2.clickInFiltersButton();
        expect(__page2.mentorFilterLocation).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickCancelButtonFiltersModal();
        __page2 = __page2.clickViewMyMentorProfileButton();
        expect(__page2.mentorProfileLocation).toBeVisible({ timeout: 30000 });
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("User")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibilityForUserTest(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToEditProfileFromUserDropDown(this.user.name);
        expect(__page3.userProfileLocation).toBeHidden();
        __page3 = __page3.goToAdminPanel();
        __page3 = __page3.selectMainTab(this.accounts);
        __page3 = __page3.openUsersPage();
        __page3 = __page3.fillInSearchInput(this.user.email);
        __page3 = __page3.editUser(this.user.name);
        expect(__page3.userManagementLocation()).toBeHidden();
        __page3 = __page3.clickCancel();
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToHomePage();
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToMentorshipPageViaCard();
        __page3 = __page3.clickInFiltersButton();
        expect(__page3.mentorFilterLocation).toBeHidden();
        __page3 = __page3.clickCancelButtonFiltersModal();
        __page3 = __page3.clickViewMyMentorProfileButton();
        expect(__page3.mentorProfileLocation).toBeHidden();
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("User")
                .addLocationVisibility("Profile details")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Mentor profile")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Mentorship filter")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("User management")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
