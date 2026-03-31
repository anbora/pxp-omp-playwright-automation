// @ts-nocheck

import { BasePage } from "common/BasePage";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class ConfigureLandingPageTest extends BaseRestTest {

    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.user2 = this.createUser(true);
    }

    public configureLandingPagePermissionTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToHomePage();
        __page1 = __page1.clickProfileDropdown();
        expect(__page1.configureHomePageButton).not.toBeVisible({ timeout: 5000 });
    }

    public configureLandingPageRemoveAndAddWidgetsTest(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.clickConfigureHomePageButton();
        expect(__page2.configureLandingPageHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.configureLandingPageWidgetLibraryCarousel).toBeVisible({ timeout: 30000 });
        expect(__page2.configureLandingPageSaveCancelButtons).toBeVisible({ timeout: 30000 });
        __page2 = __page2.deleteRows();
        __page2 = __page2.clickSaveAndExitButton();
        expect(__page2.configureLandingPageEmptyLayoutWarningModal()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickYesButtonWarningModal();
        expect(__page2.emptyLandingPageStartEditingButton).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickStartEditingEmptyLandingPage();
        expect(__page2.configureLandingPageHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.configureLandingPageSaveCancelButtons).toBeVisible({ timeout: 30000 });
        expect(__page2.configureLandingPageWidgetLibraryCarousel).toBeVisible({ timeout: 30000 });
        __page2 = __page2.configureLandingPageAddWidget("Announcements");
        __page2 = __page2.configureLandingPageAddWidget("User notifications");
        __page2 = __page2.configureLandingPageAddWidget("Profile completion guide");
        __page2 = __page2.configureLandingPageAddWidget("Learning Feed");
        __page2 = __page2.configureLandingPageAddWidget("Aspirational roles");
        __page2 = __page2.configureLandingPageAddWidget("Recommended Open Jobs and Projects");
        __page2 = __page2.configureLandingPageAddWidget("Recommended Mentorships");
        __page2 = __page2.configureLandingPageAddWidget("Learning in progress");
        __page2 = __page2.configureLandingPageAddWidget("Learning bookmarks");
        __page2 = __page2.configureLandingPageAddWidget("Learning assignments");
        __page2 = __page2.configureLandingPageAddWidget("Learning leaderboard");
        __page2 = __page2.clickSaveAndExitButton();
        expect(__page2.announcementsWidget()).toBeVisible({ timeout: 30000 });
        expect(__page2.completeYourProfileWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.inProgressWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.recentUpdatesWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.learningFeedWidget).toBeVisible({ timeout: 30000 });
        expect(__page2.yourNextCareerMilestoneWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.newOpeningsWidget).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorsCarousel).toBeVisible({ timeout: 30000 });
        expect(__page2.assignedLearningWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.bookmarksWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.leaderboardWidgetHeader).toBeVisible({ timeout: 30000 });
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
