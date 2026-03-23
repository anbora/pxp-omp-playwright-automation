import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { LocationTranslationPage } from "pages/admin/LocationTranslationPage";

export class HrDataLocationTranslationAssertions extends BaseAssertion <LocationTranslationPage> {

    public assertThatLocationTranslationIsDisplayed(location: string): HrDataLocationTranslationAssertions {
        this.assertThat(this.page.locationName.first()).hasValue(location);
        this.page.logger.info("Successfully verified data. Location translation name contains text.");
        return this;
    }
}
