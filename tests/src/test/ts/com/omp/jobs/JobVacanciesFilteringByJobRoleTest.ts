// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class JobVacanciesFilteringByJobRoleTest extends BaseRestTest {

    private one: string = "1";
    private five: number = 5;
    private jobRoles: string = "Job Roles";
    private rodentsTest: string = "Rodents stylists -  Rodents stylists";
    private rodentsTestFilter: string = "Rodents stylists";
    private guineaPigStylist: string = "Guinea Pig Stylist";
    private miceStylist: string = "Mice Stylist";
    private marmotStylist: string = "Marmot Stylist";
    private chipmunkStylist: string = "Chipmunk Stylist";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldFilterJobVacanciesByJobRole(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.searchForFilterValue(this.jobRoles, this.rodentsTest);
        __page1 = __page1.applyFilters();
        expect(__page1.removeFilterButton(this.rodentsTestFilter)).toBeVisible({ timeout: 30000 });
        expect(__page1.allCards()).toHaveCount(this.five);
        expect(__page1.jobVacancyCardsDetails(this.chipmunkStylist).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.jobVacancyCardsDetails(this.guineaPigStylist).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.jobVacancyCardsDetails(this.marmotStylist).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.jobVacancyCardsDetails(this.miceStylist).first()).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
