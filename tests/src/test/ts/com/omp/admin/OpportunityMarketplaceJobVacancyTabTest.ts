import { OpportunityMarketplaceJobVacancyAssertions } from "assertions/admin/OpportunityMarketplaceJobVacancyAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class OpportunityMarketplaceJobVacancyTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobVacancyTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForJobVacancyOpportunityMarketplace()
                .check(OpportunityMarketplaceJobVacancyAssertions)
                    .assertThatEnableJobVacancyIsVisible()
                .endAssertion()
                .clickLabelsButton()
                .check(OpportunityMarketplaceJobVacancyAssertions)
                    .assertThatJobVacancyLabelIsVisible()
                    .assertThatJobVacanciesLabelIsVisible()
                    .assertThatBrowseCurrentJobVacanciesLabelIsVisible()
                .endAssertion()
                .clickSkillsButton()
                .check(OpportunityMarketplaceJobVacancyAssertions)
                    .assertThatAutomaticallyAssignDetectedSkillsIsVisible()
                    .assertThatOverrideDetectedSkillsIsVisible()
                    .assertThatDetectedSkillsLevelHeaderIsVisible()
                    .assertThatDetectedSkillsLevelTextIsVisible()
                    .assertThatMaximumNumberOfSkillsAssignedLabelIsVisible()
                .endAssertion()
                .clickRecommendationsButton()
                .check(OpportunityMarketplaceJobVacancyAssertions)
                    .assertThatLevelRankRestrictionsHeaderIsVisible()
                    .assertThatNumberOfLevelRanksHigherThanIsVisible()
                    .assertThatNumberOfLevelRanksLowerThanIsVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
