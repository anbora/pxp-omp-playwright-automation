// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";
import { expect } from "common/testing/playwright";

export class HrDataAssertions extends BaseAssertion<HrDataJobRolesPage> {

    public assertThatJobRoleIsDisplayedOnTheList(jobRole: string): HrDataAssertions {
        expect(this.page.jobRoleTitleInTable.first()).toContainText(jobRole, this.containsTextOptions);
        return this;
    }
}
