import { MatchLevelRecommendationConfigAssertions } from "assertions/admin/MatchLevelRecommendationConfigAssertions";
import { OpportunityMarketplaceGeneralAssertions } from "assertions/admin/OpportunityMarketplaceGeneralAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class MatchRecommendationConfigurationTabTest extends BaseRestTest {

    private talentMarketplace: string = "Talent Marketplace";
    private lowMatch: string = "Low match";
    private fairMatch: string = "Fair match";
    private goodMatch: string = "Good match";
    private excellentMatch: string = "Excellent match";
    private faces: string = "faces";
    private bars: string = "bars";
    private networkBars: string = "network-this.bars";
    private circle: string = "circle";
    private diamond: string = "diamond";
    private pie: string = "pie";
    private english: string = "English";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckMatchRecommendationConfigurationTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.talentMarketplace)
                .openMenuForGeneralOpportunityMarketplace()
                .clickMatchRecommendationConfigurationButton()
                .clickActionButton(this.lowMatch)
                .check(MatchLevelRecommendationConfigAssertions)
                    .assertThatMatchLevelLabel(this.english)
                    .assertThatDefaultLabelIsEqualTo(this.lowMatch)
                .endAssertion()
                .clickCancelButton()
                .check(OpportunityMarketplaceGeneralAssertions)
                    .assertThatActionForMatchLevelIsAvailable(this.lowMatch)
                    .assertThatActionForMatchLevelIsAvailable(this.fairMatch)
                    .assertThatActionForMatchLevelIsAvailable(this.goodMatch)
                    .assertThatActionForMatchLevelIsAvailable(this.excellentMatch)
                    .assertThatIconSetRadiobuttonIsPresent(this.faces)
                    .assertThatIconSetRadiobuttonIsPresent(this.bars)
                    .assertThatIconSetRadiobuttonIsPresent(this.networkBars)
                    .assertThatIconSetRadiobuttonIsPresent(this.circle)
                    .assertThatIconSetRadiobuttonIsPresent(this.diamond)
                    .assertThatIconSetRadiobuttonIsPresent(this.pie)
                    .assertThatIconSetIsSelected(this.faces);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
