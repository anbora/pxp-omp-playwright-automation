import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";

export class HrDataEditLocationAssertions extends BaseAssertion <HrDataLocationPage> {

    public assertThatLocationNameIsDisplayedOnTheList(location: string): HrDataEditLocationAssertions {
        this.assertThat(this.page.locationName.first()).containsText(location, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Location found on the list.");
        return this;
    }

    public assertThatLocationCountryEditIsDisplayedOnTheList(country: string): HrDataEditLocationAssertions {
        this.assertThat(this.page.countryName.first()).containsText(country, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Location country after edit name found on the list.");
        return this;
    }
}
