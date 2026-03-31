// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert, assertFalse, assertTrue } from "common/testing/runtime";

export class SuggestedJobDismissTest extends BaseRestTest {

    private dismissed: string = "Dismissed";
    private jobTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldDismissJobOnJobDetailsPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper,this.lumesse,this.coding,this.october,this.year_2017,this.june,this.year_2022 ));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToSuggestionsPageViaCard();
        __page1 = __page1.waitForSuggestions();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.getFirstItemOnSuggestedJobVacanciesList(this.jobTitleContainer);
        __page1 = __page1.goToFirstSuggestedJobVacancyDetailsPage();
        __page1.jobVacancyHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        expect(__page1.bookmarkButton).toBeEnabled();
        __page1 = __page1.clickBackButton();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForJobVacanciesSuggestionByTitle(this.jobTitleContainer.getValue());
        __page1.getPage().waitForLoadState();
        Assert.assertFalse(__page1.dismissButton(this.jobTitleContainer.getValue()).first().getAttribute("class").contains(active));
        expect(__page1.recommendedCardName(this.jobTitleContainer.getValue()).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.dismissFirstCard();
        __page1 = __page1.refreshPage();
        expect(__page1.recommendedCardName(this.jobTitleContainer.getValue())).toBeHidden();
        __page1 = __page1.goToVacanciesPageViaTab();
        expect(__page1.cardName(this.jobTitleContainer.getValue())).toBeHidden();
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickOpenJobsTab();
        __page1 = __page1.selectLeftMenuTab(this.dismissed);
        __page1 = __page1.waitForJobToBeVisible();
        __page1.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.jobCards.allTextContents().contains(this.jobTitleContainer.getValue()));
        __page1.getPage().waitForLoadState();
        expect(__page1.jobVacancyDismissButton(this.jobTitleContainer.getValue())).toHaveAttribute("class", "ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active");
        __page1 = __page1.undismissJobByTitle(this.jobTitleContainer.getValue());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.waitForSuggestions();
        __page1 = __page1.refreshPage();
        __page1.getPage().waitForLoadState();
        Assert.assertFalse(__page1.dismissButton(this.jobTitleContainer.getValue()).first().getAttribute("class").contains(active));
        expect(__page1.cardName(this.jobTitleContainer.getValue()).first()).toBeVisible({ timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
