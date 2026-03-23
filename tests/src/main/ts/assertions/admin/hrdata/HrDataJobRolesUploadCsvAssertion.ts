import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class HrDataJobRolesUploadCsvAssertion extends BaseAssertion <HrDataJobRolesPage> {

    public assertThatUploadedRoleDisplayedOnTheList(): HrDataJobRolesUploadCsvAssertion {
        this.assertThat(this.page.searchResults.first()).containsText("CSV Import Role", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job role name found on the list.");
        return this;
    }

}
