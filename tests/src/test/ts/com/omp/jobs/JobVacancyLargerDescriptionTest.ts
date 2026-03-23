import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class JobVacancyLargerDescriptionTest extends BaseRestTest {

    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private jobId: string;
    private user: UserModel;
    private DESCRIPTION: string = "As a Selenium Automation Tester, you will be responsible for designing and developing test automation frameworks and test cases to test web applications using Selenium. In addition, you will also be responsible for troubleshooting and debugging the existing automation code to improve its efficiency. Furthermore, you will also be required to work closely with the development team to ensure that all the features are properly tested before release. To be successful in this role, you should have priority";

    public createJobViaRest(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.DESCRIPTION);
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(this.TITLE);
      this.jobId = this.createJob(this.TITLE, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckJobDetailsWithLargerDescription(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.TITLE)
                    .assertThatDescriptionEqualTo(this.DESCRIPTION)
                .endAssertion();
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
