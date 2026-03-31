// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class ViewAllSimilarJobsViaCarouselTest extends BaseRestTest {

    private five: number = 5;
    private twelve: number = 12;
    private jobRoles: string = "Job Roles";
    private unusuals: string = "Unusuals";
    private paranormalTourGuide: string = "Paranormal Tour Guide";
    private marmotStylist: string = "Marmot stylist";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckViewAllLinkForSimilarJobsVacanciesOnRolePage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.typeSearchValue(this.unusuals);
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.clickViewAllButton();
        expect(__page1.removeFilterButton(this.unusuals)).toBeVisible({ timeout: 30000 });
        expect(__page1.allCards()).toHaveCount(this.twelve);
        __page1 = __page1.clickRightArrowButton();
        __page1.pause(5000);
        Assert.assertTrue(__page1.firstCard().count() >= this.five);
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        expect(__page1.filterWithSearchValueCheckbox(this.jobRoles, this.unusuals)).toBeChecked();
    }

    public shouldCheckViewAllLinkForSimilarJobsVacanciesOnJobVacancyPage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(this.marmotStylist);
        __page2 = __page2.goToFirstJobVacancyOnAllJobsList();
        expect(__page2.viewAllLink).not.toBeVisible({ timeout: 5000 });
        __page2 = __page2.clickBackButton();
        __page2 = __page2.typeSearchValue(this.paranormalTourGuide);
        __page2 = __page2.goToFirstJobVacancyOnAllJobsList();
        __page2 = __page2.clickViewAllButton();
        expect(__page2.removeFilterButton(this.unusuals)).toBeVisible({ timeout: 30000 });
        expect(__page2.allCards()).toHaveCount(this.twelve);
        __page2 = __page2.clickRightArrowButton();
        __page2.pause(5000);
        Assert.assertTrue(__page2.firstCard().count() >= this.five);
        __page2 = __page2.openFiltersModal(AllFiltersModalPage);
        expect(__page2.filterWithSearchValueCheckbox(this.jobRoles, this.unusuals)).toBeChecked();
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
