import { UsersAdminAssertions } from "assertions/admin/users/UsersAdminAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { ProfileDetailsAssertions } from "assertions/careergrowth/profiles/ProfileDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickBecomeAMentor()
                .addSkillsToSkillPassport(this.skillName, this.skillName, this.advancedSkillLevel)
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickBecomeAMentor()
                .addSkillsAndDescription(this.skillName, this.skillName, this.description)
                .clickOnCreateProfileButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertCreatedMentorProfileTextIsDisplayed()
                .endAssertion();
    }

    public locationVisibilityForUserTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToEditProfileFromUserDropDown(this.user.name)
                .check(ProfileDetailsAssertions)
                    .assertThatLocationIsVisibleForUserProfile()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.accounts)
                .openUsersPage()
                .fillInSearchInput(this.user.email)
                .editUser(this.user.name)
                .check(UsersAdminAssertions)
                    .assertThatLocationIsVisibleForUserManagement()
                .endAssertion()
                .clickCancel()
                .goDirectlyTo(LandingPage)
                .goToHomePage()
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickInFiltersButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertThatLocationIsVisibleForMentorFilters()
                .endAssertion()
                .clickCancelButtonFiltersModal()
                .clickViewMyMentorProfileButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertThatLocationIsVisibleForMentorProfile()
                .endAssertion();
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
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToEditProfileFromUserDropDown(this.user.name)
                .check(ProfileDetailsAssertions)
                    .assertThatLocationIsNotVisibleForUserProfile()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.accounts)
                .openUsersPage()
                .fillInSearchInput(this.user.email)
                .editUser(this.user.name)
                .check(UsersAdminAssertions)
                    .assertThatLocationIsNotVisibleForUserManagement()
                .endAssertion()
                .clickCancel()
                .goDirectlyTo(LandingPage)
                .goToHomePage()
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickInFiltersButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertThatLocationIsNotVisibleForMentorFilters()
                .endAssertion()
                .clickCancelButtonFiltersModal()
                .clickViewMyMentorProfileButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertThatLocationIsNotVisibleForMentorProfile()
                .endAssertion();
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
