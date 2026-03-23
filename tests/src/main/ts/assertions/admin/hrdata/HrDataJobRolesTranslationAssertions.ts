import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { JobRoleTranslationPage } from "pages/admin/users/JobRoleTranslationPage";

export class HrDataJobRolesTranslationAssertions extends BaseAssertion<JobRoleTranslationPage> {

    public assertThatJobRoleTranslationSummaryIsDisplayed(translationSummary: string): HrDataJobRolesTranslationAssertions {
        this.assertThat(this.page.translationSummary).containsText(translationSummary, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job role name found on the list.");
        return this;
    }
}
