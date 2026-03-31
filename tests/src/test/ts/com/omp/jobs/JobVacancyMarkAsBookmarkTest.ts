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
import { Assert, assertTrue } from "common/testing/runtime";

export class JobVacancyMarkAsBookmarkTest extends BaseRestTest {

    private titleResultContainer: ResultContainer = new ResultContainer();
    private bookmarked: string = "Bookmarked";
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldBookmarkJobVacancy(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToSuggestionsPageViaCard();
        __page1 = __page1.waitForSuggestions();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.getFirstItemOnSuggestedJobVacanciesList(this.titleResultContainer);
        __page1 = __page1.goToFirstSuggestedJobVacancyDetailsPage();
        __page1 = __page1.clickBookmarkButton();
        __page1 = __page1.clickBackButton();
        __page1 = __page1.refreshPage();
        expect(__page1.jobVacancyBookmarked(this.titleResultContainer.getValue()).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickOpenJobsTab();
        __page1 = __page1.selectLeftMenuTab(this.bookmarked);
        __page1.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.jobCards.allTextContents().contains(this.titleResultContainer.getValue()));
        expect(__page1.jobVacancyMarkedAsBookmarked(this.titleResultContainer.getValue())).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickUnbookmarkJobVacancyByTitle(this.titleResultContainer.getValue());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.titleResultContainer.getValue());
        expect(__page1.bookmarkButton(this.titleResultContainer.getValue()).first()).toBeVisible({ timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
