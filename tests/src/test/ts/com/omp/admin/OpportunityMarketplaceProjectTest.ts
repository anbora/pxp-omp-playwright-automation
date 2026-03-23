import { OpportunityMarketplaceProjectAssertions } from "assertions/admin/OpportunityMarketplaceProjectAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class OpportunityMarketplaceProjectTest extends BaseRestTest {

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
                .openMenuForProjectOpportunityMarketplace()
                .check(OpportunityMarketplaceProjectAssertions)
                    .assertThatEnableProjectIsVisible()
                .endAssertion()
                .clickLabelsButton()
                .check(OpportunityMarketplaceProjectAssertions)
                    .assertThatProjectLabelIsVisible()
                    .assertThatProjectsLabelIsVisible()
                    .assertThatExpandYourKnowledgeLabelIsVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
