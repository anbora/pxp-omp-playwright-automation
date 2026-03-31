// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { JobRolesUploadHistoryPage } from "pages/admin/JobRolesUploadHistoryPage";
import { expect } from "common/testing/playwright";

export class HrDataJobRoleUploadHistoryAssertion extends BaseAssertion <JobRolesUploadHistoryPage>{

    public assertThatUploadHistoryContainsValues(): HrDataJobRoleUploadHistoryAssertion {
        expect(this.page.uploadHistoryResults.first()).toContainText("ROLE_SAMPLE.csv", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Upload history contains role name.");
        return this;
    }

    public assertThatUploadHistoryIsSuccessfull(): HrDataJobRoleUploadHistoryAssertion {
        expect(this.page.uploadHistoryResultsSuccess.first()).toBeVisible();
        this.page.logger.info("Successfully verified data. Upload history is successfull");
        return this;
    }
}
