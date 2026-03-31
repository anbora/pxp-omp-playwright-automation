// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceProjectTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public projectTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForProjectOpportunityMarketplace();
        expect(__page1.enableProject).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable project is visible");
        __page1 = __page1.clickLabelsButton();
        expect(__page1.project).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Project label is visible");
        expect(__page1.projects).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Projects label is visible");
        expect(__page1.expandYourKnowledge).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Expand your knowledge label is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
