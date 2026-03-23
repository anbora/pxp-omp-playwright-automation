import { OpportunityMarketplaceConfigurationAssertions } from "assertions/careergrowth/jobs/OpportunityMarketplaceConfigurationAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertThatOpportunityMarketplaceIsEnabled()
                .endAssertion()
                .openOpportunityMarketplaceInnerTab(this.labels)
                .clickSetLanguage(this.welcome)
                .selectLanguage(this.czech)
                .clickAddLanguage()
                .typeTranslation(this.czech, this.czechWelcome)
                .setLanguages()
                .clickSetLanguage(this.welcome)
                .deleteTranslation(this.czech)
                .setLanguages()
                .openMenuForOpportunityMarketplace(this.jobRole)
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertThatJobRoleIsEnabled();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
