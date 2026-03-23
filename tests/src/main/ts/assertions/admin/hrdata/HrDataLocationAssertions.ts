import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";

export class HrDataLocationAssertions extends BaseAssertion<HrDataLocationPage> {

    public assertThatLocationIsDisplayedOnTheList(location: string): HrDataLocationAssertions {
        this.assertThat(this.page.locationName.first()).containsText(location, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Location name found on the list.");
        return this;
    }
}
