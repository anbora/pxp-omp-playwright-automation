import { OpportunityMarketplaceMentorshipAssertions } from "assertions/admin/OpportunityMarketplaceMentorshipAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class OpportunityMarketplaceMentorshipTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public mentorshipTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForMentorshipOpportunityMarketplace()
                .check(OpportunityMarketplaceMentorshipAssertions)
                    .assertThatEnableMentorshipIsVisible()
                .endAssertion()
                .clickLabelsButton()
                .check(OpportunityMarketplaceMentorshipAssertions)
                    .assertThatMentorshipLabelIsVisible()
                    .assertThatMentorshipsLabelIsVisible()
                    .assertThatBeMentoredBySomeoneLabelIsVisible()
                    .assertThatMenteeLabelIsVisible()
                    .assertThatMenteesLabelIsVisible()
                    .assertThatMentorLabelIsVisible()
                    .assertThatMentorsLabelIsVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
