import { HrDataConfigurationAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationAssertion";
import { OpportunityMarketplaceSourcingAssertions } from "assertions/admin/OpportunityMarketplaceSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataSourceColumnTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private hrdata: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkSourcingTableInOrgConfig(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForSourcingOpportunityMarketplace()
                .check(OpportunityMarketplaceSourcingAssertions)
                .assertThatEnableSourcingIsVisible()
                        .assertThatSourcingIsOn().endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.hrdata)
                .openMenuForHrConfiguration()
                .clickOrganizationConfiguration()
                .check(HrDataConfigurationAssertion)
                        .assertThatSourcingColumnIsDisplayed().endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
