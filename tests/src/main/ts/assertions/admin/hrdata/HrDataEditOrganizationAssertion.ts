import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";

export class HrDataEditOrganizationAssertion extends BaseAssertion <HrDataOrganizationPage> {

    public assertThatOrganizationIsDisplayedOnTheList(organization: string): HrDataEditOrganizationAssertion {
        this.assertThat(this.page.organizationName.first()).containsText(organization, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Organization name found on the list.");
        return this;
    }
}
