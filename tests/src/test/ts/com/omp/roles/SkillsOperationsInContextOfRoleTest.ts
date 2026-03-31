// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Assert, assertEquals, assertTrue } from "common/testing/runtime";
import { expect } from "common/testing/playwright";

export class SkillsOperationsInContextOfRoleTest  extends BaseRestTest {
    public static readonly GARDENING: string = "gardening";
    public static readonly CUSTOMER_SERVICE: string = "customer service";
    public static readonly LANDSCAPE_ARCHITECTURE: string = "landscape architecture";
    public static readonly LANDSCAPING: string = "landscaping";
    public static readonly TREE_PLANTING: string = "tree planting";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly EXPECTED_INTERMEDIATE_SKILLS_NUMBER: number = 10;
    private TITLE: string = "SkillsInRole" + UUID.randomUUID().toString();
    private jobId: string;
    private user: UserModel;
    private expectedLearningGoals: Set<string>;
    private beginnerRoleSkills: Set<string>;
    private advancedRoleSkills: Set<string>;

    public initialize(): void {
      this.user = this.createUser();
        this.expectedLearningGoals = new Set();
        this.expectedLearningGoals.add(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE);
        this.expectedLearningGoals.add(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE);

        this.beginnerRoleSkills = new Set();
        this.beginnerRoleSkills.add(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE);

        this.advancedRoleSkills = new Set();
        this.advancedRoleSkills.add(SkillsOperationsInContextOfRoleTest.LANDSCAPING);
        this.advancedRoleSkills.add(SkillsOperationsInContextOfRoleTest.GARDENING);
        this.advancedRoleSkills.add(SkillsOperationsInContextOfRoleTest.TREE_PLANTING);
    }

    public shouldManageSkillsInRoleContext(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goDirectlyTo(RoleDetailsPage, this.getPortalConfig(this.portalIndex).getSkilledGardenerRoleId());
        __page1 = __page1.waitForSkills();
        __page1 = __page1.clickShowMoreSkills();
        assertTrue(__page1.getSkillsOfLevel("Intermediate").containsAll(this.beginnerRoleSkills));
        assertTrue(__page1.getSkillsOfLevel("Expert").containsAll(this.advancedRoleSkills));
        assertTrue(__page1.getSkillsOfLevel("Advanced").length>= SkillsOperationsInContextOfRoleTest.EXPECTED_INTERMEDIATE_SKILLS_NUMBER);
        __page1 = __page1.clickAddSkillsToPassport();
        __page1 = __page1.markSkill(SkillsOperationsInContextOfRoleTest.GARDENING);
        __page1 = __page1.clickAddSkills();
        __page1 = __page1.clickSetLearningGoals();
        __page1 = __page1.markSkill(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE);
        expect(__page1.learningGoalColumn(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE, 2).locator("p")).toHaveText(SkillsOperationsInContextOfRoleTest.INTERMEDIATE);
        expect(__page1.learningGoalColumn(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE, 3).locator("//select/option[@selected]")).toHaveText(SkillsOperationsInContextOfRoleTest.INTERMEDIATE);
        __page1 = __page1.markSkill(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE);
        expect(__page1.learningGoalColumn(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE, 2).locator("p")).toHaveText("Advanced");
        expect(__page1.learningGoalColumn(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE, 3).locator("//select/option[@selected]")).toHaveText("Advanced");
        __page1 = __page1.selectLearningTargetLevelForSkill(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE, "Expert");
        __page1 = __page1.clickAdd();
        __page1 = __page1.goToMePageProfile();
        __page1.pause(2000);
        Assert.assertEquals(__page1.getLearningGoals(), this.expectedLearningGoals);
        __page1 = __page1.goToSkillPassportTab();
        expect(__page1.addedSkill(SkillsOperationsInContextOfRoleTest.GARDENING)).toBeVisible({ timeout: 30000 });
//                    .assertSkillHasGotAdvancedLevelIcon(GARDENING);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
