import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertEquals } from "common/testing/runtime";
import { BulkRemovalPage } from "pages/groups/BulkRemovalPage";

export class BulkRemovalAssertions extends BaseAssertion<BulkRemovalPage> {
    public assertThatDownloadSampleFileButtonIsVisible(): BulkRemovalAssertions {
        this.assertThat(this.page.getDownloadSampleFileButton()).isVisible();
        this.page.logger.info("Successfully verified that download sample file button is present");
        return this;
    }

    public assertDownloadedFileContent(actualContent: string, expectedContent: string): BulkRemovalAssertions {
        this.assertEquals(expectedContent, actualContent);
        this.page.logger.info("Successfully verified that downloaded sample file content is the same as expected file content");
        return this;
    }
}
