import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class JobVacancyDetailsTest extends BaseRestTest {

    private static readonly DESCRIPTION: string = "Description";
    private static readonly JOB_VACANCY: string = "Job Vacancy";
    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private readonly REFERENCE: string = "REF:0000001";
    private readonly COMPANY: string = "CompanyName";
    private readonly JOB_TYPE: string = "Internship, Full time";
    private readonly SALARY: string = "1000-1500 USD / WEEK";
    private readonly professional: string = "Associate";
    private readonly REFERENCE_NAME: string = "Reference number";
    private readonly COMPANY_NAME: string = "Company";
    private readonly JOB_TYPE_NAME: string = "Job Type & Schedule";
    private readonly SALARY_NAME: string = "Salary";
    private readonly LEVEL_NAME: string = "Level";
    private jobId: string;
    private user: UserModel;

    public createJobViaRest(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.TITLE);
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(this.TITLE);
      this.jobId = this.createJob(this.TITLE, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckJobDetails(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.TITLE)
                    .assertThatDescriptionEqualTo(this.TITLE)
                    .assertThatDescriptionHasPlainTextFormatting()
                    //.assertThatMatchingDetailFieldIsEqualTo(LOCATION_NAME, LOCATION)
                    .assertThatMatchingDetailFieldIsEqualTo(this.COMPANY_NAME, this.COMPANY)
                    .assertThatMatchingDetailFieldIsEqualTo(this.REFERENCE_NAME, this.REFERENCE)
                    .assertThatMatchingDetailFieldIsEqualTo(this.JOB_TYPE_NAME, this.JOB_TYPE)
                    .assertThatMatchingDetailFieldIsEqualTo(this.SALARY_NAME, this.SALARY)
                    .assertThatMatchingDetailFieldIsEqualTo(this.LEVEL_NAME, this.professional);
    }

    public shouldCheckVacancyAndDescriptionFieldOnTopDetailsView(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .waitForSuggestions()
                .goToFirstSuggestedJobVacancyDetailsPage()
                .check(JobVacancyDetailsAssertions)
                    .assertThatJobVacancyFieldContainsHeader(JobVacancyDetailsTest.JOB_VACANCY)
                    .assertThatJobDescriptionFieldContainsHeader(JobVacancyDetailsTest.DESCRIPTION);
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
