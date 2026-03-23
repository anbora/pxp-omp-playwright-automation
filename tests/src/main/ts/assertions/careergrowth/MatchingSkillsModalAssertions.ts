import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MatchingSkillsModalPage } from "pages/careergrowth/MatchingSkillsModalPage";

export class MatchingSkillsModalAssertions extends BaseAssertion<MatchingSkillsModalPage> {

    public static readonly MATCHING_SKILL_STATUS_COLUMN_NUMBER: number = 4;
    public static readonly MATCHING_SKILL_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER: number = 2;

    public assertMatchingSkillUserLevelIs(skillLabel: string, level: string): MatchingSkillsModalAssertions {
        this.assertThat(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER)).hasText(level);
        return this;
    }

    public assertMatchingSkillExpectedLevelIs(skillLabel: string, level: string): MatchingSkillsModalAssertions {
        this.assertThat(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_LEVEL_COLUMN_NUMBER)).hasText(level);
        return this;
    }

    public assertMatchingSkillStatusIs(skillLabel: string, status: string): MatchingSkillsModalAssertions {
        this.assertThat(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_STATUS_COLUMN_NUMBER)).hasText(status);
        return this;
    }
}
