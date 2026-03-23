import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { LiveEventCardModal } from "pages/smartcard/LiveEventCardModal";

export class LiveEventCardModalAssertions  extends BaseAssertion<LiveEventCardModal> {

    public assertThatArchiveContentCheckboxIsEnabled(): LiveEventCardModalAssertions {
        this.assertThat(this.page.archiveContentCheckbox).isEnabled();
        this.page.logger.info("Successfully verified that archive this content checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentDateIsAdded(date: string): LiveEventCardModalAssertions {
        this.assertThat(this.page.getArchiveDate()).containsText(date);
        this.page.logger.info("Successfully verified that automatically archive date is added");
        return this;
    }
}
