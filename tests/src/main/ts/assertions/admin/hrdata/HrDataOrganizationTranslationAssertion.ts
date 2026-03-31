// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OrganizationTranslationPage } from "pages/admin/OrganizationTranslationPage";
import { expect } from "common/testing/playwright";

export class HrDataOrganizationTranslationAssertion extends BaseAssertion <OrganizationTranslationPage> {

    public assertThatOrganizationTranslationIsDisplayed(organization: string): HrDataOrganizationTranslationAssertion {
        expect(this.page.organizationName.first()).toHaveValue(organization);
        this.page.logger.info("Successfully verified data. Organization translation name contains text.");
        return this;
    }
}
