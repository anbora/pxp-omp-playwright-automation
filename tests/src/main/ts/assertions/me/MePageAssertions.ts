import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { UserModel } from "models/user/UserModel";
import { AbstractMePage } from "pages/me/share/AbstractMePage";

export class MePageAssertions extends BaseAssertion<AbstractMePage> {

    public static readonly BEGINNER_LEVEL: number = 1;
    public static readonly ADVANCED_LEVEL: number = 3;

    public assertThatViewDetailsButtonIsDisplayed(): MePageAssertions {
        this.assertThat(this.page.viewDetailsButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. View details button is visible");
        return this;
    }

    public assertThatSkillsAssessmentButtonIsDisplayed(): MePageAssertions {
        this.assertThat(this.page.skillsAssessmentButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Skills assessment button is visible");
        return this;
    }

    public assertThatViewPublicProfileIconIsDisplayed(): MePageAssertions {
        this.assertThat(this.page.viewPublicProfileIcon).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. View public profile icon is visible");
        return this;
    }

    public assertThatEditProfileButtonIsDisplayed(): MePageAssertions {
        this.assertThat(this.page.editButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Edit profile button is visible");
        return this;
    }

    public assertThatPointsLabelIsDisplayed(): MePageAssertions {
        this.assertThat(this.page.pointsLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Points label is visible");
        return this;
    }

    public assertThatSkillPassportTabIsDisplayed(): MePageAssertions {
        this.assertThat(this.page.skillsTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillPassportTabIsNotDisplayed(): MePageAssertions {
        this.assertThat(this.page.skillsTab).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatProjectsTabIsNotDisplayed(): MePageAssertions {
        this.assertThat(this.page.projectsTab).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatMentorshipsTabIsNotDisplayed(): MePageAssertions {
        this.assertThat(this.page.mentorshipsTab).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertLearningGoals(expectedRules: Set<string>): MePageAssertions {
        this.page.pause(2000);
        Assert.assertEquals(this.page.getLearningGoals(), expectedRules);
        return this;
    }

    public assertLearningGoalHasGotAdvancedLevel(learningGoal: string): MePageAssertions {
        this.assertThat(this.page.learningGoalLevel(learningGoal)).hasCount(ADVANCED_LEVEL);
        return this;
    }

    public assertLearningGoalHasGotBeginnerLevel(learningGoal: string): MePageAssertions {
        this.assertThat(this.page.learningGoalLevel(learningGoal)).hasCount(BEGINNER_LEVEL);
        return this;
    }

    public assertThatUsernameIsVisible(user: UserModel): MePageAssertions {
        this.assertThat(this.page.username(user)).isVisible(this.isVisibleOptions);
        return this;
    }
}
