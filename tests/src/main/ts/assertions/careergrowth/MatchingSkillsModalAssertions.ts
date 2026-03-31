// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { MatchingSkillsModalPage } from "pages/careergrowth/MatchingSkillsModalPage";
import { expect } from "common/testing/playwright";

export class MatchingSkillsModalAssertions extends BaseAssertion<MatchingSkillsModalPage> {

    public static readonly MATCHING_SKILL_STATUS_COLUMN_NUMBER: number = 4;
    public static readonly MATCHING_SKILL_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER: number = 2;

    public assertMatchingSkillUserLevelIs(skillLabel: string, level: string): MatchingSkillsModalAssertions {
        expect(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER)).toHaveText(level);
        return this;
    }

    public assertMatchingSkillExpectedLevelIs(skillLabel: string, level: string): MatchingSkillsModalAssertions {
        expect(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_LEVEL_COLUMN_NUMBER)).toHaveText(level);
        return this;
    }

    public assertMatchingSkillStatusIs(skillLabel: string, status: string): MatchingSkillsModalAssertions {
        expect(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_STATUS_COLUMN_NUMBER)).toHaveText(status);
        return this;
    }
}
