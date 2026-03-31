// @ts-nocheck
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { expect } from "common/testing/playwright";

export class PreferencesCareerProfileModalAssertions extends BaseAssertion<PreferencesCareerProfileModalPage> {

    public assertThatPreferencesAreUpdated(alert: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.successAlertBox).toContainText(alert, this.containsTextOptions);
        return this;
    }

	public assertThatOptionIsChecked(type: string, value: string): PreferencesCareerProfileModalAssertions;
    public assertThatOptionIsChecked(optionName: string): PreferencesCareerProfileModalAssertions;
	public assertThatOptionIsChecked(typeOrOptionName: string, value?: string): PreferencesCareerProfileModalAssertions {
        if (value != null) {
            expect(this.page.preferenceInput(typeOrOptionName, value)).toBeChecked();
            return this;
        }

        expect(this.page.optionCheckbox(typeOrOptionName)).toBeChecked();
        return this;
    }

	public assertThatOptionIsNotChecked(type: string, value: string): PreferencesCareerProfileModalAssertions;
    public assertThatOptionIsNotChecked(optionName: string): PreferencesCareerProfileModalAssertions;
	public assertThatOptionIsNotChecked(typeOrOptionName: string, value?: string): PreferencesCareerProfileModalAssertions {
        if (value != null) {
            expect(this.page.preferenceInput(typeOrOptionName, value)).not.toBeChecked();
            return this;
        }

        expect(this.page.optionCheckbox(typeOrOptionName)).not.toBeChecked();
        return this;
    }

    public assertThaEmptyStateIsDisplayedForType(type: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.emptyStateInput(type)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChipIsDisplayed(type: string, optionName: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.optionChip(type, optionName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatPreferenceTabSelected(): PreferencesCareerProfileModalAssertions {
        Assert.assertTrue(this.page.preferencesButton.getAttribute("class").contains("active"));
        return this;
    }

    public assertThatGoToExperienceButtonExists(): PreferencesCareerProfileModalAssertions {
        expect(this.page.goToExperienceButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMaximumNumberOfLocationsHaveBeenReached(): PreferencesCareerProfileModalAssertions {
    expect(this.page.maximumNumberOfLocations).toContainText("Maximum number of locations selected.");
    return this;
    }

    public assertThatPreferredLocationContainsValues(value: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.preferredLocationValue(value)).toBeVisible();
        return this;
    }

    public assertThatDistanceIsVisible(distanceValue: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.distance).toHaveValue(distanceValue, this.hasValueOptions);
        return this;
    }

    public assertThatFirstLocationIsNotVisible(value: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.preferredLocationValue(value)).not.toBeVisible();
        return this;
    }

    public assertThatPreferredLocationIsEmpty(): PreferencesCareerProfileModalAssertions {
        expect(this.page.preferredLocation).toBeEmpty();
        return this;
    }

    public assertThatMilesOptionIsChecked(): PreferencesCareerProfileModalAssertions {
        expect(this.page.radioButtonMiles).toBeChecked();
        return this;
    }

    public assertThatKilometersOptionIsChecked(): PreferencesCareerProfileModalAssertions {
        expect(this.page.radioButtonKilometers).toBeChecked();
        return this;
    }

    public assertThatConfirmationModalContainsInformation(description: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.recommendationInformation).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatLocationIsVisibleForCareerPreferences(): PreferencesCareerProfileModalAssertions {
        expect(this.page.careerPreferencesLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForCareerPreferences(): PreferencesCareerProfileModalAssertions {
        expect(this.page.careerPreferencesLocation).toBeHidden();
        return this;
    }

    public assertCompleteYourProfileModalSubHeaderIsDisplayed(subheaderName: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.completeYourProfileModalSubHeader(subheaderName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): PreferencesCareerProfileModalAssertions {
        expect(this.page.completeYourProfileModalProgressCount(progressPercentage)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): PreferencesCareerProfileModalAssertions {
        expect(this.page.saveAndContinue()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProfileCompletedHeaderIsDisplayed(): PreferencesCareerProfileModalAssertions {
        expect(this.page.completeYourProfileWidgetProfileCompletedHeader()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProfileCompletedProgressCountIsDisplayed(): PreferencesCareerProfileModalAssertions {
        expect(this.page.completeYourProfile100CompletedProgressData).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
