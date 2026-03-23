import { OpportunityMarketplaceJobRoleAssertions } from "assertions/admin/OpportunityMarketplaceJobRoleAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class OpportunityMarketplaceJobRoleTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForJobRoleOpportunityMarketplace()
                .check(OpportunityMarketplaceJobRoleAssertions)
                    .assertThatEnableJobRolesIsVisible()
                    .assertThatEnableShowUserCarouselIsVisible()
                    .assertThatMaxAspirationalRolesIsVisible()
                .endAssertion()
                .clickLabelsButton()
                .check(OpportunityMarketplaceJobRoleAssertions)
                    .assertThatJobRoleLabelIsVisible()
                    .assertThatJobRolesLabelIsVisible()
                    .assertThatBrowseJobRolesLabelIsVisible()
                    .assertThatSelectaRoleLabelIsVisible()
                    .assertThatCareerExplorationLabelIsVisible()
                    .assertThatDiscoverOpportunitiesLabelIsVisible()
                .endAssertion()
                .clickRecommendationsButton()
                .check(OpportunityMarketplaceJobRoleAssertions)
                    .assertThatLevelRankRestrictionsHeaderIsVisible()
                    .assertThatNumberOfLevelRanksHigherIsVisible()
                    .assertThatNumberOfLevelRanksLowerIsVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
