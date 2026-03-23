import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";

export class HrDataJobFunctionsAssertions extends BaseAssertion<HrDataJobFunctionsPage> {

    public assertThatJobFunctionIsDisplayedOnTheList(functionName: string): HrDataJobFunctionsAssertions {
        this.assertThat(this.page.jobFunctionTitleInTable.first()).containsText(functionName, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job function name found on the list.");
        return this;
    }

    public assertThatDeletedJobFunctionIsNotDisplayedOnTheList(): HrDataJobFunctionsAssertions {
        this.assertThat(this.page.searchResults.first()).containsText("There are no records available yet", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job function name not found on the list.");
        return this;
    }
}
