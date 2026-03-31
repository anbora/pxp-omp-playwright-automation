// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { LiveEventCardModal } from "pages/smartcard/LiveEventCardModal";
import { expect } from "common/testing/playwright";

export class LiveEventCardModalAssertions  extends BaseAssertion<LiveEventCardModal> {

    public assertThatArchiveContentCheckboxIsEnabled(): LiveEventCardModalAssertions {
        expect(this.page.archiveContentCheckbox).toBeEnabled();
        this.page.logger.info("Successfully verified that archive this content checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentDateIsAdded(date: string): LiveEventCardModalAssertions {
        expect(this.page.getArchiveDate()).toContainText(date);
        this.page.logger.info("Successfully verified that automatically archive date is added");
        return this;
    }
}
