import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { GalaxyViewFiltersModalPage } from "pages/careergrowth/roles/GalaxyViewFiltersModalPage";

export class GalayViewFiltersModalAssertions extends BaseAssertion<GalaxyViewFiltersModalPage> {

    public assertThatJobFamilyCheckboxIsDisabled(jobFamily: string): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.jobFamilyCheckbox(jobFamily)).isDisabled();
        return this;
    }

    public assertThatApplyButtonIsDisabled(): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.applyButton).isDisabled();
        return this;
    }

    public assertThatApplyButtonIsEnabled(): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.applyButton).isEnabled();
        return this;
    }

    public assertThatNumberOfRolesWithinJobFamilyIsEqualTo(jobFamily: string, numberOfRoles: string): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.jobFamilyText(jobFamily)).containsText(numberOfRoles, this.containsTextOptions);
        return this;
    }

    public assertThatNumberOfSelectedFamiliesIsEqualTo(number: string): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.selectedFamiliesLabel(number)).containsText(number);
        return this;
    }

    public assertThatAlertIsDisplayedWithText(alertDescription: string): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.alert).containsText(alertDescription, this.containsTextOptions);
        return this;
    }

    public assertThatAlertIsNotDisplayed(): GalayViewFiltersModalAssertions {
        this.assertThat(this.page.alert).isHidden();
        return this;
    }
}
