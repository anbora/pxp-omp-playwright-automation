// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { Locator, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class ManageJobVacancyAddFilterTest extends BaseRestTest {

    private static readonly LEAD: string = "Lead";
    private static readonly SENIOR_QA_LEAD: string = "DevSecOps Lead";
    private static readonly RAJENDRAN: string = "Rajendran Sridhar";
    private static readonly PRZEMYSLAW: string = "Przemyslaw Bozowski";
    private static readonly USER_4: string = "user4 4";
    private static readonly ADD_FILTER: string = "Add filter";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";

    public shouldFilterBasedOnScheduleFilter(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getCypress2User()));
        __page1 = __page1.goToTalentSourcing();
        __page1 = __page1.clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES);
        __page1 = __page1.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page1.firstItemOnAllTalentSourcingJobList);
        let value: number = __page1.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        __page1 = __page1.shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD);
        __page1 = __page1.clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD);
        expect(__page1.viewDetails).toBeVisible();
        expect(__page1.manageJobVacancy).toBeVisible();
        __page1 = __page1.clickOnManageJobVacancy();
        __page1 = __page1.clickAllTab();
        __page1 = __page1.clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER);
        __page1 = __page1.clickOnFilterValue("Schedule", "Full time");
        expect(__page1.suggestedCandidateName(ManageJobVacancyAddFilterTest.RAJENDRAN)).toContainText(ManageJobVacancyAddFilterTest.RAJENDRAN, { timeout: 30000 });
    }

    public shouldFilterBasedOnJobTypeFilter(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getCypress2User()));
        __page2 = __page2.goToTalentSourcing();
        __page2 = __page2.clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES);
        __page2 = __page2.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page2.firstItemOnAllTalentSourcingJobList);
        let value: number = __page2.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        __page2 = __page2.shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD);
        __page2 = __page2.clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD);
        expect(__page2.viewDetails).toBeVisible();
        expect(__page2.manageJobVacancy).toBeVisible();
        __page2 = __page2.clickOnManageJobVacancy();
        __page2 = __page2.clickAllTab();
        __page2 = __page2.clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER);
        __page2 = __page2.clickOnFilterValue("Job Type", "Permanent");
        expect(__page2.suggestedCandidateName(ManageJobVacancyAddFilterTest.PRZEMYSLAW)).toContainText(ManageJobVacancyAddFilterTest.PRZEMYSLAW, { timeout: 30000 });
    }

    public shouldFilterBasedOnWorkplaceModel(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getCypress2User()));
        __page3 = __page3.goToTalentSourcing();
        __page3 = __page3.clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES);
        __page3 = __page3.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page3.firstItemOnAllTalentSourcingJobList);
        let value: number = __page3.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        __page3 = __page3.shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD);
        __page3 = __page3.clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD);
        expect(__page3.viewDetails).toBeVisible();
        expect(__page3.manageJobVacancy).toBeVisible();
        __page3 = __page3.clickOnManageJobVacancy();
        __page3 = __page3.clickAllTab();
        __page3 = __page3.clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER);
        __page3 = __page3.clickOnFilterValue("Workplace Model", "Hybrid");
        expect(__page3.suggestedCandidateName(ManageJobVacancyAddFilterTest.RAJENDRAN)).toContainText(ManageJobVacancyAddFilterTest.RAJENDRAN, { timeout: 30000 });
    }

    public shouldFilterBasedOnCareerTrack(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.getCypress2User()));
        __page4 = __page4.goToTalentSourcing();
        __page4 = __page4.clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES);
        __page4 = __page4.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page4.firstItemOnAllTalentSourcingJobList);
        let value: number = __page4.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        __page4 = __page4.shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD);
        __page4 = __page4.clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD);
        expect(__page4.viewDetails).toBeVisible();
        expect(__page4.manageJobVacancy).toBeVisible();
        __page4 = __page4.clickOnManageJobVacancy();
        __page4 = __page4.clickAllTab();
        __page4 = __page4.clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER);
        __page4 = __page4.clickOnFilterValue("Career Track", "Management");
        expect(__page4.suggestedCandidateName(ManageJobVacancyAddFilterTest.USER_4)).toContainText(ManageJobVacancyAddFilterTest.USER_4, { timeout: 30000 });
    }
}
