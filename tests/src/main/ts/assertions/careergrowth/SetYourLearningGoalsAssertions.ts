// @ts-nocheck
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { SetYourLerningGoalsModalPage } from "pages/careergrowth/SetYourLerningGoalsModalPage";
import { expect } from "common/testing/playwright";

export class SetYourLearningGoalsAssertions extends BaseAssertion<SetYourLerningGoalsModalPage> {
    public static readonly LEARNING_TARGET_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly ROLE_TARGET_LEVEL_COLUMN_NUMBER: number = 2;

    public assertRoleTargetLevelForSkillIs(skillLabel: string, level: string): SetYourLearningGoalsAssertions {
        expect(this.page.learningGoalColumn(skillLabel, ROLE_TARGET_LEVEL_COLUMN_NUMBER).locator("p")).toHaveText(level);
        return this;
    }
    public assertLearningTargetLevelForSkillIs(skillLabel: string, level: string): SetYourLearningGoalsAssertions {
        expect(this.page.learningGoalColumn(skillLabel, LEARNING_TARGET_LEVEL_COLUMN_NUMBER).locator("//select/option[@selected]")).toHaveText(level);
        return this;
    }
}
