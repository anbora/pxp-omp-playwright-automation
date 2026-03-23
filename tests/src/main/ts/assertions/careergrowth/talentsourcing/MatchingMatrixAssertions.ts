import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MatchingMatrixPage } from "pages/careergrowth/talentsourcing/MatchingMatrixPage";

export class MatchingMatrixAssertions extends BaseAssertion<MatchingMatrixPage> {

    public assertThatMatchingSkillTitleIsDisplayed(): MatchingMatrixAssertions {
        this.assertThat(this.page.matchingSkill).isVisible();
        return this;
    }

    public assertThatFirstMatchingSkillsIsDisplayed(): MatchingMatrixAssertions {
        this.assertThat(this.page.getFirstMatchingSkills).isVisible(this.isVisibleOptions);
        return this;
    }
}
