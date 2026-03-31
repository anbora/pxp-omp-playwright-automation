// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { expect } from "common/testing/playwright";

export class CareerGrowthJobRoleTabAssertions extends BaseAssertion <RolesListPage_New> {

    public assertMatchText(matchText: string): CareerGrowthJobRoleTabAssertions {
        expect(this.page.firstRoleFairMatch).toHaveText(matchText);
        return this;
    }
}
