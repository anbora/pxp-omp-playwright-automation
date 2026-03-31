// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { GalaxyViewFiltersModalPage } from "pages/careergrowth/roles/GalaxyViewFiltersModalPage";
import { expect } from "common/testing/playwright";

export class GalayViewFiltersModalAssertions extends BaseAssertion<GalaxyViewFiltersModalPage> {

    public assertThatJobFamilyCheckboxIsDisabled(jobFamily: string): GalayViewFiltersModalAssertions {
        expect(this.page.jobFamilyCheckbox(jobFamily)).toBeDisabled();
        return this;
    }

    public assertThatApplyButtonIsDisabled(): GalayViewFiltersModalAssertions {
        expect(this.page.applyButton).toBeDisabled();
        return this;
    }

    public assertThatApplyButtonIsEnabled(): GalayViewFiltersModalAssertions {
        expect(this.page.applyButton).toBeEnabled();
        return this;
    }

    public assertThatNumberOfRolesWithinJobFamilyIsEqualTo(jobFamily: string, numberOfRoles: string): GalayViewFiltersModalAssertions {
        expect(this.page.jobFamilyText(jobFamily)).toContainText(numberOfRoles, this.containsTextOptions);
        return this;
    }

    public assertThatNumberOfSelectedFamiliesIsEqualTo(number: string): GalayViewFiltersModalAssertions {
        expect(this.page.selectedFamiliesLabel(number)).toContainText(number);
        return this;
    }

    public assertThatAlertIsDisplayedWithText(alertDescription: string): GalayViewFiltersModalAssertions {
        expect(this.page.alert).toContainText(alertDescription, this.containsTextOptions);
        return this;
    }

    public assertThatAlertIsNotDisplayed(): GalayViewFiltersModalAssertions {
        expect(this.page.alert).toBeHidden();
        return this;
    }
}
