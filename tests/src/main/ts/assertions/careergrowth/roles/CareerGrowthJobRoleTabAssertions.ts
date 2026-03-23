import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";

export class CareerGrowthJobRoleTabAssertions extends BaseAssertion <RolesListPage_New> {

    public assertMatchText(matchText: string): CareerGrowthJobRoleTabAssertions {
        this.assertThat(this.page.firstRoleFairMatch).hasText(matchText);
        return this;
    }
}
