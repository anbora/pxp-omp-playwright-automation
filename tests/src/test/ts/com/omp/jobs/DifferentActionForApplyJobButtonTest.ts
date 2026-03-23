import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { ShowInterestModalAssertions } from "assertions/careergrowth/jobs/ShowInterestModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class DifferentActionForApplyJobButtonTest extends BaseRestTest {

    private static readonly FIRST_TITLE: string = UUID.randomUUID().toString();
    private static readonly SECOND_TITLE: string = UUID.randomUUID().toString();
    private APPLY_URL: string;
    private JOB_DETAILS_URL: string;
    private static readonly APPLY_BUTTON_TEXT: string = "Apply";
    private static readonly VIEW_ON_CAREER_SITE_BUTTON_TEXT: string = "View on career site";
    private static readonly MESSAGE_AFTER_CLICKING_ON_APPLY_BUTTON: string = "Thanks for your interest in this Job Vacancy!";
    private jobIdFirst: string;
    private jobIdSecond: string;
    private user: UserModel;

    public createJobViaRest(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobModel.setId(DifferentActionForApplyJobButtonTest.FIRST_TITLE);
      this.APPLY_URL = jobDescriptions.get(0).getApplyURL();
      this.JOB_DETAILS_URL = jobDescriptions.get(0).getJobDetailsURL();
      this.jobIdFirst = this.createJob(DifferentActionForApplyJobButtonTest.FIRST_TITLE);
        jobDescriptions.get(0).setApplyURL("");
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(DifferentActionForApplyJobButtonTest.SECOND_TITLE);
      this.jobIdSecond = this.createJob(DifferentActionForApplyJobButtonTest.SECOND_TITLE, jobModel);

      this.user = this.createUser();
    }

    public shouldSearchCreatedJob(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(DifferentActionForApplyJobButtonTest.FIRST_TITLE)
                .clickJobVacancyCardsDetails(DifferentActionForApplyJobButtonTest.FIRST_TITLE)
                .check(JobVacancyDetailsAssertions)
                    .assertThatApplyButtonTextIsCorrect(DifferentActionForApplyJobButtonTest.APPLY_BUTTON_TEXT)
                    .assertThatUrlAttachedToButtonEqualTo(this.APPLY_URL)
                .endAssertion()
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(DifferentActionForApplyJobButtonTest.SECOND_TITLE)
                .clickJobVacancyCardsDetails(DifferentActionForApplyJobButtonTest.SECOND_TITLE)
                .check(JobVacancyDetailsAssertions)
                    .assertThatApplyButtonTextIsCorrect(DifferentActionForApplyJobButtonTest.VIEW_ON_CAREER_SITE_BUTTON_TEXT)
                    .assertThatUrlAttachedToButtonEqualTo(this.JOB_DETAILS_URL);
    }

    public shouldValidateMessageWhileClickingOnApplyButton(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(DifferentActionForApplyJobButtonTest.FIRST_TITLE)
                .clickJobVacancyCardsDetails(DifferentActionForApplyJobButtonTest.FIRST_TITLE)
                .clickApplyButton()
                .check(ShowInterestModalAssertions)
                        .assertThatValidateMessageWhenClickOnApplyButton(DifferentActionForApplyJobButtonTest.MESSAGE_AFTER_CLICKING_ON_APPLY_BUTTON)
                .endAssertion()
                .clickCloseButton();
    }

    public deleteJobsViaRest(): void {
        this.deleteJob(this.jobIdFirst);
        this.deleteJob(this.jobIdSecond);

        this.deleteUser(this.user);
    }
}
