import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { HomePageAssertions } from "assertions/other/HomePageAssertions";
import { BasePage } from "common/BasePage";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ConfigureLandingPageTest extends BaseRestTest {

    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.user2 = this.createUser(true);
    }

    public configureLandingPagePermissionTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToHomePage()
                .clickProfileDropdown()
                .check(HomePageAssertions)
                .assertThatConfigureHomePageButtonIsNotDisplayed();
    }

    public configureLandingPageRemoveAndAddWidgetsTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .clickConfigureHomePageButton()
                .check(LandingPageAssertions)
                    .assertThatConfigureLandingPageIsLoaded()
                    .assertThatWidgetLibraryCarouselIsLoaded()
                    .assertThatConfigureLandingPageSaveCancelButtonIsVisible()
                .endAssertion()
                .deleteRows()
                .clickSaveAndExitButton()
                .check(LandingPageAssertions)
                    .assertThatEmptyLandingPageWarningModalIsDisplayed()
                .endAssertion()
                .clickYesButtonWarningModal()
                .check(LandingPageAssertions)
                    .assertThatStartEditingButtonIsDisplayed()
                .endAssertion()
                .clickStartEditingEmptyLandingPage()
                .check(LandingPageAssertions)
                    .assertThatConfigureLandingPageIsLoaded()
                    .assertThatConfigureLandingPageSaveCancelButtonIsVisible()
                    .assertThatWidgetLibraryCarouselIsLoaded()
                .endAssertion()
                .configureLandingPageAddWidget("Announcements")
                //.configureLandingPageAddWidget("Custom text display")
                .configureLandingPageAddWidget("User notifications")
                .configureLandingPageAddWidget("Profile completion guide")
                .configureLandingPageAddWidget("Learning Feed")
                .configureLandingPageAddWidget("Aspirational roles")
                .configureLandingPageAddWidget("Recommended Open Jobs and Projects")
                .configureLandingPageAddWidget("Recommended Mentorships")
                .configureLandingPageAddWidget("Learning in progress")
                .configureLandingPageAddWidget("Learning bookmarks")
                .configureLandingPageAddWidget("Learning assignments")
                .configureLandingPageAddWidget("Learning leaderboard")
                .clickSaveAndExitButton()
                .check(LandingPageAssertions)
                    .assertThatAnnouncementsWidgetIsDisplayed()
                    .assertThatYourCompleteYourProfileWidgetIsDisplayed()
                    .assertThatInProgressWidgetIsDisplayed()
                    .assertThatRecentUpdatesWidgetIsDisplayed()
                    .assertThatLearningFeedWidgetIsDisplayed()
                    .assertThatYourNextCareerMilestoneWidgetIsDisplayed()
                    .assertThatNewOpeningsWidgetIsDisplayed()
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                    .assertThatAssignedLearningWidgetIsDisplayed()
                    .assertThatBookmarksWidgetIsDisplayed()
                    .assertThatLeaderboardWidgetIsDisplayed()
                .endAssertion();
    }

   /* @Test(priority = 2)
    public restoreData(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .clickConfigureHomePageButton()
                .addAllLandingWidgets()
                .clickSaveAndExitButton();

    }*/

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
