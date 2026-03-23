import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";

export class HrDataEditJobFunctionAssertion extends BaseAssertion<HrDataJobFunctionsPage> {

    public assertThatJobFunctionIsDisplayedOnTheListAfterEdit(functionNameAfterEdit: string): HrDataEditJobFunctionAssertion {
        this.assertThat(this.page.jobFunctionTitleInTable.first()).containsText(functionNameAfterEdit, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job function name found on the list.");
        return this;
    }
}
