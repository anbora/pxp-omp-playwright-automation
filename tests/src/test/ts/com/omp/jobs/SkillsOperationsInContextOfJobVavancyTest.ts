// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { AddSkillIfMissingScenario } from "scenarios/jobs/AddSkillIfMissingScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertEquals } from "common/testing/runtime";

export class SkillsOperationsInContextOfJobVavancyTest extends BaseRestTest {
    public static readonly GARDENING: string = "gardening";
    public static readonly CUSTOMER_SERVICE: string = "customer service";
    public static readonly LANDSCAPE_ARCHITECTURE: string = "landscape architecture";
    public static readonly LANDSCAPING: string = "landscaping";
    public static readonly TREE_PLANTING: string = "tree planting";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly INTERMEDIATE: string = "Intermediate";
    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOB_TITLE: string = "Gardener_" + SkillsOperationsInContextOfJobVavancyTest.RANDOM_SUFFIX;
    public static readonly PLANTING: string = "planting";
    private jobId: string;
    private user: UserModel;
    private resultContainer: ResultContainer = new ResultContainer();
    private expectedLearningGoals: Set<string> = new Set();
    private beginnerRoleSkills: Set<string> = new Set();
    private advancedRoleSkills: Set<string> = new Set();

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/GardenerJobVacancy.json", JobModel);
        jobModel.setId(SkillsOperationsInContextOfJobVavancyTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setInternalId(this.getPortalConfig(this.portalIndex).getGardenerRoleId());
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE, jobModel);
      this.user = this.createUser();

        this.expectedLearningGoals.add("planting");
        this.expectedLearningGoals.add("gardening");

        this.beginnerRoleSkills.add("planting");
        this.advancedRoleSkills.add("gardening");
    }
    public shouldManageSkillsInJobVacancyContext(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.waitForSkills();
        __page1 = __page1.getNumberOfSkillsInCategory(null, this.resultContainer);
        __page1 = __page1.run(new AddSkillIfMissingScenario(SkillsOperationsInContextOfJobVavancyTest.PLANTING, this.resultContainer));
        __page1 = __page1.run(new AddSkillIfMissingScenario("horticulture", this.resultContainer));
        __page1 = __page1.run(new AddSkillIfMissingScenario("gardening", this.resultContainer));
        __page1 = __page1.waitForParticularSkill("horticulture");
        __page1 = __page1.clickAddSkillsToPassport();
        __page1 = __page1.markSkill("gardening");
        __page1 = __page1.markSkill("horticulture");
        __page1 = __page1.selectLevelForSkill("horticulture", SkillsOperationsInContextOfJobVavancyTest.ADVANCED);
        __page1 = __page1.markSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING);
        __page1 = __page1.selectLevelForSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.BEGINNER);
        __page1 = __page1.clickAddSkills();
        __page1 = __page1.clickAddSkillsToPassport();
        expect(__page1.passportSkillsColumn("gardening", 1).locator("//input[@type='checkbox']")).toBeChecked();
        expect(__page1.passportSkillsColumn("horticulture", 1).locator("//input[@type='checkbox']")).toBeChecked();
        expect(__page1.passportSkillsColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 1).locator("//input[@type='checkbox']")).toBeChecked();
        expect(__page1.passportSkillsColumn("gardening", 3).locator("//select/option[@selected]")).toHaveText("Intermediate");
        expect(__page1.passportSkillsColumn("gardening", 2).locator("//p")).toHaveText("Intermediate");
        expect(__page1.passportSkillsColumn("horticulture", 3).locator("//select/option[@selected]")).toHaveText("Advanced");
        expect(__page1.passportSkillsColumn("horticulture", 2).locator("//p")).toHaveText("Intermediate");
        expect(__page1.passportSkillsColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 3).locator("//select/option[@selected]")).toHaveText(SkillsOperationsInContextOfJobVavancyTest.BEGINNER);
        expect(__page1.passportSkillsColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 2).locator("//p")).toHaveText("Intermediate");
        __page1 = __page1.clickClose();
        __page1 = __page1.clickSetLearningGoals();
        __page1 = __page1.markSkill("gardening");
        expect(__page1.learningGoalColumn("gardening", 2).locator("p")).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        expect(__page1.learningGoalColumn("gardening", 3).locator("//select/option[@selected]")).toHaveText(SkillsOperationsInContextOfJobVavancyTest.ADVANCED);
        __page1 = __page1.markSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING);
        expect(__page1.learningGoalColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 2).locator("p")).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        expect(__page1.learningGoalColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 3).locator("//select/option[@selected]")).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        __page1 = __page1.selectLearningTargetLevelForSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.BEGINNER);
        __page1 = __page1.clickAdd();
        __page1 = __page1.goToMePageProfile();
        __page1.pause(2000);
        Assert.assertEquals(__page1.getLearningGoals(), this.expectedLearningGoals);
        __page1 = __page1.goToSkillPassportTab();
        expect(__page1.addedSkill(SkillsOperationsInContextOfJobVavancyTest.GARDENING)).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill("horticulture")).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE);
        __page1 = __page1.clickMoreSkillsButton(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE);
        expect(__page1.matchingSkillColumn(SkillsOperationsInContextOfJobVavancyTest.GARDENING, 2)).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        expect(__page1.matchingSkillColumn(SkillsOperationsInContextOfJobVavancyTest.GARDENING, 3)).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        expect(__page1.matchingSkillColumn(SkillsOperationsInContextOfJobVavancyTest.GARDENING, 4)).toHaveText("On target");
        expect(__page1.matchingSkillColumn("horticulture", 2)).toHaveText(SkillsOperationsInContextOfJobVavancyTest.ADVANCED);
        expect(__page1.matchingSkillColumn("horticulture", 3)).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        expect(__page1.matchingSkillColumn("horticulture", 4)).toHaveText("On target");
        expect(__page1.matchingSkillColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 2)).toHaveText(SkillsOperationsInContextOfJobVavancyTest.BEGINNER);
        expect(__page1.matchingSkillColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 3)).toHaveText(SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE);
        expect(__page1.matchingSkillColumn(SkillsOperationsInContextOfJobVavancyTest.PLANTING, 4)).toHaveText("Off target");
    }
    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }

}
