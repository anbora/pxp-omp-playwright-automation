import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
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

export class JobVacancyClosedTest extends BaseRestTest {

    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private jobId: string;
    private user: UserModel;

    public createJobViaRest(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/JobVacancyClosed.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.TITLE);
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(this.TITLE);
      this.jobId = this.createJob(this.TITLE, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckClosedJobDetails(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .check( VacanciesListAssertions)
                    .assertThatZeroResultsForClosedVacancies()
                .endAssertion();
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
