// @ts-nocheck

import { BasePage } from "common/BasePage";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class CheckTalentSourcingFeatureFromAdminTest extends BaseRestTest {

    private static readonly ENABLE_SOURCING: string = "Enable Sourcing";
    private static readonly SOURCING: string = "Sourcing";
    private static readonly TALENT_SOURCING: string = "Talent Sourcing";
    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTalentSourcingFeatureIsDisplayedInAdminAndMoreMenu(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForOpportunityMarketplace(CheckTalentSourcingFeatureFromAdminTest.SOURCING);
        expect(__page1.enableSourcing).toContainText(CheckTalentSourcingFeatureFromAdminTest.ENABLE_SOURCING, { timeout: 30000 });
        Assert.assertTrue(__page1.enableSourcingSwitch.first().getAttribute("class").contains("bootstrap-switch-handle-on"));
        __page1 = __page1.goToHomePage();
        __page1 = __page1.refreshCurrentPage(BasePage);
        __page1 = __page1.goToTalentSourcing();
        expect(__page1.talentSourcingText).toContainText(CheckTalentSourcingFeatureFromAdminTest.TALENT_SOURCING, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
