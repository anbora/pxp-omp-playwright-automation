// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";
import { expect } from "common/testing/playwright";

export class HrDataJobRolesAssertion extends BaseAssertion <HrDataJobRolesPage> {
        public assertThatJobRoleIsDisplayedOnTheList(jobRole: string): HrDataJobRolesAssertion {
            expect(this.page.jobRoleName.first()).toContainText(jobRole, this.containsTextOptions);
            this.page.logger.info("Successfully verified data. Job role name found on the list.");
            return this;
        }
}
