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
import { expect } from "common/testing/playwright";

export class JobSearchTest extends BaseRestTest {

    private readonly ONE_VALUE: number = 1;
    private readonly APPLICATIONS: string = "Applications";
    private readonly TITLE1: string = "Search_by_Title_" + UUID.randomUUID();
	private readonly TITLE2: string = "Search_by_Title_" + UUID.randomUUID();
	private readonly TITLE3: string = "Search_by_Title_" + UUID.randomUUID();
	private readonly DESCRIPTION: string = "Search_by_Description_" + UUID.randomUUID();
	private readonly REFERENCE_NO: string = "Search_by_ReferenceNo_" + UUID.randomUUID();
    private id1: string;
    private id2: string = "restassureJob_" + this.TITLE2;
    private id3: string = "restassureJob_" + this.TITLE3;

    private user: UserModel;

    public initialize(): void {
        let jobModel1: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobModel2: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);

        let jobDescriptions: Array<JobDescription> = jobModel1.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.DESCRIPTION);
        jobModel1.setJobDescriptions(jobDescriptions);
        jobModel1.setId(this.id2);

        jobModel2.setReferenceNumber(this.REFERENCE_NO);
        jobModel2.setId(this.id3);

      this.id1 = this.createJob(this.TITLE1);
      this.id2 = this.createJob(this.TITLE2, jobModel1);
      this.id3 = this.createJob(this.TITLE3, jobModel2);

      this.user = this.createUser();
    }

    public shouldSearchJobByTitle(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        expect(__page1.searchHerePlaceholder()).toBeVisible({ timeout: 30000 });
        expect(__page1.allJobVacanciesHeader()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.typeSearchValue(this.TITLE1);
        expect(__page1.allCards()).toHaveCount(this.ONE_VALUE);
        expect(__page1.jobVacancyCardsDetails(this.TITLE1).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clearSearchKeywordCriteria();
        __page1 = __page1.typeSearchValue(this.TITLE1);
        expect(__page1.allCards()).toHaveCount(this.ONE_VALUE);
        expect(__page1.jobVacancyCardsDetails(this.TITLE1).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clearSearchKeywordCriteria();
        __page1 = __page1.clickRightArrowButton();
        expect(__page1.allJobVacanciesHeader()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickMyJobVacanciesButton();
        expect(__page1.selectedTab(this.APPLICATIONS)).toBeVisible({ timeout: 30000 });
    }

    public shouldSearchJobByDescription(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(this.DESCRIPTION);
        expect(__page2.allCards()).toHaveCount(this.ONE_VALUE);
    }

    public shouldSearchJobByReferenceNumber(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToVacanciesPageViaCard();
        __page3 = __page3.typeSearchValue(this.REFERENCE_NO);
        expect(__page3.allCards()).toHaveCount(this.ONE_VALUE);
    }

    public shouldRemoveJobsViaREST(): void {
        this.deleteJob(this.id1);
        this.deleteJob(this.id2);
        this.deleteJob(this.id3);
    }

    public shouldCheckIfJobsWereDeleted(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.goToCareerGrowthPage();
        __page4 = __page4.goToVacanciesPageViaCard();
        __page4 = __page4.typeSearchValueAndWaitForEmptyResults(this.TITLE1);
        expect(__page4.noSuggestionsCard).toBeVisible({ timeout: 30000 });
        __page4 = __page4.typeSearchValueAndWaitForEmptyResults(this.DESCRIPTION);
        expect(__page4.noSuggestionsCard).toBeVisible({ timeout: 30000 });
        __page4 = __page4.typeSearchValueAndWaitForEmptyResults(this.REFERENCE_NO);
        expect(__page4.noSuggestionsCard).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
