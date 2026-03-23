import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";

export class HrDataConfigurationStandardFieldAssertion extends BaseAssertion<HrDataConfigurationStandardFieldPage> {

    public assertThatCountryLabelIsVisible(): HrDataConfigurationStandardFieldAssertion {
        this.assertThat(this.page.countryFieldLabel).isVisible(this.isVisibleOptions);
        return this;
    }

}
