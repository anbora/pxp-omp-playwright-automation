// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class SimilarJobsNavigationCarouselTest extends BaseRestTest {

    private roadMime: string = "Road Mime";
    private fifteen: string = "15";
    private jobTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckSimilarJobsCarouselNavigationOnJobVacancyDetailsPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.roadMime);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        expect(__page1.carouselCounter).toContainText(this.fifteen, { timeout: 30000 });
        expect(__page1.jobsOnCarousel).toHaveCount(Integer.parseInt(this.fifteen));
        expect(__page1.leftCarouselControlButton).not.toBeVisible({ timeout: 5000 });
        expect(__page1.rightCarouselControlButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickRightControlButton();
        expect(__page1.leftCarouselControlButton).toBeVisible({ timeout: 30000 });
        expect(__page1.rightCarouselControlButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickRightControlButton();
        __page1 = __page1.clickRightControlButton();
        expect(__page1.leftCarouselControlButton).toBeVisible({ timeout: 30000 });
        expect(__page1.rightCarouselControlButton).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.clickLeftControlButton();
        __page1 = __page1.clickLeftControlButton();
        __page1 = __page1.clickLeftControlButton();
        expect(__page1.leftCarouselControlButton).not.toBeVisible({ timeout: 5000 });
        expect(__page1.rightCarouselControlButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.getFirstJobVacancyOnCarousel(this.jobTitleContainer);
        __page1 = __page1.goToFirstJobVacancyOnCarousel();
        expect(__page1.jobTitle).toContainText(this.jobTitleContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.clickBackButtonToJobVacancyDetailsPage();
        expect(__page1.jobTitle).toContainText(this.roadMime, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
