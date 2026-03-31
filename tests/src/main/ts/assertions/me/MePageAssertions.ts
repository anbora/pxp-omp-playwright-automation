// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { UserModel } from "models/user/UserModel";
import { AbstractMePage } from "pages/me/share/AbstractMePage";
import { expect } from "common/testing/playwright";

export class MePageAssertions extends BaseAssertion<AbstractMePage> {

    public static readonly BEGINNER_LEVEL: number = 1;
    public static readonly ADVANCED_LEVEL: number = 3;

    public assertThatViewDetailsButtonIsDisplayed(): MePageAssertions {
        expect(this.page.viewDetailsButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. View details button is visible");
        return this;
    }

    public assertThatSkillsAssessmentButtonIsDisplayed(): MePageAssertions {
        expect(this.page.skillsAssessmentButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Skills assessment button is visible");
        return this;
    }

    public assertThatViewPublicProfileIconIsDisplayed(): MePageAssertions {
        expect(this.page.viewPublicProfileIcon).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. View public profile icon is visible");
        return this;
    }

    public assertThatEditProfileButtonIsDisplayed(): MePageAssertions {
        expect(this.page.editButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Edit profile button is visible");
        return this;
    }

    public assertThatPointsLabelIsDisplayed(): MePageAssertions {
        expect(this.page.pointsLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Points label is visible");
        return this;
    }

    public assertThatSkillPassportTabIsDisplayed(): MePageAssertions {
        expect(this.page.skillsTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillPassportTabIsNotDisplayed(): MePageAssertions {
        expect(this.page.skillsTab).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatProjectsTabIsNotDisplayed(): MePageAssertions {
        expect(this.page.projectsTab).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatMentorshipsTabIsNotDisplayed(): MePageAssertions {
        expect(this.page.mentorshipsTab).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertLearningGoals(expectedRules: Set<string>): MePageAssertions {
        this.page.pause(2000);
        Assert.assertEquals(this.page.getLearningGoals(), expectedRules);
        return this;
    }

    public assertLearningGoalHasGotAdvancedLevel(learningGoal: string): MePageAssertions {
        expect(this.page.learningGoalLevel(learningGoal)).toHaveCount(ADVANCED_LEVEL);
        return this;
    }

    public assertLearningGoalHasGotBeginnerLevel(learningGoal: string): MePageAssertions {
        expect(this.page.learningGoalLevel(learningGoal)).toHaveCount(BEGINNER_LEVEL);
        return this;
    }

    public assertThatUsernameIsVisible(user: UserModel): MePageAssertions {
        expect(this.page.username(user)).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
