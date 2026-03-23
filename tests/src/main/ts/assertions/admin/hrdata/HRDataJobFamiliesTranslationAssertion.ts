import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { JobFamilyTranslationPage } from "pages/admin/JobFamilyTranslationPage";

export class HRDataJobFamiliesTranslationAssertion extends BaseAssertion <JobFamilyTranslationPage> {
    public assertThatJobFamilyTranslationIsDisplayed(jobFamily: string): HRDataJobFamiliesTranslationAssertion {
        this.assertThat(this.page.familyName.first()).hasValue(jobFamily);
        this.page.logger.info("Successfully verified data. Job family translation name contains text.");
        return this;
    }

    public assertThatJobFamilyTranslationDescriptionIsDisplayed(jobFamily: string): HRDataJobFamiliesTranslationAssertion {
        this.assertThat(this.page.familyDescription.first()).containsText(jobFamily, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family translation description contains text.");
        return this;
    }
}
