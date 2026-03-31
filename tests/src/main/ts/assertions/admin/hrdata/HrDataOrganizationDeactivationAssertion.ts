// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { EditOrganizationPage } from "pages/admin/share/EditOrganizationPage";
import { expect } from "common/testing/playwright";

export class HrDataOrganizationDeactivationAssertion extends BaseAssertion <EditOrganizationPage> {
    public assertThatDeactivationWarningIsDisplayed(): HrDataOrganizationDeactivationAssertion {
        expect(this.page.deactivationWarning.first()).toContainText("Setting Organization to Inactive will affect reporting and associations with Opportunities. Continue making this inactive?", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Deactivation warning is displayed");
        return this;
    }
  }
