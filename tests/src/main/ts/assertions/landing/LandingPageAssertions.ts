import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { CareerGrowthJobRoleTabAssertions } from "assertions/careergrowth/roles/CareerGrowthJobRoleTabAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { WidgetsOnLandingPage } from "common/enums/landingpage/WidgetsOnLandingPage";
import { BrowserContext } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert, assertFalse, assertTrue } from "common/testing/runtime";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";
import { LandingPage } from "pages/landing/LandingPage";

export class LandingPageAssertions extends BaseAssertion<LandingPage> {

    public assertThatHomePageIsLoaded(user: UserModel): LandingPageAssertions {
        this.assertThat(this.page.homeTab()).isVisible(this.isVisibleOptions);
        this.page.logger.info("-------------------------------------------------------------------");
        this.page.logger.info("User logged with data:");
        this.page.logger.info(" - id: " + user.id);
        this.page.logger.info(" - email: " + user.email);
        this.page.logger.info(" - password: " + user.password);
        this.page.logger.info("-------------------------------------------------------------------");
//        this.page.getPage().context().storageState(new BrowserContext.StorageStateOptions().setPath(Paths.get("auth.json")));
        return this;
    }

    public assertThereIsAtLeastOneNewNotification(): LandingPageAssertions {
        Assert.assertTrue(Integer.parseInt(this.page.notificationsCounter().textContent()) > 0);
        return this;
    }

