import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { JobFunctionTranslationPage } from "pages/admin/JobFunctionTranslationPage";

export class HRDataJobFunctionTranslationAssertion extends BaseAssertion <JobFunctionTranslationPage> {

    public assertThatJobFunctionTranslationIsDisplayed(functionNameTranslation: string): HRDataJobFunctionTranslationAssertion {
        this.assertThat(this.page.functionName.first()).hasValue(functionNameTranslation);
        this.page.logger.info("Successfully verified data. Job function translation name contains text.");
        return this;
    }
}
