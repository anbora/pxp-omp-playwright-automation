// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { JobRoleTranslationPage } from "pages/admin/users/JobRoleTranslationPage";
import { expect } from "common/testing/playwright";

export class HrDataJobRolesTranslationAssertions extends BaseAssertion<JobRoleTranslationPage> {

    public assertThatJobRoleTranslationSummaryIsDisplayed(translationSummary: string): HrDataJobRolesTranslationAssertions {
        expect(this.page.translationSummary).toContainText(translationSummary, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job role name found on the list.");
        return this;
    }
}
