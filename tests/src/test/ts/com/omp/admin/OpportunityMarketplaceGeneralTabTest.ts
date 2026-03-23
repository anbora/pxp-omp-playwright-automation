import { OpportunityMarketplaceGeneralAssertions } from "assertions/admin/OpportunityMarketplaceGeneralAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class OpportunityMarketplaceGeneralTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public generalTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForGeneralOpportunityMarketplace()
                .check(OpportunityMarketplaceGeneralAssertions)
                    .assertThatEnableOpportunityMarketplaceIsVisible()
                .endAssertion()
                .clickLabelsButton()
                .check(OpportunityMarketplaceGeneralAssertions)
                    .assertWelcomeLabelIsVisible()
                    .assertThatWelcomeToOpportunityMarketplaceLabelIsVisible()
                    .assertThatJobFamilyLabelIsVisible()
                    .assertThatSuggestionsLabelIsVisible()
                    .assertThatJustForYouLabelIsVisible()
                    .assertThatLetUsKnowLabelIsVisible()
                .endAssertion()
                .clickStandardFieldsButton()
                .check(OpportunityMarketplaceGeneralAssertions)
                    .assertThatWorkplaceModelIsVisible()
                    .assertThatJobTypeLabelIsVisible()
                    .assertThatScheduleLabelIsVisible()
                    .assertThatCareerGoalLabelIsVisible()
                    .assertThatOpenToOffersLabelIsVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
