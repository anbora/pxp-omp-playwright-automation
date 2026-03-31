// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class SimilarJobsCarouselTest extends BaseRestTest {

    private three: string = "3";
    private excellentMatchColor: string = "rgb(109, 196, 151)";
    private goodMatchColor: string = "rgb(145, 200, 62)";
    private fairMatchColor: string = "rgb(251, 171, 25)";
    private lowMatchColor: string = "rgb(238, 124, 43)";
    private guineaPigStylist: string = "Guinea Pig Stylist";
    private miceStylist: string = "Mice Stylist";
    private marmotStylist: string = "Marmot Stylist";
    private chipmunkStylist: string = "Chipmunk Stylist";
    private rodentsStylistsShortName: string = "Rodents stylists";
    private rodentsStylistsFullName: string = "Rodents stylists -  Rodents stylists";
    private internship: string = "Internship";
    private excellentMatch: string = "Excellent match";
    private goodMatch: string = "Good match";
    private fairMatch: string = "Fair match";
    //private String seattleWashingtonUSA = "Seattle, Washington, USA";
    private customerService: string = "customer service";
    private permanent: string = "Permanent";
    private shareModalHeader: string = "Share Job Vacancy";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckJobVacancyDetailsOnSimilarJobsCarousel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToEditProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.rodentsStylistsShortName, this.rodentsStylistsFullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.marmotStylist);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.clickAddSkillsToPassport();
        __page1 = __page1.markAllSkill();
        __page1 = __page1.clickSave();
        __page1 = __page1.clickBackButton();
        __page1 = __page1.typeSearchValue(this.guineaPigStylist);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.waitForExcellentMatchingForLinkedJobVacancy();
        expect(__page1.carouselCounter).toContainText(this.three, { timeout: 30000 });
        expect(__page1.jobsOnCarousel).toHaveCount(Integer.parseInt(this.three));
        expect(__page1.carouselJobTitle(this.marmotStylist)).toBeVisible({ timeout: 30000 });
        expect(__page1.carouselJobMatchLabel(this.marmotStylist)).toContainText(this.excellentMatch, { timeout: 30000 });
        expect(__page1.smileIconForJobVacancy(this.marmotStylist)).toHaveCSS("fill", this.excellentMatchColor);
        expect(__page1.carouselJobTitle(this.chipmunkStylist)).toBeVisible({ timeout: 30000 });
        expect(__page1.carouselJobMatchLabel(this.chipmunkStylist)).toContainText(this.goodMatch, { timeout: 30000 });
        expect(__page1.smileIconForJobVacancy(this.chipmunkStylist)).toHaveCSS("fill", this.goodMatchColor);
        expect(__page1.carouselJobTypeLabel(this.chipmunkStylist)).toContainText(this.permanent, { timeout: 30000 });
        expect(__page1.carouselSkillLabel(this.chipmunkStylist, this.customerService)).toBeVisible({ timeout: 30000 });
        expect(__page1.carouselJobTitle(this.miceStylist)).toBeVisible({ timeout: 30000 });
        expect(__page1.carouselJobTypeLabel(this.miceStylist)).toContainText(this.internship, { timeout: 30000 });
        expect(__page1.carouselJobMatchLabel(this.miceStylist)).toContainText(this.fairMatch, { timeout: 30000 });
        expect(__page1.smileIconForJobVacancy(this.miceStylist)).toHaveCSS("fill", this.fairMatchColor);
        __page1 = __page1.goToJobVacancyOnCarousel(this.miceStylist);
        expect(__page1.carouselJobTitle(this.guineaPigStylist)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.shareSimilarJob(this.guineaPigStylist);
        expect(__page1.modalHeader).toContainText(this.shareModalHeader, { timeout: 30000 });
        __page1 = __page1.closeModalAndGoBackToJobVacancyDetailsPage();
        __page1 = __page1.bookmarkSimilarJob(this.guineaPigStylist);
        __page1 = __page1.dismissSimilarJob(this.marmotStylist);
        expect(__page1.carouselJobTitle(this.marmotStylist)).not.toBeVisible({ timeout: 5000 });
        expect(__page1.bookmarkedButtonForSimilarJob(this.guineaPigStylist)).toBeVisible({ timeout: 30000 });
        expect(__page1.dismissButtonForSimilarJob(this.guineaPigStylist)).not.toBeVisible({ timeout: 5000 });
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
