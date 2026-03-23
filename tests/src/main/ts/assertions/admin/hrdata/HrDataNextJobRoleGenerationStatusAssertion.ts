import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { NextJobRolesGenerationalStatusPage } from "pages/admin/NextJobRolesGenerationalStatusPage";

export class HrDataNextJobRoleGenerationStatusAssertion extends BaseAssertion <NextJobRolesGenerationalStatusPage> {

    public assertThatNextJobRolesGenerationalStatusContainsValues(): HrDataNextJobRoleGenerationStatusAssertion {
        this.assertThat(this.page.nextRoleGenerationalStatusResults.first()).containsText("In progress", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Next job roles generation status results contains role name.");
        return this;
    }
}
