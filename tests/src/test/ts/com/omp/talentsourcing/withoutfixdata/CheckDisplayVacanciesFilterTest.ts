// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { Recruiters } from "models/job/Recruiters";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getCypress2User()));
        __page1 = __page1.goToTalentSourcing();
        __page1 = __page1.clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.MY_PUBLISHED_VACANCIES);
        expect(__page1.displayVacancyFilterValues(CheckDisplayVacanciesFilterTest.MY_PUBLISHED_VACANCIES)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.ALL_PUBLISHED_VACANCIES);
        expect(__page1.displayVacancyFilterValues(CheckDisplayVacanciesFilterTest.ALL_PUBLISHED_VACANCIES)).toBeVisible({ timeout: 30000 });
    }

    public shouldCheckDisplayFilterForAllPublishedVacancies(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getCypress2User()));
        __page2 = __page2.goToTalentSourcing();
        __page2 = __page2.clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.ALL_PUBLISHED_VACANCIES);
        __page2 = __page2.shouldTypeAndSearchJobVacancy(this.REFERENCE_NUMBER1);
        __page2 = __page2.clickOnSearchButton();
        expect(__page2.genericTitleHeader(this.TITLE1)).toBeVisible({ timeout: 30000 });
    }

    public shouldCheckDisplayFilterForMyPublishedVacancies(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getCypress2User()));
        __page3 = __page3.goToTalentSourcing();
        __page3 = __page3.clickOnDisplayVacancyFilter(CheckDisplayVacanciesFilterTest.MY_PUBLISHED_VACANCIES);
        expect(__page3.genericTitleHeader(this.TITLE2)).toBeVisible({ timeout: 30000 });
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteJob(this.jobId1);
    }
}
