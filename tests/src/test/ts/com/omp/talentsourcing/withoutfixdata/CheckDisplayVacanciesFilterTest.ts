import { TalentSourcingAssertions } from "assertions/careergrowth/talentsourcing/TalentSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { Recruiters } from "models/job/Recruiters";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class CheckDisplayVacanciesFilterTest extends BaseRestTest {
    private static readonly MY_PUBLISHED_VACANCIES: string = "My Published Vacancies";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";
    private readonly TITLE1: string = "Active" + UUID.randomUUID();
    rand: Random = new Random();
    private readonly REFERENCE_NUMBER1: string = "ActiveJOB" + this.rand.nextInt(1000);
    private readonly TITLE2: string = "mypublished" + UUID.randomUUID();
    private readonly REFERENCE_NUMBER2: string = "mypublished" + this.rand.nextInt(1000);

    private jobId: string;
    private jobId1: string;

    public createJobViaRest(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.TITLE1);
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(this.TITLE1);
        jobModel.setReferenceNumber(this.REFERENCE_NUMBER1);
      this.jobId = this.createJob(this.TITLE1, jobModel);
        let jobModel1: JobModel = this.getObjectFromJson("fixtures/job/JobVacancyWithRecruiters.json", JobModel);
        let jobDescriptions1: Array<JobDescription> = jobModel1.getJobDescriptions();
        jobDescriptions1.get(0).setDescription(this.TITLE1);
        jobModel1.setJobDescriptions(jobDescriptions1);
        jobModel1.setId(this.TITLE1);
        jobModel1.setReferenceNumber(this.REFERENCE_NUMBER2);
        let recruiters: Array<Recruiters> = jobModel1.getRecruiters();
        recruiters.get(0).setExternalId("3e45b504-7ed0-4514-82c7-9c2cb1e93ddb");
        recruiters.get(0).setVisible(true);
        jobModel1.setRecruiters(recruiters);
      this.jobId1 = this.createJob(this.TITLE2, jobModel1);
    }

    public shouldCheckDisplayVacancyFilter(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.MY_PUBLISHED_VACANCIES)
                .check(TalentSourcingAssertions)
                    .assertThatDisplayFilterForJobsIsDisplayed(CheckDisplayVacanciesFilterTest.MY_PUBLISHED_VACANCIES)
                .endAssertion()
                .clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.ALL_PUBLISHED_VACANCIES)
                .check(TalentSourcingAssertions)
                    .assertThatDisplayFilterForJobsIsDisplayed(CheckDisplayVacanciesFilterTest.ALL_PUBLISHED_VACANCIES)
                .endAssertion();
    }

    public shouldCheckDisplayFilterForAllPublishedVacancies(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.ALL_PUBLISHED_VACANCIES)
                .shouldTypeAndSearchJobVacancy(this.REFERENCE_NUMBER1)
                .clickOnSearchButton()
                .check(TalentSourcingAssertions)
                    .assertThatGenericTitle(this.TITLE1)
                .endAssertion();
    }

    public shouldCheckDisplayFilterForMyPublishedVacancies(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.MY_PUBLISHED_VACANCIES)
                .check(TalentSourcingAssertions)
                    .assertThatGenericTitle(this.TITLE2)
                .endAssertion();
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteJob(this.jobId1);
    }
}
