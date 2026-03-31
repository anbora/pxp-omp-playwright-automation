// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";
import { expect } from "common/testing/playwright";

export class HrDataJobFunctionsAssertions extends BaseAssertion<HrDataJobFunctionsPage> {

    public assertThatJobFunctionIsDisplayedOnTheList(functionName: string): HrDataJobFunctionsAssertions {
        expect(this.page.jobFunctionTitleInTable.first()).toContainText(functionName, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job function name found on the list.");
        return this;
    }

    public assertThatDeletedJobFunctionIsNotDisplayedOnTheList(): HrDataJobFunctionsAssertions {
        expect(this.page.searchResults.first()).toContainText("There are no records available yet", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job function name not found on the list.");
        return this;
    }
}
