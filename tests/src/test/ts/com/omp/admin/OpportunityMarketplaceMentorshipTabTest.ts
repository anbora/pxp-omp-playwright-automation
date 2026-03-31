// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceMentorshipTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public mentorshipTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForMentorshipOpportunityMarketplace();
        expect(__page1.enableMentorship).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable mentorship is visible");
        __page1 = __page1.clickLabelsButton();
        expect(__page1.mentorshipLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Mentorship label is visible");
        expect(__page1.mentorshipsLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Mentorships label is visible");
        expect(__page1.beMentoredBySomeoneLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Be mentored by someone label is visible");
        expect(__page1.menteeLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Mentee label is visible");
        expect(__page1.menteesLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Mentees label is visible");
        expect(__page1.mentorLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Mentor label is visible");
        expect(__page1.mentorsLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Mentors label is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
