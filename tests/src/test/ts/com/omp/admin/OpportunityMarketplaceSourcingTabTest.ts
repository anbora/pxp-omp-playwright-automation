// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceSourcingTabTest extends BaseRestTest {

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
        __page1 = __page1.openMenuForSourcingOpportunityMarketplace();
        expect(__page1.enableSourcing).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable sourcing is visible");
        __page1 = __page1.clickLabelsButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
