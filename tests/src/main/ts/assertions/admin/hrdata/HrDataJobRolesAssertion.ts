import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class HrDataJobRolesAssertion extends BaseAssertion <HrDataJobRolesPage> {
        public assertThatJobRoleIsDisplayedOnTheList(jobRole: string): HrDataJobRolesAssertion {
            this.assertThat(this.page.jobRoleName.first()).containsText(jobRole, this.containsTextOptions);
            this.page.logger.info("Successfully verified data. Job role name found on the list.");
            return this;
        }
}
