// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";
import { expect } from "common/testing/playwright";

export class HrDataEditJobFunctionAssertion extends BaseAssertion<HrDataJobFunctionsPage> {

    public assertThatJobFunctionIsDisplayedOnTheListAfterEdit(functionNameAfterEdit: string): HrDataEditJobFunctionAssertion {
        expect(this.page.jobFunctionTitleInTable.first()).toContainText(functionNameAfterEdit, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job function name found on the list.");
        return this;
    }
}
