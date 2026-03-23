import { MatchingAnalysisModalAssertions } from "assertions/careergrowth/MatchingAnalysisModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddCustomRoleToUserScenario } from "scenarios/profile/AddCustomRoleToUserScenario";
import { AddCustomSkillToUserScenario } from "scenarios/profile/AddCustomSkillToUserScenario";

export class CareerGoalRestrictionToJobRoleRecommendationsTest extends BaseRestTest {

    private user6: UserModel;

    private user1: UserModel;

    private user2: UserModel;

    private user3: UserModel;

    private user4: UserModel;

    private user5: UserModel;
    private recommendedRoleList: ResultContainer = new ResultContainer();
    private levelRankPlus5: string = "+5 level";
    private levelRankMinus5: string = "-5 level";
    private levelRankPlus1: string = "+1 level";
    private levelRankMinus1: string = "-1 level";
    private levelRank0: string = "0 / current level";
    private tier1: string = "Anime Watcher - Tier 1";
    private tier2: string = "Anime Watcher - Tier 2";
    private tier6: string = "Anime Watcher - Tier 6";
    private tier7: string = "Anime Watcher - Tier 7";
    private tier8: string = "Anime Watcher - Tier 8";
    private tier12: string = "Anime Watcher - Tier 12";
    private tier13: string = "Anime Watcher - Tier 13";
    private globalRole: string = "Anime Watcher - Tier 7 - global";

    private careerPreferences: string = "Career Preferences";
    private careerGoal: string = "Career Goal";
    private matching: string = "Matching";
    private notMatching: string = "Not this.matching";

    public initialize(): void {
      this.user1 = this.createUser(true);
      this.user2 = this.createUser(true);
      this.user3 = this.createUser(true);
      this.user4 = this.createUser(true);
      this.user5 = this.createUser(true);
      this.user6 = this.createUser(true);
    }

    public dataProvider(): any[][] {
        return [
                [this.user1, this.globalRole, this.levelRankPlus5, this.levelRankMinus5, this.notMatching, this.matching, this.matching, this.matching, this.matching, this.matching, this.notMatching],
                [this.user2, this.globalRole, this.levelRankPlus1, this.levelRankMinus1, this.notMatching, this.notMatching, this.matching, this.matching, this.matching, this.notMatching, this.notMatching],
                [this.user3, this.globalRole, this.levelRankPlus1, this.levelRank0, this.notMatching, this.notMatching, this.notMatching, this.matching, this.matching, this.notMatching, this.notMatching],
                [this.user4, this.globalRole, this.levelRank0, this.levelRankMinus1, this.notMatching, this.notMatching, this.matching, this.matching, this.notMatching, this.notMatching, this.notMatching],
                [this.user5, this.tier1, this.levelRankPlus1, this.levelRank0, this.matching, this.notMatching, this.notMatching, this.notMatching, this.notMatching, this.notMatching, this.notMatching],
                [this.user6, this.tier13, this.levelRank0, this.levelRankMinus1, this.notMatching, this.notMatching, this.notMatching, this.notMatching, this.notMatching, this.notMatching, this.matching],
        ];
    }

    public shouldCheckLevelRestriction(user: UserModel, roleToAssign: string, levelRanksHigher: string, levelRanksLower: string, tier1Status: string, tier2Status: string, tier6Status: string, tier7Status: string, tier8Status: string, tier12Status: string, tier13Status: string): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(user))
                .run(new AddCustomRoleToUserScenario(user, roleToAssign, "Anime Watcher family -  " + roleToAssign))
                .run(new AddCustomSkillToUserScenario("anime"))
                .run(new AddCustomSkillToUserScenario("MTV"))
                .run(new AddCustomSkillToUserScenario("japanese art"))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobRoleOpportunityMarketplace()
                .clickRecommendationsButton()
                .selectLevelRanksHigher(levelRanksHigher)
                .selectLevelRanksLower(levelRanksLower)
                .clickSaveButton()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .waitForGoodOrExcellentMatch()
                .typeSearchValue(this.tier1)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier1Status)
                .endAssertion()
                .clickCLose()
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.tier2)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier2Status)
                .endAssertion()
                .clickCLose()
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.tier6)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier6Status)
                .endAssertion()
                .clickCLose()
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.tier7)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier7Status)
                .endAssertion()
                .clickCLose()
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.tier8)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier8Status)
                .endAssertion()
                .clickCLose()
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.tier12)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier12Status)
                .endAssertion()
                .clickCLose()
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.tier13)
                .goToFirstRoleCard()
                .showMatchDetails()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, tier13Status);
    }

    public clearAfterTests(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobRoleOpportunityMarketplace()
                .clickRecommendationsButton()
                .selectLevelRanksHigher(this.levelRankPlus5)
                .selectLevelRanksLower(this.levelRankMinus5)
                .clickSaveButton();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
        this.deleteUser(this.user4);
        this.deleteUser(this.user5);
        this.deleteUser(this.user6);
    }
}
