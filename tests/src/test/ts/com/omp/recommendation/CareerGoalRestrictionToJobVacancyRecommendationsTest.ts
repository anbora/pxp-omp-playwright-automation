// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LandingPage } from "pages/landing/LandingPage";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddCustomRoleToUserScenario } from "scenarios/profile/AddCustomRoleToUserScenario";
import { AddCustomSkillToUserScenario } from "scenarios/profile/AddCustomSkillToUserScenario";
import { expect } from "common/testing/playwright";

export class CareerGoalRestrictionToJobVacancyRecommendationsTest extends BaseRestTest {

    private user6: UserModel;

    private user1: UserModel;

    private user2: UserModel;

    private user3: UserModel;

    private user4: UserModel;

    private user5: UserModel;
    private recommendedJobList: ResultContainer = new ResultContainer();
    private careerGoal: string = "Career Goal";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Internship";
    private hybrid: string = "Hybrid";
    private fullTime: string = "Full time";
    private management: string = "Management";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private animeWatcher: string = "Anime Watcher";

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

    public shouldCheckThat(user: UserModel, roleToAssign: string, levelRanksHigher: string, levelRanksLower: string, tier1Status: string, tier2Status: string, tier6Status: string, tier7Status: string, tier8Status: string, tier12Status: string, tier13Status: string): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(user));
        __page1 = __page1.run(new AddCustomRoleToUserScenario(user, this.globalRole, "Anime Watcher family -  " + roleToAssign));
        __page1 = __page1.run(new AddCustomSkillToUserScenario("anime"));
        __page1 = __page1.run(new AddCustomSkillToUserScenario("MTV"));
        __page1 = __page1.run(new AddCustomSkillToUserScenario("japanese art"));
        __page1 = __page1.goDirectlyTo(WelcomePage_New);
        __page1 = __page1.refreshPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.animeWatcher, "CompanyName", this.animeWatcher, this.october, this.year_2017, this.june, this.year_2022));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToEditProfileFromUserDropDown(user.name);
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.goToCareerPreferencesTab();
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerGoal, this.backward);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.workplaceModel, this.hybrid);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.schedule, this.fullTime);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerTrack, this.management);
        __page1 = __page1.addCareerPreference(this.jobType, this.internship);
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectOpportunityMarketplace();
        __page1 = __page1.openMenuForJobVacancyOpportunityMarketplace();
        __page1 = __page1.clickRecommendationsButton();
        __page1 = __page1.selectLevelRanksHigher(levelRanksHigher);
        __page1 = __page1.selectLevelRanksLower(levelRanksLower);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.waitForGoodOrExcellentMatchForSuggestedJobVacancy();
        __page1 = __page1.waitForRecommendationsCounterEqualOrGreaterThan(this.recommendedJobList.getListValue().length);
        __page1 = __page1.typeSearchValue(this.tier1);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier1Status, { timeout: 30000 });
        __page1 = __page1.clickCLose();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.tier2);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier2Status, { timeout: 30000 });
        __page1 = __page1.clickCLose();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.tier6);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier6Status, { timeout: 30000 });
        __page1 = __page1.clickCLose();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.tier7);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier7Status, { timeout: 30000 });
        __page1 = __page1.clickCLose();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.tier8);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier8Status, { timeout: 30000 });
        __page1 = __page1.clickCLose();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.tier12);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier12Status, { timeout: 30000 });
        __page1 = __page1.clickCLose();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.tier13);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(tier13Status, { timeout: 30000 });
    }

    public clearAfterTests(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobVacancyOpportunityMarketplace()
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
