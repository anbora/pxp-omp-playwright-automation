import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { OpportunityMarketplaceConfigurationAssertions } from "assertions/careergrowth/jobs/OpportunityMarketplaceConfigurationAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForOpportunityMarketplace("Job Vacancy")
                .openSkillsTab()
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertDefaultLevelForJobVacancySkillsDetection(this.intermediate)
                .endAssertion();

    }
    public shouldBeParsedSkillGroupedAsIntermediateLevelNoMoreThan(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(DefaultLevelForJobVacancySkillsLimitTest.JOB_TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForSkills()
                .clickShowMoreSkills()
                .getNumberOfSkillsInCategory(this.intermediate, this.resultContainer)
                .check(JobVacancyDetailsAssertions)
                    .assertPresenceOfSkills(this.resultContainer)
                    .assertSkillsOfIndicatedLevelHaveAtMost(this.intermediate, Integer.parseInt(this.resultContainer.getValue()))
                .endAssertion()
        ;
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
