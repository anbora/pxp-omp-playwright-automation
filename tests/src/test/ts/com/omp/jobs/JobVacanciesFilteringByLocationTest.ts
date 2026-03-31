// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class JobVacanciesFilteringByLocationTest extends BaseRestTest {

    private jobWithLocation: JobModel;
    private user: UserModel;
    private locationId: string = "1_751";
    private locationValue: string = "Recife, Brazil";
    private title: string = UUID.randomUUID().toString();
    private jobId: string;
    private twelve: number = 12;
    private one: number = 1;

    public initialize(): void {
      this.jobWithLocation = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
      this.jobId = createJobWithLocation(this.title, this.locationId, this.jobWithLocation);
      this.user = this.createUser();
    }

    public shouldFilterVacanciesByLocation(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.title);
        expect(__page1.allCards()).toHaveCount(this.one);
        __page1 = __page1.clearSearchKeywordCriteria();
        __page1 = __page1.refreshPage();
        expect(__page1.allCards()).toHaveCount(this.twelve);
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.searchForLocation(this.locationValue);
        __page1 = __page1.applyFilters();
        expect(__page1.removeFilterButton(this.locationValue)).toBeVisible({ timeout: 30000 });
        expect(__page1.allCards()).toHaveCount(this.one);
    }

    public cleanUp(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
