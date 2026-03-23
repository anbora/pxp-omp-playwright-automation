import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { JobRolesUploadHistoryPage } from "pages/admin/JobRolesUploadHistoryPage";

export class HrDataJobRoleUploadHistoryAssertion extends BaseAssertion <JobRolesUploadHistoryPage>{

    public assertThatUploadHistoryContainsValues(): HrDataJobRoleUploadHistoryAssertion {
        this.assertThat(this.page.uploadHistoryResults.first()).containsText("ROLE_SAMPLE.csv", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Upload history contains role name.");
        return this;
    }

    public assertThatUploadHistoryIsSuccessfull(): HrDataJobRoleUploadHistoryAssertion {
        this.assertThat(this.page.uploadHistoryResultsSuccess.first()).isVisible();
        this.page.logger.info("Successfully verified data. Upload history is successfull");
        return this;
    }
}
