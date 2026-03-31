// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class LandingPagePermissionsTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }
    public LandingPagePermissionsTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.refreshUntilNewOpeningsWidgetTitleLoads();
        expect(__page1.welcomeStringAndSubTextInWelcomeWidget).toBeVisible({ timeout: 30000 });
        expect(__page1.announcementsWidget()).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.inProgressWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.recentUpdatesWidgetHeader).not.toBeVisible({ timeout: 5000 });
        expect(__page1.learningFeedWidget).not.toBeVisible({ timeout: 5000 });
        expect(__page1.yourNextCareerMilestoneWidgetHeader).not.toBeVisible({ timeout: 5000 });
        expect(__page1.newOpeningsWidget).not.toBeVisible({ timeout: 5000 });
        expect(__page1.mentorsCarousel).not.toBeVisible({ timeout: 5000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
