// @ts-nocheck

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
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.TITLE);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        expect(__page1.jobTitle).toContainText(this.TITLE, { timeout: 30000 });
        expect(__page1.description).toContainText(this.TITLE, { timeout: 30000 });
        expect(__page1.descriptionPlainText).toBeVisible({ timeout: 30000 });
        expect(__page1.matchDetailValue(this.COMPANY_NAME)).toContainText(this.COMPANY, { timeout: 30000 });
        expect(__page1.matchDetailValue(this.REFERENCE_NAME)).toContainText(this.REFERENCE, { timeout: 30000 });
        expect(__page1.matchDetailValue(this.JOB_TYPE_NAME)).toContainText(this.JOB_TYPE, { timeout: 30000 });
        expect(__page1.matchDetailValue(this.SALARY_NAME)).toContainText(this.SALARY, { timeout: 30000 });
        expect(__page1.matchDetailValue(this.LEVEL_NAME)).toContainText(this.professional, { timeout: 30000 });
    }

    public shouldCheckVacancyAndDescriptionFieldOnTopDetailsView(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToSuggestionsPageViaTab();
        __page2 = __page2.waitForSuggestions();
        __page2 = __page2.goToFirstSuggestedJobVacancyDetailsPage();
        __page2.jobVacancyHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        expect(__page2.jobVacancyHeader).toContainText(JobVacancyDetailsTest.JOB_VACANCY, { timeout: 30000 });
        __page2.jobDescriptionHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        expect(__page2.jobDescriptionHeader).toContainText(JobVacancyDetailsTest.DESCRIPTION, { timeout: 30000 });
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
