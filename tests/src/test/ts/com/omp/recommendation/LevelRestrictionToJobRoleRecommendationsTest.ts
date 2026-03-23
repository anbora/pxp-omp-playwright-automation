import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
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

export class LevelRestrictionToJobRoleRecommendationsTest extends BaseRestTest {

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
    private expectedRoleListForRanksPlus5Minus5: Array<string> = Arrays.asList(this.tier2, this.tier6, this.tier7, this.tier8, this.tier12);
    private notExpectedRoleListForRanksPlus5Minus5: Array<string> = Arrays.asList(this.tier1, this.tier13);
    private expectedRoleListForRanksPlus1Minus1: Array<string> = Arrays.asList(this.tier6, this.tier7, this.tier8);
    private notExpectedRoleListForRanksPlus1Minus1: Array<string> = Arrays.asList(this.tier1, this.tier2, this.tier12, this.tier13);
    private expectedRoleListForRanksPlus1Minus0: Array<string> = Arrays.asList(this.tier7, this.tier8);
    private notExpectedRoleListForRanksPlus1Minus0: Array<string> = Arrays.asList(this.tier1, this.tier2, this.tier6, this.tier12, this.tier13);
    private expectedRoleListForRanksPlus0Minus1: Array<string> = Arrays.asList(this.tier6, this.tier7);
    private notExpectedRoleListForRanksPlus0Minus1: Array<string> = Arrays.asList(this.tier1, this.tier2, this.tier8, this.tier12, this.tier13);
    private expectedLowestRoleRank: Array<string> = Arrays.asList(this.tier1);
    private notExpectedLowestRoleRank: Array<string> = Arrays.asList(this.tier2, this.tier6, this.tier7, this.tier8, this.tier12, this.tier13);
    private expectedHighestRoleRank: Array<string> = Arrays.asList(this.tier13);
    private notExpectedHighestRoleRank: Array<string> = Arrays.asList(this.tier1, this.tier2, this.tier6, this.tier7, this.tier8, this.tier12);

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
                [this.user1, this.globalRole, this.levelRankPlus5, this.levelRankMinus5, this.expectedRoleListForRanksPlus5Minus5, this.notExpectedRoleListForRanksPlus5Minus5],
                [this.user2, this.globalRole, this.levelRankPlus1, this.levelRankMinus1, this.expectedRoleListForRanksPlus1Minus1, this.notExpectedRoleListForRanksPlus1Minus1],
                [this.user3, this.globalRole, this.levelRankPlus1, this.levelRank0, this.expectedRoleListForRanksPlus1Minus0, this.notExpectedRoleListForRanksPlus1Minus0],
                [this.user4, this.globalRole, this.levelRank0, this.levelRankMinus1, this.expectedRoleListForRanksPlus0Minus1, this.notExpectedRoleListForRanksPlus0Minus1],
                [this.user5, this.tier1, this.levelRankPlus1, this.levelRank0, this.expectedLowestRoleRank, this.notExpectedLowestRoleRank],
                [this.user6, this.tier13, this.levelRank0, this.levelRankMinus1, this.expectedHighestRoleRank, this.notExpectedHighestRoleRank],
        ];
    }

    public shouldCheckLevelRestriction(user: UserModel, roleToAssign: string, levelRanksHigher: string, levelRanksLower: string, expectedRoleList: Array<string>, notExpectedRoleList: Array<string>): void {
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
                .getAllRecommendedJobRolesWhichContainsTitle(this.recommendedRoleList, "Anime Watcher")
                .check(RoleListAssertions)
                    .assertThatJobRoleListContainsValues(this.recommendedRoleList.getListValue(), expectedRoleList)
                    .assertThatJobRoleListContainsNotValues(this.recommendedRoleList.getListValue(), notExpectedRoleList)
                .endAssertion();
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
