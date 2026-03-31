// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Locator, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class ViewDetailsJobVacancyTest extends BaseRestTest {

    private static readonly QA: string = "Lead";
    private static readonly SENIOR_QA_LEAD: string = "DevSecOps Lead";
    private static readonly JOB_VACANCY: string = "Job Vacancy";
    private static readonly DESCRIPTION: string = "Description";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckViewDetailsForJobVacancy(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToTalentSourcing();
        __page1 = __page1.clickOnDisplayVacancyFilter(ViewDetailsJobVacancyTest.ALL_PUBLISHED_VACANCIES);
        __page1 = __page1.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page1.firstItemOnAllTalentSourcingJobList);
        let value: number = __page1.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        __page1 = __page1.shouldTypeAndSearchJobVacancy(ViewDetailsJobVacancyTest.QA);
        __page1 = __page1.clickOnKebabMenu(ViewDetailsJobVacancyTest.SENIOR_QA_LEAD);
        expect(__page1.viewDetails).toBeVisible();
        expect(__page1.manageJobVacancy).toBeVisible();
        __page1 = __page1.clickOnViewDetail();
        expect(__page1.genericTitleHeaders(ViewDetailsJobVacancyTest.JOB_VACANCY)).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeaders(ViewDetailsJobVacancyTest.DESCRIPTION)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOnBackButton();
        expect(__page1.jobName(ViewDetailsJobVacancyTest.SENIOR_QA_LEAD)).toContainText(ViewDetailsJobVacancyTest.SENIOR_QA_LEAD, { timeout: 30000 });
        __page1.logger.info("Verified Job ViewDetailsJobVacancyTest.SENIOR_QA_LEAD " + ViewDetailsJobVacancyTest.SENIOR_QA_LEAD);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
