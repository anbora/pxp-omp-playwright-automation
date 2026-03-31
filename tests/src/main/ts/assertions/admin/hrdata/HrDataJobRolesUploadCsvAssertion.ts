// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";
import { expect } from "common/testing/playwright";

export class HrDataJobRolesUploadCsvAssertion extends BaseAssertion <HrDataJobRolesPage> {

    public assertThatUploadedRoleDisplayedOnTheList(): HrDataJobRolesUploadCsvAssertion {
        expect(this.page.searchResults.first()).toContainText("CSV Import Role", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job role name found on the list.");
        return this;
    }

}
