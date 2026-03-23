import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class HrDataAssertions extends BaseAssertion<HrDataJobRolesPage> {

    public assertThatJobRoleIsDisplayedOnTheList(jobRole: string): HrDataAssertions {
        this.assertThat(this.page.jobRoleTitleInTable.first()).containsText(jobRole, this.containsTextOptions);
        return this;
    }
}
