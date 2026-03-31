// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class RecommendedRolesCardsOnCarouselTest extends BaseRestTest {

    private matchName: ResultContainer = new ResultContainer();
    private currentUserRole: string = "Football player trainee";
    private footballPlayerJunior: string = "Football player junior";
    private entryLevel: string = "Entry Level";
    private unusualJobFamily: string = "Unusual job family";
    private football: string = "football";
    private skillsIcon: string = "icon icon-star-half";
    private footballClub: string = "Football club";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public checkDataShownOnRecommendedRolesCards(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.footballPlayerJunior,this.footballClub,this.football,this.october,this.year_2017,this.june,this.year_2022 ));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForJobRoleRecommendationByTitle(this.footballPlayerJunior);
        __page1 = __page1.getFirstOpportunityMatchValue(this.matchName);
        expect(__page1.firstCard().first()).not.toContainText(this.currentUserRole, { timeout: 30000 });
        expect(__page1.firstCard()).toContainText(this.footballPlayerJunior, { timeout: 30000 });
        expect(__page1.recommendedRoleLevelIcon(this.footballPlayerJunior)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleLevelByTitle(this.footballPlayerJunior).first()).toContainText(this.entryLevel, { timeout: 30000 });
        expect(__page1.recommendedRoleJobFamilyIcon(this.footballPlayerJunior)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleJobFamilyByTitle(this.footballPlayerJunior).first()).toContainText(this.unusualJobFamily, { timeout: 30000 });
        __page1 = __page1.goToRolesPageViaTab();
        expect(__page1.firstCardName().first()).not.toContainText(this.currentUserRole, { timeout: 30000 });
        __page1.pause(1000);
        expect(__page1.firstCardName().first()).toContainText(this.footballPlayerJunior, { timeout: 30000 });
        expect(__page1.recommendedRoleLevelIcon(this.footballPlayerJunior)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleLevelByTitle(this.footballPlayerJunior).first()).toContainText(this.entryLevel, { timeout: 30000 });
        expect(__page1.recommendedRoleJobFamilyIcon(this.footballPlayerJunior)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleJobFamilyByTitle(this.footballPlayerJunior).first()).toContainText(this.unusualJobFamily, { timeout: 30000 });
        expect(__page1.recommendedRoleSkillIcon(this.footballPlayerJunior)).toHaveClass(this.skillsIcon);
        expect(__page1.skillOnRoleCard(this.footballPlayerJunior, this.football)).toBeVisible({ timeout: 30000 });
        expect(__page1.moreSkillsLinkOnRecommendedRoleCard(this.footballPlayerJunior)).toBeVisible({ timeout: 30000 });
        expect(__page1.moreSkillsLinkOnRecommendedRoleCard(this.footballPlayerJunior)).toBeVisible({ timeout: 30000 });
        expect(__page1.recommendedRoleMatchLabel(this.footballPlayerJunior)).toContainText(this.matchName.getValue(), { timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
