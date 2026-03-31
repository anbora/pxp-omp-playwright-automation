// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { UploadHistoryPage } from "pages/admin/users/UploadHistoryPage";
import { expect } from "common/testing/playwright";

export class HrDataUploadHistoryAssertion extends BaseAssertion <UploadHistoryPage> {

    public assertThatUploadHistoryContainsValues(): HrDataUploadHistoryAssertion {
        expect(this.page.uploadHistoryResults.first()).toContainText("FAMILY_SAMPLE.csv", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Upload history contains family name.");
        return this;
    }
}
