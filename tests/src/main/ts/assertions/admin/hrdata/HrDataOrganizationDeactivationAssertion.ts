import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { EditOrganizationPage } from "pages/admin/share/EditOrganizationPage";

export class HrDataOrganizationDeactivationAssertion extends BaseAssertion <EditOrganizationPage> {
    public assertThatDeactivationWarningIsDisplayed(): HrDataOrganizationDeactivationAssertion {
        this.assertThat(this.page.deactivationWarning.first()).containsText("Setting Organization to Inactive will affect reporting and associations with Opportunities. Continue making this inactive?", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Deactivation warning is displayed");
        return this;
    }
  }
