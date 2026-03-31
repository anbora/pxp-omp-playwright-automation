// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { expect } from "common/testing/playwright";

export class RoleCardAssertions extends BaseAssertion<RolesListPage_New> {

    public assertThatLocationIsVisibleOnJobRoleCard(): RoleCardAssertions {
        expect(this.page.jobRoleLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobRoleCard(): RoleCardAssertions {
        expect(this.page.jobRoleLocation).toBeHidden();
        return this;
    }
}
