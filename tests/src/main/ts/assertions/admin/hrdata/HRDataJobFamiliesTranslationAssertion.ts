// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { JobFamilyTranslationPage } from "pages/admin/JobFamilyTranslationPage";
import { expect } from "common/testing/playwright";

export class HRDataJobFamiliesTranslationAssertion extends BaseAssertion <JobFamilyTranslationPage> {
    public assertThatJobFamilyTranslationIsDisplayed(jobFamily: string): HRDataJobFamiliesTranslationAssertion {
        expect(this.page.familyName.first()).toHaveValue(jobFamily);
        this.page.logger.info("Successfully verified data. Job family translation name contains text.");
        return this;
    }

    public assertThatJobFamilyTranslationDescriptionIsDisplayed(jobFamily: string): HRDataJobFamiliesTranslationAssertion {
        expect(this.page.familyDescription.first()).toContainText(jobFamily, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family translation description contains text.");
        return this;
    }
}
