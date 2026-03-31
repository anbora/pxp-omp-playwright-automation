// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceGeneralTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public generalTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForGeneralOpportunityMarketplace();
        expect(__page1.enableOpportunityMarketplace).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable opportunity marketplace is visible");
        __page1 = __page1.clickLabelsButton();
        expect(__page1.welcomeLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Welcome label is visible");
        expect(__page1.welcomeToOpportunityMarketplaceLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Welcome to opportunity marketplace label is visible");
        expect(__page1.jabFamilyLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family label is visible");
        expect(__page1.suggestionsLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Suggestions label is visible");
        expect(__page1.justForYouLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Just for you label is visible");
        expect(__page1.letUsKnowLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Let us know label is visible");
        __page1 = __page1.clickStandardFieldsButton();
        expect(__page1.workplaceModelLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Workplace model label is visible");
        expect(__page1.jobTypeLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job type label is visible");
        expect(__page1.scheduleLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Schedule label is visible");
        expect(__page1.careerGoalLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Career goal label is visible");
        expect(__page1.openToOffersLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Open to offers label is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
