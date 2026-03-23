import { PreferencesCareerProfileModalAssertions } from "assertions/careergrowth/profiles/PreferencesCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class HrDataConfigurationLocationAssociationAndVisibilityForCareerPreferencesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public locationVisibilityForCareerPreferencesTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToProfileFromUserDropDown(this.user.name)
                .editProfile()
                .goToCareerPreferencesTab()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatLocationIsVisibleForCareerPreferences()
                .endAssertion()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatLocationIsVisibleForCareerPreferences()
                .endAssertion();
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
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                 .goToCareerGrowthPage()
                .goToProfileFromUserDropDown(this.user.name)
                .editProfile()
                .goToCareerPreferencesTab()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatLocationIsNotVisibleForCareerPreferences()
                .endAssertion()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatLocationIsNotVisibleForCareerPreferences()
                .endAssertion();
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
