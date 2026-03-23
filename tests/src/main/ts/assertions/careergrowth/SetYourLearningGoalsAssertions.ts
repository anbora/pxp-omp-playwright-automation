import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { SetYourLerningGoalsModalPage } from "pages/careergrowth/SetYourLerningGoalsModalPage";

export class SetYourLearningGoalsAssertions extends BaseAssertion<SetYourLerningGoalsModalPage> {
    public static readonly LEARNING_TARGET_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly ROLE_TARGET_LEVEL_COLUMN_NUMBER: number = 2;

    public assertRoleTargetLevelForSkillIs(skillLabel: string, level: string): SetYourLearningGoalsAssertions {
        this.assertThat(this.page.learningGoalColumn(skillLabel, ROLE_TARGET_LEVEL_COLUMN_NUMBER).locator("p")).hasText(level);
        return this;
    }
    public assertLearningTargetLevelForSkillIs(skillLabel: string, level: string): SetYourLearningGoalsAssertions {
        this.assertThat(this.page.learningGoalColumn(skillLabel, LEARNING_TARGET_LEVEL_COLUMN_NUMBER).locator("//select/option[@selected]")).hasText(level);
        return this;
    }
}
