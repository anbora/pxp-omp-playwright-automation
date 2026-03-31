// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class JobRoleLevelDisplayVerificationTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user1: UserModel;
    private user2: UserModel;
    private user3: UserModel;

    public initialize(): void {
      this.user1 = this.createUser(true);
        this.wait(10000);
      this.user2 = this.createUser(true);
        this.wait(10000);
      this.user3 = this.createUser(true);
    }

    public jobRoleLevelEngagementOff(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .clickInLevelFieldEditIcon()
                .clickDeleteJobRoleEngagement()
                .clickSaveButtonEditLevelModal()
                .clickSaveButtonStandardFieldsTab();
    }

    public jobRoleLevelShouldNotBeDisplayed(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user2));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user2.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding, this.october, this.year_2017, this.june, this.year_2022));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.markFirstSuggestedRoleAsAspirational();
        __page1 = __page1.goToLandingPage();
        expect(__page1.yourNextCareerMilestoneArticleLevel.last()).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.openNextCareerMilestoneRole();
        expect(__page1.roleDetailsLevel.last()).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.gotoStandardFieldPage();
        __page1 = __page1.clickInLevelFieldEditIcon();
        __page1 = __page1.clickAddJobRoleEngagement();
        __page1 = __page1.clickSaveButtonEditLevelModal();
        __page1 = __page1.clickSaveButtonStandardFieldsTab();
    }

    public jobRoleLevelShouldBeDisplayed(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user3));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user3.name));
        __page2 = __page2.run(new AddSkillToNewUserScenario_SkillLevel());
        __page2 = __page2.run(new AddBasicCareerPreferencesForUser());
        __page2 = __page2.clickUpdateCareerProfileLink();
        __page2 = __page2.run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding, this.october, this.year_2017, this.june, this.year_2022));
        __page2 = __page2.clickSaveAndContinueButton();
        __page2 = __page2.clickXButton();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.markFirstSuggestedRoleAsAspirational();
        __page2 = __page2.goToLandingPage();
        expect(__page2.yourNextCareerMilestoneArticleLevel.last()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.openNextCareerMilestoneRole();
        expect(__page2.roleDetailsLevel.last()).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
