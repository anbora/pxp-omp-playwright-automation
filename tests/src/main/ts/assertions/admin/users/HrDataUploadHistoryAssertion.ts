import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { UploadHistoryPage } from "pages/admin/users/UploadHistoryPage";

export class HrDataUploadHistoryAssertion extends BaseAssertion <UploadHistoryPage> {

    public assertThatUploadHistoryContainsValues(): HrDataUploadHistoryAssertion {
        this.assertThat(this.page.uploadHistoryResults.first()).containsText("FAMILY_SAMPLE.csv", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Upload history contains family name.");
        return this;
    }
}
