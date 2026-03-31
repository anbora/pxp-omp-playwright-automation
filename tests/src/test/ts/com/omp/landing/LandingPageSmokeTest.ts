// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class LandingPageSmokeTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }
    public LandingPageSmokeTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.refreshUntilNewOpeningsWidgetTitleLoads();
        expect(__page1.announcementsWidget()).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.inProgressWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.recentUpdatesWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.learningFeedWidget).toBeVisible({ timeout: 30000 });
        expect(__page1.yourNextCareerMilestoneWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.newOpeningsWidget).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorsCarousel).toBeVisible({ timeout: 30000 });
        expect(__page1.assignedLearningWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.bookmarksWidgetHeader).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
