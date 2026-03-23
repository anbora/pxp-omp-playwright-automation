import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";

export class HrDataEditJobFamiliesAssertion extends BaseAssertion <HrDataJobFamiliesPage> {

    public assertThatJobFamilyIsDisplayedOnTheList(jobFamily: string): HrDataEditJobFamiliesAssertion {
        this.assertThat(this.page.familyName.first()).containsText(jobFamily, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family name found on the list.");
        return this;
    }
}
