import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";

export class RoleCardAssertions extends BaseAssertion<RolesListPage_New> {

    public assertThatLocationIsVisibleOnJobRoleCard(): RoleCardAssertions {
        this.assertThat(this.page.jobRoleLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobRoleCard(): RoleCardAssertions {
        this.assertThat(this.page.jobRoleLocation).isHidden();
        return this;
    }
}
