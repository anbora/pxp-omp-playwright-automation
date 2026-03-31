// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class DefaultLevelForJobVacancySkillsLimitTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOB_TITLE: string = "Administrative Manager_" + DefaultLevelForJobVacancySkillsLimitTest.RANDOM_SUFFIX;
    private intermediate: string = "Intermediate";
    private jobId: string;
    private user: UserModel;
    private resultContainer: ResultContainer = new ResultContainer();

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/AdministrativeManagerJobVacancy.json", JobModel);
        jobModel.setId(DefaultLevelForJobVacancySkillsLimitTest.RANDOM_SUFFIX);
        jobModel.setLinkedRoles(null);
      this.jobId = this.createJob(DefaultLevelForJobVacancySkillsLimitTest.JOB_TITLE, jobModel);
      this.user = this.createUser(true);
    }

    public shouldBeIntermediateSetAsDefaultSkillLevel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectOpportunityMarketplace();
        __page1 = __page1.openMenuForOpportunityMarketplace("Job Vacancy");
        __page1 = __page1.openSkillsTab();
        expect(__page1.defaultSkillLevelSelect()).toHaveValue(this.intermediate);

    }
    public shouldBeParsedSkillGroupedAsIntermediateLevelNoMoreThan(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(DefaultLevelForJobVacancySkillsLimitTest.JOB_TITLE);
        __page2 = __page2.goToFirstJobVacancyOnAllJobsList();
        __page2 = __page2.waitForSkills();
        __page2 = __page2.clickShowMoreSkills();
        __page2 = __page2.getNumberOfSkillsInCategory(this.intermediate, this.resultContainer);
        Assert.assertTrue(Integer.parseInt(this.resultContainer.getValue()) > 0);
        assertTrue(__page2.getSkillsOfLevel(this.intermediate).length< Integer.parseInt(this.resultContainer.getValue()));
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
