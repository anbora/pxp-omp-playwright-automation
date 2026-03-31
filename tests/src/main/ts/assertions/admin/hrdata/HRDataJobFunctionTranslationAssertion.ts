// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { JobFunctionTranslationPage } from "pages/admin/JobFunctionTranslationPage";
import { expect } from "common/testing/playwright";

export class HRDataJobFunctionTranslationAssertion extends BaseAssertion <JobFunctionTranslationPage> {

    public assertThatJobFunctionTranslationIsDisplayed(functionNameTranslation: string): HRDataJobFunctionTranslationAssertion {
        expect(this.page.functionName.first()).toHaveValue(functionNameTranslation);
        this.page.logger.info("Successfully verified data. Job function translation name contains text.");
        return this;
    }
}
