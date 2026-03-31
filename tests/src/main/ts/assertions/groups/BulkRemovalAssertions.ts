// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertEquals } from "common/testing/runtime";
import { BulkRemovalPage } from "pages/groups/BulkRemovalPage";
import { expect } from "common/testing/playwright";

export class BulkRemovalAssertions extends BaseAssertion<BulkRemovalPage> {
    public assertThatDownloadSampleFileButtonIsVisible(): BulkRemovalAssertions {
        expect(this.page.getDownloadSampleFileButton()).toBeVisible();
        this.page.logger.info("Successfully verified that download sample file button is present");
        return this;
    }

    public assertDownloadedFileContent(actualContent: string, expectedContent: string): BulkRemovalAssertions {
        this.assertEquals(expectedContent, actualContent);
        this.page.logger.info("Successfully verified that downloaded sample file content is the same as expected file content");
        return this;
    }
}
