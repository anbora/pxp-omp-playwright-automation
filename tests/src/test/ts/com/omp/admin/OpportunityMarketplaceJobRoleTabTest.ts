// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceJobRoleTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForJobRoleOpportunityMarketplace();
        expect(__page1.enableJobRoles).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable job roles is visible");
        expect(__page1.enableShowUserCarousel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable show user carousel is visible");
        expect(__page1.maxAspirationalRoles).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Max aspirational roles is visible");
        __page1 = __page1.clickLabelsButton();
        expect(__page1.jobRoleLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role label is visible");
        expect(__page1.jobRolesLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job roles label is visible");
        expect(__page1.browseJobRolesLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Browse job roles label is visible");
        expect(__page1.SelectRoleLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Select a role label is visible");
        expect(__page1.careerExplorationLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Career exploration label is visible");
        expect(__page1.discoverOpportunitiesLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Discover opportunities label is visible");
        __page1 = __page1.clickRecommendationsButton();
        expect(__page1.levelRankRestrictionsHeader).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Level ranks restriction header is visible");
        expect(__page1.numberOfLevelRanksHigher).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Number of level ranks higher is visible");
        expect(__page1.numberOfLevelRanksLower).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Number of level ranks lower is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
