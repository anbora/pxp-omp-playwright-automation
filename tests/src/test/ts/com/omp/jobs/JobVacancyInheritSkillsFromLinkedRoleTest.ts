// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class JobVacancyInheritSkillsFromLinkedRoleTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private roleWithSkillsExternalId: string = "forlinkingwithskills";
    private taxiDriver: string = "Taxi Driver";
    private newest: string = "Newest First";
    private jobId: string;
    private user: UserModel;

    private novice: string = "Novice";
    private beginner: string = "Beginner";
    private intermediate: string = "Intermediate";
    private advanced: string = "Advanced";
    private expert: string = "Expert";

    //Skills that should be inherited from linked role:
    private kraft: string = "kraft";
    private denim: string = "denim";
    private beans: string = "beans";
    private piercing: string = "piercing";
    private feedback: string = "feedback";

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        jobModel.setId(JobVacancyInheritSkillsFromLinkedRoleTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleWithSkillsExternalId);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(this.taxiDriver, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckSkillsDetectedForJobVacancy(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.sortListBy(this.newest);
        __page1 = __page1.typeSearchValue(this.taxiDriver);
        __page1 = __page1.clickJobVacancyCardsDetails(this.taxiDriver);
        __page1 = __page1.waitForSkills();
        expect(__page1.skillContainer(this.novice).locator(String.format("//li[text()='%s']", this.kraft))).toBeVisible({ timeout: 30000 });
        expect(__page1.skillContainer(this.beginner).locator(String.format("//li[text()='%s']", this.denim))).toBeVisible({ timeout: 30000 });
        expect(__page1.skillContainer(this.intermediate).locator(String.format("//li[text()='%s']", this.beans))).toBeVisible({ timeout: 30000 });
        expect(__page1.skillContainer(this.advanced).locator(String.format("//li[text()='%s']", this.piercing))).toBeVisible({ timeout: 30000 });
        expect(__page1.skillContainer(this.expert).locator(String.format("//li[text()='%s']", this.feedback))).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickEditVacancyButton();
        Assert.assertTrue(__page1.skillContainer(this.novice).allTextContents().contains(this.kraft));
        Assert.assertTrue(__page1.skillContainer(this.beginner).allTextContents().contains(this.denim));
        Assert.assertTrue(__page1.skillContainer(this.intermediate).allTextContents().contains(this.beans));
        Assert.assertTrue(__page1.skillContainer(this.advanced).allTextContents().contains(this.piercing));
        Assert.assertTrue(__page1.skillContainer(this.expert).allTextContents().contains(this.feedback));
    }

    public afterTests(): void {

      this.deleteJob(this.jobId);

    }
}
