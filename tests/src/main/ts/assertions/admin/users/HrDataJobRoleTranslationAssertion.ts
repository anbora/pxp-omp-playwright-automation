import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { JobRoleTranslationPage } from "pages/admin/users/JobRoleTranslationPage";

export class HrDataJobRoleTranslationAssertion extends BaseAssertion <JobRoleTranslationPage>{

        public assertThatJobRoleTranslationIsDisplayed(jobRole: string): HrDataJobRoleTranslationAssertion {
            this.assertThat(this.page.roleName.first()).hasValue(jobRole);
            this.page.logger.info("Successfully verified data. Job role translation name contains text.");
            return this;
        }

        public assertThatJobRoleTranslationDescriptionIsDisplayed(roleDescriptionTranslation: string): HrDataJobRoleTranslationAssertion {
            this.assertThat(this.page.enterRoleDescription.first()).containsText(roleDescriptionTranslation, this.containsTextOptions);
            this.page.logger.info("Successfully verified data. Job role translation description contains text.");
            return this;
        }
}
