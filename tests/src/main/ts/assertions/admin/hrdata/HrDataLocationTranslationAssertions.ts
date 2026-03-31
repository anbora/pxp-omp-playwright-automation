// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { LocationTranslationPage } from "pages/admin/LocationTranslationPage";
import { expect } from "common/testing/playwright";

export class HrDataLocationTranslationAssertions extends BaseAssertion <LocationTranslationPage> {

    public assertThatLocationTranslationIsDisplayed(location: string): HrDataLocationTranslationAssertions {
        expect(this.page.locationName.first()).toHaveValue(location);
        this.page.logger.info("Successfully verified data. Location translation name contains text.");
        return this;
    }
}
