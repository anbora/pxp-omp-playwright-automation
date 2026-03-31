// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";
import { expect } from "common/testing/playwright";

export class HrDataEditJobFamiliesAssertion extends BaseAssertion <HrDataJobFamiliesPage> {

    public assertThatJobFamilyIsDisplayedOnTheList(jobFamily: string): HrDataEditJobFamiliesAssertion {
        expect(this.page.familyName.first()).toContainText(jobFamily, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family name found on the list.");
        return this;
    }
}
