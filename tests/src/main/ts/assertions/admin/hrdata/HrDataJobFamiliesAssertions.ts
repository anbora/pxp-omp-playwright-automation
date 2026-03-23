import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";

export class HrDataJobFamiliesAssertions extends BaseAssertion <HrDataJobFamiliesPage> {

    public assertThatJobFamilyIsDisplayedOnTheList(jobFamily: string): HrDataJobFamiliesAssertions {
        this.assertThat(this.page.familyName.first()).containsText(jobFamily, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family name found on the list.");
        return this;
    }

    public assertThatDeletedJobFamilyIsNotDisplayedOnTheList(): HrDataJobFamiliesAssertions {
        this.assertThat(this.page.searchResults.first()).containsText("There are no records available yet", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family name not found on the list.");
        return this;
    }
}
