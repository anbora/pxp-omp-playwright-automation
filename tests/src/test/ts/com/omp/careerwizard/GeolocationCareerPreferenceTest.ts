// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

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
                        let __page1: any = this;
            __page1 = __page1.getOmpLoginPage();
            __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
            __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user1.name));
            __page1 = __page1.goToCareerGrowthPage();
            __page1 = __page1.clickUpdateCareerProfileLink();
            __page1 = __page1.goToCareerPreferenceTab();
            __page1 = __page1.enterPreferredLocations(this.locationValue1);
            __page1 = __page1.enterPreferredLocations(this.locationValue2);
            __page1 = __page1.enterPreferredFurtherLocations(this.locationValue3, this.locationValue4, this.locationValue5);
            expect(__page1.maximumNumberOfLocations).toContainText("Maximum number of locations selected.");
            __page1 = __page1.clickRadioButtonMiles();
            __page1 = __page1.clearAndSetDistance(this.distanceValue1);
            __page1 = __page1.clickSaveAndContinueButton();
            __page1 = __page1.clickSaveButton();
            __page1 = __page1.clickUpdateCareerProfileLink();
            __page1 = __page1.goToCareerPreferenceTab();
            expect(__page1.radioButtonMiles).toBeChecked();
            expect(__page1.distance).toHaveValue(this.distanceValue1, { timeout: 30000 });
            expect(__page1.preferredLocationValue(this.locationValue1)).toBeVisible();
            expect(__page1.preferredLocationValue(this.locationValue2)).toBeVisible();
            expect(__page1.preferredLocationValue(this.locationValue3)).toBeVisible();
            expect(__page1.preferredLocationValue(this.locationValue4)).toBeVisible();
            expect(__page1.preferredLocationValue(this.locationValue5)).toBeVisible();
            __page1 = __page1.deleteFirstPreferredLocation();
            __page1 = __page1.clickSaveAndContinueButton();
            __page1 = __page1.clickSaveButton();
            __page1 = __page1.clickUpdateCareerProfileLink();
            __page1 = __page1.goToCareerPreferenceTab();
            expect(__page1.preferredLocationValue(this.locationValue1)).not.toBeVisible();
            __page1 = __page1.deleteAllPreferredLocations();
            __page1 = __page1.clickRadioButtonKilometers();
            __page1 = __page1.clearAndSetDistance(this.distanceValue2);
            __page1 = __page1.clickSaveAndContinueButton();
            __page1 = __page1.clickSaveButton();
            __page1 = __page1.clickUpdateCareerProfileLink();
            __page1 = __page1.goToCareerPreferenceTab();
            expect(__page1.radioButtonKilometers).toBeChecked();
            expect(__page1.preferredLocation).toBeEmpty();
            expect(__page1.distance).toHaveValue(this.distanceValue2, { timeout: 30000 });
        }

    public shouldCheckGeolocationFiltersViaMePage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user2.name));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickEditPublicProfileButton();
        __page2 = __page2.goToCareerPreferencesTab();
        __page2 = __page2.enterPreferredLocations(this.locationValue1);
        __page2 = __page2.enterPreferredLocations(this.locationValue2);
        __page2 = __page2.enterPreferredFurtherLocations(this.locationValue3, this.locationValue4, this.locationValue5);
        expect(__page2.maximumNumberOfLocations).toContainText("Maximum number of locations selected.");
        __page2 = __page2.clickRadioButtonMiles();
        __page2 = __page2.clearAndSetDistance(this.distanceValue1);
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickEditPublicProfileButton();
        __page2 = __page2.goToCareerPreferencesTab();
        expect(__page2.radioButtonMiles).toBeChecked();
        expect(__page2.distance).toHaveValue(this.distanceValue1, { timeout: 30000 });
        expect(__page2.preferredLocationValue(this.locationValue1)).toBeVisible();
        expect(__page2.preferredLocationValue(this.locationValue2)).toBeVisible();
        expect(__page2.preferredLocationValue(this.locationValue3)).toBeVisible();
        expect(__page2.preferredLocationValue(this.locationValue4)).toBeVisible();
        expect(__page2.preferredLocationValue(this.locationValue5)).toBeVisible();
        __page2 = __page2.deleteFirstPreferredLocation();
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickEditPublicProfileButton();
        __page2 = __page2.goToCareerPreferencesTab();
        expect(__page2.preferredLocationValue(this.locationValue1)).not.toBeVisible();
        __page2 = __page2.deleteAllPreferredLocations();
        __page2 = __page2.clickRadioButtonKilometers();
        __page2 = __page2.clearAndSetDistance(this.distanceValue2);
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickEditPublicProfileButton();
        __page2 = __page2.goToCareerPreferencesTab();
        expect(__page2.radioButtonKilometers).toBeChecked();
        expect(__page2.preferredLocation).toBeEmpty();
        expect(__page2.distance).toHaveValue(this.distanceValue2, { timeout: 30000 });
    }

        public afterClass(): void {
            this.deleteUser(this.user1);
            this.deleteUser(this.user2);
        }
    }
