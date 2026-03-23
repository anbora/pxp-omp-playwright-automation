import { PreferencesCareerProfileModalAssertions } from "assertions/careergrowth/profiles/PreferencesCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class GeolocationCareerPreferenceTest extends BaseRestTest {
    private user1: UserModel;
    private user2: UserModel;
    private distanceValue1: string = "50";
    private distanceValue2: string = "100";
    private locationValue1: string = "Krakow";
    private locationValue2: string = "Słupsk";
    private locationValue3: string = "Gdynia";
    private locationValue4: string = "Wrocław";
    private locationValue5: string = "Ustka";

    public initialize(): void {
      this.user1 = this.createUser(true);
        this.wait(10000);
      this.user2 = this.createUser(true);
    }

        public shouldCheckGeolocationFiltersViaCareerGrowth(): void {
            this.getOmpLoginPage()
                    .run(new LoginWithOnboardingScenario(this.user1))
                    .run(new AddRoleAndFamilyToNewUserScenario(this.user1.name))
                    .goToCareerGrowthPage()
                    .clickUpdateCareerProfileLink()
                    .goToCareerPreferenceTab()
                    .enterPreferredLocations(this.locationValue1)
                    .enterPreferredLocations(this.locationValue2)
                    .enterPreferredFurtherLocations(this.locationValue3,this.locationValue4,this.locationValue5)
                    .check(PreferencesCareerProfileModalAssertions)
                        .assertThatMaximumNumberOfLocationsHaveBeenReached()
                    .endAssertion()
                    .clickRadioButtonMiles()
                    .clearAndSetDistance(this.distanceValue1)
                    .clickSaveAndContinueButton()
                    .clickSaveButton()
                    .clickUpdateCareerProfileLink()
                    .goToCareerPreferenceTab()
                    .check(PreferencesCareerProfileModalAssertions)
                        .assertThatMilesOptionIsChecked()
                        .assertThatDistanceIsVisible(this.distanceValue1)
                        .assertThatPreferredLocationContainsValues(this.locationValue1)
                        .assertThatPreferredLocationContainsValues(this.locationValue2)
                        .assertThatPreferredLocationContainsValues(this.locationValue3)
                        .assertThatPreferredLocationContainsValues(this.locationValue4)
                        .assertThatPreferredLocationContainsValues(this.locationValue5)
                    .endAssertion()
                    .deleteFirstPreferredLocation()
                    .clickSaveAndContinueButton()
                    .clickSaveButton()
                    .clickUpdateCareerProfileLink()
                    .goToCareerPreferenceTab()
                    .check(PreferencesCareerProfileModalAssertions)
                        .assertThatFirstLocationIsNotVisible(this.locationValue1)
                    .endAssertion()
                    .deleteAllPreferredLocations()
                    .clickRadioButtonKilometers()
                    .clearAndSetDistance(this.distanceValue2)
                    .clickSaveAndContinueButton()
                    .clickSaveButton()
                    .clickUpdateCareerProfileLink()
                    .goToCareerPreferenceTab()
                    .check(PreferencesCareerProfileModalAssertions)
                        .assertThatKilometersOptionIsChecked()
                        .assertThatPreferredLocationIsEmpty()
                        .assertThatDistanceIsVisible(this.distanceValue2)
                    .endAssertion();
        }

    public shouldCheckGeolocationFiltersViaMePage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .goToMePageProfile()
                .clickEditPublicProfileButton()
                .goToCareerPreferencesTab()
                .enterPreferredLocations(this.locationValue1)
                .enterPreferredLocations(this.locationValue2)
                .enterPreferredFurtherLocations(this.locationValue3,this.locationValue4,this.locationValue5)
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatMaximumNumberOfLocationsHaveBeenReached()
                .endAssertion()
                .clickRadioButtonMiles()
                .clearAndSetDistance(this.distanceValue1)
                .goToCareerGrowthPage()
                .goToMePageProfile()
                .clickEditPublicProfileButton()
                .goToCareerPreferencesTab()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatMilesOptionIsChecked()
                    .assertThatDistanceIsVisible(this.distanceValue1)
                    .assertThatPreferredLocationContainsValues(this.locationValue1)
                    .assertThatPreferredLocationContainsValues(this.locationValue2)
                    .assertThatPreferredLocationContainsValues(this.locationValue3)
                    .assertThatPreferredLocationContainsValues(this.locationValue4)
                    .assertThatPreferredLocationContainsValues(this.locationValue5)
                .endAssertion()
                .deleteFirstPreferredLocation()
                .goToCareerGrowthPage()
                .goToMePageProfile()
                .clickEditPublicProfileButton()
                .goToCareerPreferencesTab()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatFirstLocationIsNotVisible(this.locationValue1)
                .endAssertion()
                .deleteAllPreferredLocations()
                .clickRadioButtonKilometers()
                .clearAndSetDistance(this.distanceValue2)
                .goToCareerGrowthPage()
                .goToMePageProfile()
                .clickEditPublicProfileButton()
                .goToCareerPreferencesTab()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatKilometersOptionIsChecked()
                    .assertThatPreferredLocationIsEmpty()
                    .assertThatDistanceIsVisible(this.distanceValue2)
                .endAssertion();
    }

        public afterClass(): void {
            this.deleteUser(this.user1);
            this.deleteUser(this.user2);
        }
    }
