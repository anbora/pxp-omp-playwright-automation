// @ts-nocheck
import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { CareerGrowthJobRoleTabAssertions } from "assertions/careergrowth/roles/CareerGrowthJobRoleTabAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { WidgetsOnLandingPage } from "common/enums/landingpage/WidgetsOnLandingPage";
import { BrowserContext, expect } from "common/testing/playwright";
import { Assert, assertFalse, assertTrue } from "common/testing/runtime";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";
import { LandingPage } from "pages/landing/LandingPage";

export class LandingPageAssertions extends BaseAssertion<LandingPage> {

    public assertThatHomePageIsLoaded(user: UserModel): LandingPageAssertions {
        this.page.assertHomePageLoaded(user);
        return this;
    }

    public assertThereIsAtLeastOneNewNotification(): LandingPageAssertions {
        Assert.assertTrue(Integer.parseInt(this.page.notificationsCounter().textContent()) > 0);
        return this;
    }

    public assertNotificationHasArrived(notificationText: string): LandingPageAssertions {
        expect(this.page.notificationMessage(notificationText).first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatCreateProjectButtonIsDisplayed(): LandingPageAssertions {
        expect(this.page.createProjectButton().first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateProjectButtonIsNotDisplayed(): LandingPageAssertions {
        expect(this.page.createProjectButton().first()).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatAllTabForContinueLearningWidgetIsNotVisible(): LandingPageAssertions {
        expect(this.page.allTabForWidget(CONTINUE_LEARNING)).not.toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDueDateTabForContinueLearningWidgetIsNotVisible(): LandingPageAssertions {
        expect(this.page.dueDateTabForWidget(CONTINUE_LEARNING)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatIconForEmptyContinueLearningWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.iconForEmptyContentInLearningWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMessageForEmptyContinueLearningWidgetContains(message: string): LandingPageAssertions {
        expect(this.page.messageForEmptyContentInLearningWidget.last()).toContainText(message, this.containsTextOptions);
        return this;
    }

    public assertThatMessageForEmptyRecentUpdatesWidgetContains(message: string): LandingPageAssertions {
        expect(this.page.messageForEmptyRecentUpdatesWidget).toContainText(message, this.containsTextOptions);
        return this;
    }

    public assertThatSeeAllButtonForRecentUpdatesWidgetIsDisabled(): LandingPageAssertions {
        expect(this.page.seeAllButtonForWidget(WidgetsOnLandingPage.RECENT_UPDATES).first()).toBeDisabled();
        return this;
    }

    public assertThatCardTypeInContinueLearningIsVisible(cardName: string, cardType: string): LandingPageAssertions {
        expect(this.page.smartCardTypeForLearningWidget(cardName, cardType)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCardNameInContinueLearningWidgetIsVisible(cardName: string): LandingPageAssertions {
        expect(this.page.smartCardNameForLearningWidget(cardName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCardImageInContinueLearningWidgetIsVisible(cardName: string): LandingPageAssertions {
        expect(this.page.smartCardImageForLearningWidget(cardName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNotificationForRecentUpdatesWidgetContains(notificationMessage: string): LandingPageAssertions {
        expect(this.page.notificationMessageRecentUpdatesWidget.first()).toContainText(notificationMessage, this.containsTextOptions);
        return this;
    }

    public assertThatTickIconForSetUpYourAccountInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.setUpYourAccountTickIconForCompleteYourProfileWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTickIconForAddSkillsInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.addSkillsTickIconForCompleteYourProfileWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTickIconForUpdateYourWorkExperienceInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.workExperienceTickIconForCompleteYourProfileWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatArrowIconForSetUpYourAccountInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.setUpYourAccountArrowIconForCompleteYourProfileWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatArrowIconForAddSkillsInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.addSkillsArrowIconForCompleteYourProfileWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatArrowIconForUpdateYourWorkExperienceInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.workExperienceArrowIconForCompleteYourProfileWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatPercentageInCompleteYourProfileWidgetContains(value: string): LandingPageAssertions {
        expect(this.page.percentageForCompleteYourProfileWidget).toHaveAttribute("aria-label", value, this.hasAttributeOptions);
        return this;
    }

    public assertThatUserNameInWelcomeWidgetIsVisible(user: UserModel): LandingPageAssertions {
        expect(this.page.userWelcomeName(user)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUserProfileImageInWelcomeWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.userProfileImageInWelcomeWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatWelcomeStringAndSubTextInWelcomeWidgetIsVisible(): LandingPageAssertions {
        expect(this.page.welcomeStringAndSubTextInWelcomeWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorsCarouselWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.mentorsCarousel).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatBookmarksWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.bookmarksWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAssignedLearningWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.assignedLearningWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorsCarouselWidgetIsNotDisplayed(): LandingPageAssertions {
        expect(this.page.mentorsCarousel).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatFirstMentorCardIsLoaded(): LandingPageAssertions {
        expect(this.page.mentorAvatar.first()).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorName.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAnnouncementsWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.announcementsWidget()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAnnouncementIsVisible(announcementTitleContainer: ResultContainer): LandingPageAssertions {
        expect(this.page.announcement(announcementTitleContainer.getValue())).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNewOpeningsWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.newOpeningsWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNewOpeningsWidgetIsNotDisplayed(): LandingPageAssertions {
        expect(this.page.newOpeningsWidget).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatThereIsAtLeastOneProjectInProjectsTab(): LandingPageAssertions {
        expect(this.page.projectsTitleLocator.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLearningFeedWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.learningFeedWidget).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLearningFeedWidgetIsNotDisplayed(): LandingPageAssertions {
        expect(this.page.learningFeedWidget).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatTodaysInsightsTabIsDisplayed(): LandingPageAssertions {
        expect(this.page.todaysInsightsTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTodaysInsightsTabIsActivated(): LandingPageAssertions {
        expect(this.page.todaysInsightsTab).toHaveAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatTeamLearningTabIsDisplayed(): LandingPageAssertions {
        expect(this.page.teamLearningTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTeamLearningTabIsActivated(): LandingPageAssertions {
        expect(this.page.teamLearningTab).toHaveAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatMyAssignmentsTabIsDisplayed(): LandingPageAssertions {
        expect(this.page.myAssignmentsTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMyAssignmentsTabIsActivated(): LandingPageAssertions {
        expect(this.page.myAssignmentsTab).toHaveAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatFeaturedTabIsDisplayed(): LandingPageAssertions {
        expect(this.page.featuredTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFeaturedTabIsActivated(): LandingPageAssertions {
        expect(this.page.featuredTab).toHaveAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatLearningFeedNoCardsIconIsDisplayed(): LandingPageAssertions {
        expect(this.page.learningFeedNoCardsIcon).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatInProgressWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.inProgressWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecentUpdatesWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.recentUpdatesWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecentUpdatesWidgetIsNotDisplayed(): LandingPageAssertions {
        expect(this.page.recentUpdatesWidgetHeader).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatYourNextCareerMilestoneWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.yourNextCareerMilestoneWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatYourNextCareerMilestoneWidgetIsNotDisplayed(): LandingPageAssertions {
        expect(this.page.yourNextCareerMilestoneWidgetHeader).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatYourCompleteYourProfileWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.completeYourProfileWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLeaderboardWidgetIsDisplayed(): LandingPageAssertions {
        expect(this.page.leaderboardWidgetHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancyAllPageLoads(): LandingPageAssertions {
        expect(this.page.allJobVacanciesPageHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatYourNextCareerMilestoneWidgetIsEmpty(): LandingPageAssertions {
        expect(this.page.yourNextCareerMilestoneWidgetEmptyLabel).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAspirationRoleIsDisplayed(roleTitle: string): LandingPageAssertions {
        expect(this.page.aspirationalRoleWithTitle(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfilePercentageCompleted(percentageValue: string): LandingPageAssertions {
        expect(this.page.completeYourProfileWidgetCompletionPercentage(percentageValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileWidgetAvatarIsDisplayed(): LandingPageAssertions {
        expect(this.page.completeYourProfileWidgetAvatar).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileWidgetCompleteNowIsDisplayed(): LandingPageAssertions {
        expect(this.page.completeYourProfileWidgetCompleteNowButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileWidgetUpdateNowIsDisplayed(): LandingPageAssertions {
        expect(this.page.completeYourProfileWidgetUpdateNowButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatHelpSectionIsVisible(): LandingPageAssertions {
        this.assertTrue(this.page.helpSection.isVisible(), "Help section should be visible!");
        this.page.logger.info("Successfully verified that help section is visible in admin panel");
        return this;
    }

    public assertThatHelpSectionIsInvisible(): LandingPageAssertions {
        this.assertFalse(this.page.helpSection.isVisible(), "Help section should be invisible!");
        this.page.logger.info("Successfully verified that help section is invisible in admin panel");
        return this;
    }

    public assertThatConfigureLandingPageIsLoaded(): LandingPageAssertions {
        expect(this.page.configureLandingPageHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatWidgetLibraryCarouselIsLoaded(): LandingPageAssertions {
        expect(this.page.configureLandingPageWidgetLibraryCarousel).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatConfigureLandingPageSaveCancelButtonIsVisible(): LandingPageAssertions {
        expect(this.page.configureLandingPageSaveCancelButtons).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatEmptyLandingPageWarningModalIsDisplayed(): LandingPageAssertions {
        expect(this.page.configureLandingPageEmptyLayoutWarningModal()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatStartEditingButtonIsDisplayed(): LandingPageAssertions {
        expect(this.page.emptyLandingPageStartEditingButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMatchText(matchText: string): LandingPageAssertions {
        expect(this.page.nextCareerMilestoneRoleMatching).toHaveText(matchText);
        return this;
    }

    public assertThatLevelEngagementIsNotDisplayedOnLandingPage(): LandingPageAssertions {
        expect(this.page.yourNextCareerMilestoneArticleLevel.last()).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatLevelEngagementIsDisplayedOnLandingPage(): LandingPageAssertions {
        expect(this.page.yourNextCareerMilestoneArticleLevel.last()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorCardApplicationStatusIsDisplayed(status: string): LandingPageAssertions {
        expect((this.page.mentorCardApplicationStatus(status))).toBeVisible(this.isVisibleOptions);
        return this;
    }

}
