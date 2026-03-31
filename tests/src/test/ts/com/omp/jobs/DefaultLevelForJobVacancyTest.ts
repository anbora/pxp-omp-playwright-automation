// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class DefaultLevelForJobVacancyTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOB_TITLE: string = "Gardener_" + DefaultLevelForJobVacancyTest.RANDOM_SUFFIX;
    private jobId: string;
    private user: UserModel;
    private resultContainer: ResultContainer = new ResultContainer();

    public initialize(): void {
      this.user = this.createUser(true);
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/GardenerJobVacancy.json", JobModel);
        jobModel.setId(DefaultLevelForJobVacancyTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setInternalId(this.getPortalConfig(this.portalIndex).getGardenerRoleId());
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(DefaultLevelForJobVacancyTest.JOB_TITLE, jobModel);
    }

    public shouldBeIntermediateSetAsDefaultSkillLevel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectOpportunityMarketplace();
        __page1 = __page1.openMenuForOpportunityMarketplace("Job Vacancy");
        __page1 = __page1.openSkillsTab();
        expect(__page1.defaultSkillLevelSelect()).toHaveValue("Intermediate");
    }

    public shouldBeParsedSkillGroupedAsIntermediateLevel(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(DefaultLevelForJobVacancyTest.JOB_TITLE);
        __page2 = __page2.goToFirstJobVacancyOnAllJobsList();
        __page2 = __page2.waitForSkills();
        __page2 = __page2.getNumberOfSkillsInCategory(null, this.resultContainer);
        expect(__page2.proficiencyLevels).toHaveCount(0);
        Assert.assertTrue(Integer.parseInt(this.resultContainer.getValue()) > 0);
        __page2 = __page2.clickEditVacancyButton();
        expect(__page2.proficencyLevelsHeaders).toHaveCount(1);
        Assert.assertTrue(__page2.proficencyLevelsHeaders.allTextContents().contains("Intermediate"));
        Assert.assertTrue(__page2.skillContainer("Intermediate").all().length >= Integer.parseInt(this.resultContainer.getValue()));
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
