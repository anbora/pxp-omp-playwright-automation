// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";
import { expect } from "common/testing/playwright";

export class HrDataLocationAssertions extends BaseAssertion<HrDataLocationPage> {

    public assertThatLocationIsDisplayedOnTheList(location: string): HrDataLocationAssertions {
        expect(this.page.locationName.first()).toContainText(location, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Location name found on the list.");
        return this;
    }
}
