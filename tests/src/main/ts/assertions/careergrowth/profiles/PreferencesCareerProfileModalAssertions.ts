import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";

export class PreferencesCareerProfileModalAssertions extends BaseAssertion<PreferencesCareerProfileModalPage> {

    public assertThatPreferencesAreUpdated(alert: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.successAlertBox).containsText(alert, this.containsTextOptions);
        return this;
    }

	public assertThatOptionIsChecked(type: string, value: string): PreferencesCareerProfileModalAssertions;
    public assertThatOptionIsChecked(optionName: string): PreferencesCareerProfileModalAssertions;
	public assertThatOptionIsChecked(typeOrOptionName: string, value?: string): PreferencesCareerProfileModalAssertions {
        if (value != null) {
            this.assertThat(this.page.preferenceInput(typeOrOptionName, value)).isChecked();
            return this;
        }

        this.assertThat(this.page.optionCheckbox(typeOrOptionName)).isChecked();
        return this;
    }

	public assertThatOptionIsNotChecked(type: string, value: string): PreferencesCareerProfileModalAssertions;
    public assertThatOptionIsNotChecked(optionName: string): PreferencesCareerProfileModalAssertions;
	public assertThatOptionIsNotChecked(typeOrOptionName: string, value?: string): PreferencesCareerProfileModalAssertions {
        if (value != null) {
            this.assertThat(this.page.preferenceInput(typeOrOptionName, value)).not().isChecked();
            return this;
        }

        this.assertThat(this.page.optionCheckbox(typeOrOptionName)).not().isChecked();
        return this;
    }

    public assertThaEmptyStateIsDisplayedForType(type: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.emptyStateInput(type)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChipIsDisplayed(type: string, optionName: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.optionChip(type, optionName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatPreferenceTabSelected(): PreferencesCareerProfileModalAssertions {
        Assert.assertTrue(this.page.preferencesButton.getAttribute("class").contains("active"));
        return this;
    }

    public assertThatGoToExperienceButtonExists(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.goToExperienceButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMaximumNumberOfLocationsHaveBeenReached(): PreferencesCareerProfileModalAssertions {
    this.assertThat(this.page.maximumNumberOfLocations).containsText("Maximum number of locations selected.");
    return this;
    }

    public assertThatPreferredLocationContainsValues(value: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.preferredLocationValue(value)).isVisible();
        return this;
    }

    public assertThatDistanceIsVisible(distanceValue: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.distance).hasValue(distanceValue, this.hasValueOptions);
        return this;
    }

    public assertThatFirstLocationIsNotVisible(value: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.preferredLocationValue(value)).not().isVisible();
        return this;
    }

    public assertThatPreferredLocationIsEmpty(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.preferredLocation).isEmpty();
        return this;
    }

    public assertThatMilesOptionIsChecked(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.radioButtonMiles).isChecked();
        return this;
    }

    public assertThatKilometersOptionIsChecked(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.radioButtonKilometers).isChecked();
        return this;
    }

    public assertThatConfirmationModalContainsInformation(description: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.recommendationInformation).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatLocationIsVisibleForCareerPreferences(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.careerPreferencesLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForCareerPreferences(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.careerPreferencesLocation).isHidden();
        return this;
    }

    public assertCompleteYourProfileModalSubHeaderIsDisplayed(subheaderName: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfileModalSubHeader(subheaderName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfileModalProgressCount(progressPercentage)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.saveAndContinue()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProfileCompletedHeaderIsDisplayed(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfileWidgetProfileCompletedHeader()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProfileCompletedProgressCountIsDisplayed(): PreferencesCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfile100CompletedProgressData).isVisible(this.isVisibleOptions);
        return this;
    }
}
