// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { NextJobRolesGenerationalStatusPage } from "pages/admin/NextJobRolesGenerationalStatusPage";
import { expect } from "common/testing/playwright";

export class HrDataNextJobRoleGenerationStatusAssertion extends BaseAssertion <NextJobRolesGenerationalStatusPage> {

    public assertThatNextJobRolesGenerationalStatusContainsValues(): HrDataNextJobRoleGenerationStatusAssertion {
        expect(this.page.nextRoleGenerationalStatusResults.first()).toContainText("In progress", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Next job roles generation status results contains role name.");
        return this;
    }
}
