// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";
import { expect } from "common/testing/playwright";

export class HrDataEditLocationAssertions extends BaseAssertion <HrDataLocationPage> {

    public assertThatLocationNameIsDisplayedOnTheList(location: string): HrDataEditLocationAssertions {
        expect(this.page.locationName.first()).toContainText(location, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Location found on the list.");
        return this;
    }

    public assertThatLocationCountryEditIsDisplayedOnTheList(country: string): HrDataEditLocationAssertions {
        expect(this.page.countryName.first()).toContainText(country, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Location country after edit name found on the list.");
        return this;
    }
}
