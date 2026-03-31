// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";
import { expect } from "common/testing/playwright";

export class HrDataOrganizationAssertions extends BaseAssertion <HrDataOrganizationPage> {

    public assertThatOrganizationIsDisplayedOnTheList(organization: string): HrDataOrganizationAssertions {
        expect(this.page.organizationName.first()).toContainText(organization, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Organization name found on the list.");
        return this;
    }
}
