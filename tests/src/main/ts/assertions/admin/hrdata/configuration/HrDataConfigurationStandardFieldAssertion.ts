// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationStandardFieldAssertion extends BaseAssertion<HrDataConfigurationStandardFieldPage> {

    public assertThatCountryLabelIsVisible(): HrDataConfigurationStandardFieldAssertion {
        expect(this.page.countryFieldLabel).toBeVisible(this.isVisibleOptions);
        return this;
    }

}
