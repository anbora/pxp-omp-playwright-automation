// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Assert, assertTrue } from "common/testing/runtime";

export class OpportunityMarketplaceAdminSmokeTest extends BaseRestTest {

    private welcome: string = "Welcome";
    private general: string = "General";
    private jobRole: string = "Job Role";
    private czech: string = "Czech (Čeština)";
    private czechWelcome: string = "Vítejte";
    private labels: string = "Labels";
    private opportunityMarketplace: string = "Talent Marketplace";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkOpportunityMarketplaceAdminPageIsAvailable(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForOpportunityMarketplace(this.general);
        Assert.assertTrue(__page1.opportunityMarketplaceEnablementSwitch.getAttribute("class").contains("bootstrap-switch-on"));
        __page1 = __page1.openOpportunityMarketplaceInnerTab(this.labels);
        __page1 = __page1.clickSetLanguage(this.welcome);
        __page1 = __page1.selectLanguage(this.czech);
        __page1 = __page1.clickAddLanguage();
        __page1 = __page1.typeTranslation(this.czech, this.czechWelcome);
        __page1 = __page1.setLanguages();
        __page1 = __page1.clickSetLanguage(this.welcome);
        __page1 = __page1.deleteTranslation(this.czech);
        __page1 = __page1.setLanguages();
        __page1 = __page1.openMenuForOpportunityMarketplace(this.jobRole);
        Assert.assertTrue(__page1.jobRoleSwitch.getAttribute("class").contains("bootstrap-switch-on"));
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
