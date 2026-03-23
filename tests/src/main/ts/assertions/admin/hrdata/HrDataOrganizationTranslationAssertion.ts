import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OrganizationTranslationPage } from "pages/admin/OrganizationTranslationPage";

export class HrDataOrganizationTranslationAssertion extends BaseAssertion <OrganizationTranslationPage> {

    public assertThatOrganizationTranslationIsDisplayed(organization: string): HrDataOrganizationTranslationAssertion {
        this.assertThat(this.page.organizationName.first()).hasValue(organization);
        this.page.logger.info("Successfully verified data. Organization translation name contains text.");
        return this;
    }
}
