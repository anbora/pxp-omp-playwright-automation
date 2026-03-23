import { OpportunityMarketplaceSourcingAssertions } from "assertions/admin/OpportunityMarketplaceSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class OpportunityMarketplaceSourcingTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public projectTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForSourcingOpportunityMarketplace()
                .check(OpportunityMarketplaceSourcingAssertions)
                    .assertThatEnableSourcingIsVisible()
                .endAssertion()
                .clickLabelsButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
