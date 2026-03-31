// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LeftMenuComponentEnum } from "pages/careergrowth/careergrowth/components/LeftMenuComponentEnum";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class JobActionsOnSuggestionsPageTest extends BaseRestTest {

    private readonly jobIdResultsContainer: ResultContainer = new ResultContainer();
    private readonly shareHeader: string = "Share Job Vacancy";
    private readonly javaDeveloperFullTitle: string = "Unusual job family -  Java developer";
    private readonly javaDeveloper: string = "Java developer";
    private readonly lumesse: string = "Lumesse";
    private readonly july: string = "Jul";
    private readonly year_2020: string = "2020";
    private readonly year_2023: string = "2023";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public checkActionsForAnySuggestedOpenJob(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.javaDeveloper, this.javaDeveloperFullTitle);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickAddMoreExperience();
        __page1 = __page1.fillPositionTitle(this.javaDeveloper);
        __page1 = __page1.fillCompanyName(this.lumesse);
        __page1 = __page1.selectStartDateMonth(this.july);
        __page1 = __page1.selectStartDateYear(this.year_2020);
        __page1 = __page1.selectEndDateMonth(this.july);
        __page1 = __page1.selectEndDateYear(this.year_2023);
        __page1 = __page1.clickDoneButton();
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForSuggestions();
        __page1 = __page1.clickShare();
        expect(__page1.modalHeader).toContainText(this.shareHeader, { timeout: 30000 });
        __page1 = __page1.closeModal();
        __page1 = __page1.goToFirstSuggestedJobVacancyDetailsPage();
        __page1 = __page1.getJobId(this.jobIdResultsContainer);
        __page1 = __page1.clickBackButtonToSuggestionPage();
        __page1 = __page1.dismissFirstCard();
        __page1 = __page1.refreshPage();
        expect(__page1.recommendedCardName(this.jobIdResultsContainer.getValue())).toBeHidden();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.clickInLeftMenuOption(LeftMenuComponentEnum.DISMISSED, MyOpportunitiesPage);
        __page1 = __page1.waitForJobToBeVisible();
        __page1.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.jobCards.isVisible());
        __page1.getPage().waitForLoadState();
        expect(__page1.jobIdDismissButton(this.jobIdResultsContainer.getValue())).toHaveClass("ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active");
        __page1 = __page1.undismissJobById(this.jobIdResultsContainer.getValue());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForSuggestions();
        expect(__page1.recommendedCardName(this.jobIdResultsContainer.getValue()).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.bookmarkFirstCard();
        __page1 = __page1.refreshPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.clickInLeftMenuOption(LeftMenuComponentEnum.BOOKMARK, MyOpportunitiesPage);
        __page1 = __page1.waitForJobToBeVisible();
        expect(__page1.jobCardById(this.jobIdResultsContainer.getValue())).toBeVisible({ timeout: 30000 });
        expect(__page1.jobVacancyIdMarkedAsBookmarked(this.jobIdResultsContainer.getValue())).toBeVisible();
        __page1 = __page1.clickUnbookmarkJobVacancy();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToSuggestionsPageViaTab();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
