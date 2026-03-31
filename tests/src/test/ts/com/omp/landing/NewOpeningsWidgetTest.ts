// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class NewOpeningsWidgetTest extends BaseRestTest {

    private projectTitleContainer: ResultContainer = new ResultContainer();
    private jobVacancyTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public newOpeningsWidgetTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.refreshUntilNewOpeningsWidgetTitleLoads();
        expect(__page1.newOpeningsWidget).toBeVisible({ timeout: 30000 });
        expect(__page1.projectsTitleLocator.first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.getFirstItemOnAllProjectsList(this.projectTitleContainer);
        __page1 = __page1.clickProjectCardWithProjectTitle(this.projectTitleContainer.getValue());
        expect(__page1.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page1.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page1.projectPublishedDate).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.clickSeeAllButtonInNewOpeningsWidget();
        expect(__page1.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page1.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page1.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.clickJobVacanciesTab();
        __page1 = __page1.getFirstItemOnAllJobVacanciesList(this.jobVacancyTitleContainer);
        __page1 = __page1.clickJobVacancyCardWithTitle(this.jobVacancyTitleContainer.getValue());
        expect(__page1.jobTitle).toContainText(this.jobVacancyTitleContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.clickJobVacanciesTab();
        __page1 = __page1.clickSeeAllButtonInJobVacanciesTab();
        expect(__page1.allJobVacanciesPageHeader).toBeVisible({ timeout: 30000 });
    }
}
