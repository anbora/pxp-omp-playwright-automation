// @ts-nocheck

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
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(DifferentActionForApplyJobButtonTest.FIRST_TITLE);
        __page1 = __page1.clickJobVacancyCardsDetails(DifferentActionForApplyJobButtonTest.FIRST_TITLE);
        expect(__page1.applyButtonText).toContainText(DifferentActionForApplyJobButtonTest.APPLY_BUTTON_TEXT, { timeout: 30000 });
        expect(__page1.applyUrlButton(this.APPLY_URL)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(DifferentActionForApplyJobButtonTest.SECOND_TITLE);
        __page1 = __page1.clickJobVacancyCardsDetails(DifferentActionForApplyJobButtonTest.SECOND_TITLE);
        expect(__page1.applyButtonText).toContainText(DifferentActionForApplyJobButtonTest.VIEW_ON_CAREER_SITE_BUTTON_TEXT, { timeout: 30000 });
        expect(__page1.applyUrlButton(this.JOB_DETAILS_URL)).toBeVisible({ timeout: 30000 });
    }

    public shouldValidateMessageWhileClickingOnApplyButton(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(DifferentActionForApplyJobButtonTest.FIRST_TITLE);
        __page2 = __page2.clickJobVacancyCardsDetails(DifferentActionForApplyJobButtonTest.FIRST_TITLE);
        __page2 = __page2.clickApplyButton();
        expect(__page2.applyButtonMessage).toContainText(DifferentActionForApplyJobButtonTest.MESSAGE_AFTER_CLICKING_ON_APPLY_BUTTON, { timeout: 30000 });
        __page2 = __page2.clickCloseButton();
    }

    public deleteJobsViaRest(): void {
        this.deleteJob(this.jobIdFirst);
        this.deleteJob(this.jobIdSecond);

        this.deleteUser(this.user);
    }
}