    public assertNotificationHasArrived(notificationText: string): LandingPageAssertions {
        this.assertThat(this.page.notificationMessage(notificationText).first()).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatCreateProjectButtonIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.createProjectButton().first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateProjectButtonIsNotDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.createProjectButton().first()).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatAllTabForContinueLearningWidgetIsNotVisible(): LandingPageAssertions {
        this.assertThat(this.page.allTabForWidget(CONTINUE_LEARNING)).not().isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDueDateTabForContinueLearningWidgetIsNotVisible(): LandingPageAssertions {
        this.assertThat(this.page.dueDateTabForWidget(CONTINUE_LEARNING)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatIconForEmptyContinueLearningWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.iconForEmptyContentInLearningWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMessageForEmptyContinueLearningWidgetContains(message: string): LandingPageAssertions {
        this.assertThat(this.page.messageForEmptyContentInLearningWidget.last()).containsText(message, this.containsTextOptions);
        return this;
    }

    public assertThatMessageForEmptyRecentUpdatesWidgetContains(message: string): LandingPageAssertions {
        this.assertThat(this.page.messageForEmptyRecentUpdatesWidget).containsText(message, this.containsTextOptions);
        return this;
    }

    public assertThatSeeAllButtonForRecentUpdatesWidgetIsDisabled(): LandingPageAssertions {
        this.assertThat(this.page.seeAllButtonForWidget(WidgetsOnLandingPage.RECENT_UPDATES).first()).isDisabled();
        return this;
    }

    public assertThatCardTypeInContinueLearningIsVisible(cardName: string, cardType: string): LandingPageAssertions {
        this.assertThat(this.page.smartCardTypeForLearningWidget(cardName, cardType)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCardNameInContinueLearningWidgetIsVisible(cardName: string): LandingPageAssertions {
        this.assertThat(this.page.smartCardNameForLearningWidget(cardName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCardImageInContinueLearningWidgetIsVisible(cardName: string): LandingPageAssertions {
        this.assertThat(this.page.smartCardImageForLearningWidget(cardName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNotificationForRecentUpdatesWidgetContains(notificationMessage: string): LandingPageAssertions {
        this.assertThat(this.page.notificationMessageRecentUpdatesWidget.first()).containsText(notificationMessage, this.containsTextOptions);
        return this;
    }

    public assertThatTickIconForSetUpYourAccountInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.setUpYourAccountTickIconForCompleteYourProfileWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTickIconForAddSkillsInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.addSkillsTickIconForCompleteYourProfileWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTickIconForUpdateYourWorkExperienceInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.workExperienceTickIconForCompleteYourProfileWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatArrowIconForSetUpYourAccountInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.setUpYourAccountArrowIconForCompleteYourProfileWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatArrowIconForAddSkillsInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.addSkillsArrowIconForCompleteYourProfileWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatArrowIconForUpdateYourWorkExperienceInCompleteYourProfileWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.workExperienceArrowIconForCompleteYourProfileWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatPercentageInCompleteYourProfileWidgetContains(value: string): LandingPageAssertions {
        this.assertThat(this.page.percentageForCompleteYourProfileWidget).hasAttribute("aria-label", value, this.hasAttributeOptions);
        return this;
    }

    public assertThatUserNameInWelcomeWidgetIsVisible(user: UserModel): LandingPageAssertions {
        this.assertThat(this.page.userWelcomeName(user)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUserProfileImageInWelcomeWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.userProfileImageInWelcomeWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatWelcomeStringAndSubTextInWelcomeWidgetIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.welcomeStringAndSubTextInWelcomeWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorsCarouselWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.mentorsCarousel).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatBookmarksWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.bookmarksWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAssignedLearningWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.assignedLearningWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorsCarouselWidgetIsNotDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.mentorsCarousel).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatFirstMentorCardIsLoaded(): LandingPageAssertions {
        this.assertThat(this.page.mentorAvatar.first()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorName.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAnnouncementsWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.announcementsWidget()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAnnouncementIsVisible(announcementTitleContainer: ResultContainer): LandingPageAssertions {
        this.assertThat(this.page.announcement(announcementTitleContainer.getValue())).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNewOpeningsWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.newOpeningsWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNewOpeningsWidgetIsNotDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.newOpeningsWidget).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatThereIsAtLeastOneProjectInProjectsTab(): LandingPageAssertions {
        this.assertThat(this.page.projectsTitleLocator.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLearningFeedWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.learningFeedWidget).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLearningFeedWidgetIsNotDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.learningFeedWidget).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatTodaysInsightsTabIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.todaysInsightsTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTodaysInsightsTabIsActivated(): LandingPageAssertions {
        this.assertThat(this.page.todaysInsightsTab).hasAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatTeamLearningTabIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.teamLearningTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTeamLearningTabIsActivated(): LandingPageAssertions {
        this.assertThat(this.page.teamLearningTab).hasAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatMyAssignmentsTabIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.myAssignmentsTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMyAssignmentsTabIsActivated(): LandingPageAssertions {
        this.assertThat(this.page.myAssignmentsTab).hasAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatFeaturedTabIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.featuredTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFeaturedTabIsActivated(): LandingPageAssertions {
        this.assertThat(this.page.featuredTab).hasAttribute("class", "nav-link active", this.hasAttributeOptions);
        return this;
    }

    public assertThatLearningFeedNoCardsIconIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.learningFeedNoCardsIcon).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatInProgressWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.inProgressWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecentUpdatesWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.recentUpdatesWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecentUpdatesWidgetIsNotDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.recentUpdatesWidgetHeader).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatYourNextCareerMilestoneWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.yourNextCareerMilestoneWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatYourNextCareerMilestoneWidgetIsNotDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.yourNextCareerMilestoneWidgetHeader).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatYourCompleteYourProfileWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.completeYourProfileWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLeaderboardWidgetIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.leaderboardWidgetHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancyAllPageLoads(): LandingPageAssertions {
        this.assertThat(this.page.allJobVacanciesPageHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatYourNextCareerMilestoneWidgetIsEmpty(): LandingPageAssertions {
        this.assertThat(this.page.yourNextCareerMilestoneWidgetEmptyLabel).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAspirationRoleIsDisplayed(roleTitle: string): LandingPageAssertions {
        this.assertThat(this.page.aspirationalRoleWithTitle(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfilePercentageCompleted(percentageValue: string): LandingPageAssertions {
        this.assertThat(this.page.completeYourProfileWidgetCompletionPercentage(percentageValue)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileWidgetAvatarIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.completeYourProfileWidgetAvatar).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileWidgetCompleteNowIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.completeYourProfileWidgetCompleteNowButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileWidgetUpdateNowIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.completeYourProfileWidgetUpdateNowButton).isVisible(this.isVisibleOptions);
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
        this.assertThat(this.page.configureLandingPageHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatWidgetLibraryCarouselIsLoaded(): LandingPageAssertions {
        this.assertThat(this.page.configureLandingPageWidgetLibraryCarousel).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatConfigureLandingPageSaveCancelButtonIsVisible(): LandingPageAssertions {
        this.assertThat(this.page.configureLandingPageSaveCancelButtons).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatEmptyLandingPageWarningModalIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.configureLandingPageEmptyLayoutWarningModal()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatStartEditingButtonIsDisplayed(): LandingPageAssertions {
        this.assertThat(this.page.emptyLandingPageStartEditingButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMatchText(matchText: string): LandingPageAssertions {
        this.assertThat(this.page.nextCareerMilestoneRoleMatching).hasText(matchText);
        return this;
    }

    public assertThatLevelEngagementIsNotDisplayedOnLandingPage(): LandingPageAssertions {
        this.assertThat(this.page.yourNextCareerMilestoneArticleLevel.last()).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatLevelEngagementIsDisplayedOnLandingPage(): LandingPageAssertions {
        this.assertThat(this.page.yourNextCareerMilestoneArticleLevel.last()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorCardApplicationStatusIsDisplayed(status: string): LandingPageAssertions {
        this.assertThat((this.page.mentorCardApplicationStatus(status))).isVisible(this.isVisibleOptions);
        return this;
    }

}
