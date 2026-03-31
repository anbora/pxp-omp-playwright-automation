// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";
import { expect } from "common/testing/playwright";

export class HrDataJobFamiliesAssertions extends BaseAssertion <HrDataJobFamiliesPage> {

    public assertThatJobFamilyIsDisplayedOnTheList(jobFamily: string): HrDataJobFamiliesAssertions {
        expect(this.page.familyName.first()).toContainText(jobFamily, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family name found on the list.");
        return this;
    }

    public assertThatDeletedJobFamilyIsNotDisplayedOnTheList(): HrDataJobFamiliesAssertions {
        expect(this.page.searchResults.first()).toContainText("There are no records available yet", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job family name not found on the list.");
        return this;
    }
}
