// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataSourceColumnTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private hrdata: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkSourcingTableInOrgConfig(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForSourcingOpportunityMarketplace();
        expect(__page1.enableSourcing).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable sourcing is visible");
        expect(__page1.sourcingON).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Sourcing is ON");
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrdata);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.clickOrganizationConfiguration();
        expect(__page1.sourcingTable).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Sourcing table field is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
