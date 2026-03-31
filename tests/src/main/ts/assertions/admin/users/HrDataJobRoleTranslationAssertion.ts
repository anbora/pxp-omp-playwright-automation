// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { JobRoleTranslationPage } from "pages/admin/users/JobRoleTranslationPage";
import { expect } from "common/testing/playwright";

export class HrDataJobRoleTranslationAssertion extends BaseAssertion <JobRoleTranslationPage>{

        public assertThatJobRoleTranslationIsDisplayed(jobRole: string): HrDataJobRoleTranslationAssertion {
            expect(this.page.roleName.first()).toHaveValue(jobRole);
            this.page.logger.info("Successfully verified data. Job role translation name contains text.");
            return this;
        }

        public assertThatJobRoleTranslationDescriptionIsDisplayed(roleDescriptionTranslation: string): HrDataJobRoleTranslationAssertion {
            expect(this.page.enterRoleDescription.first()).toContainText(roleDescriptionTranslation, this.containsTextOptions);
            this.page.logger.info("Successfully verified data. Job role translation description contains text.");
            return this;
        }
}
