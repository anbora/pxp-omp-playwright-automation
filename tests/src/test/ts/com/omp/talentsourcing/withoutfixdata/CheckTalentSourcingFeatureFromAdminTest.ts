import { OpportunityMarketplaceConfigurationAssertions } from "assertions/careergrowth/jobs/OpportunityMarketplaceConfigurationAssertions";
import { TalentSourcingAssertions } from "assertions/careergrowth/talentsourcing/TalentSourcingAssertions";
import { BasePage } from "common/BasePage";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(CheckTalentSourcingFeatureFromAdminTest.SOURCING)
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertThatEnableSourcingTextFieldIsDisplayed(CheckTalentSourcingFeatureFromAdminTest.ENABLE_SOURCING)
                    .assertThatEnableSourcingSwitchIsDisplayed()
                .endAssertion()
                .goToHomePage()
                .refreshCurrentPage(BasePage)
                .goToTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatTalentSourcingText(CheckTalentSourcingFeatureFromAdminTest.TALENT_SOURCING)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
