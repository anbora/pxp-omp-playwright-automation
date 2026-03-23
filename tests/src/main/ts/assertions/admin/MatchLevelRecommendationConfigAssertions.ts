import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertTrue } from "common/testing/runtime";
import { MatchLevelRecommendationConfigPage } from "pages/admin/MatchLevelRecommendationConfigPage";

export class MatchLevelRecommendationConfigAssertions extends BaseAssertion<MatchLevelRecommendationConfigPage> {

    public assertThatMatchLevelLabel(language: string): MatchLevelRecommendationConfigAssertions {
        this.assertThat(this.page.matchLevelLanguage.first()).containsText(language, this.containsTextOptions);
        this.page.logger.info("Successfully verified that match level label is '" + language + "'.");
        return this;
    }

    public assertThatDefaultLabelIsEqualTo(label: string): MatchLevelRecommendationConfigAssertions {
        this.assertTrue(this.page.defaultLabel.getAttribute("value").contains(label));
        this.page.logger.info("Successfully verified that default label is '" + label + "'.");
        return this;
    }
}
