// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class SuggestedRoleDismissedTest extends BaseRestTest {

    private two: string = "1";
    private dismiss: string = "Dismiss";
    private dismissed: string = "Dismissed";
    private roleIdContainer: ResultContainer = new ResultContainer();
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

    public shouldDismissSuggestedJobRoleOnTheSuggestionsList(): void {
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
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForRoleSuggestions();
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.getRoleName(this.roleIdContainer);
        __page1 = __page1.clickBackButton();
        __page1 = __page1.performActionForSuggestedNotYourCurrentRole(this.dismiss);
        __page1 = __page1.refreshPage();
        expect(__page1.firstCardName().first()).not.toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.goToRolesPageViaTab();
        expect(__page1.firstCardName().first()).not.toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.typeSearchValue(this.roleIdContainer.getValue());
        expect(__page1.firstCardName().first()).not.toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.clickManageRoles();
        __page1 = __page1.selectLeftMenuTab(this.dismissed);
        __page1 = __page1.refreshPageUntilRoleFound(this.roleIdContainer.getValue());
        expect(__page1.rolesByID(this.roleIdContainer.getValue())).toBeVisible({ timeout: 30000 });
        __page1.getPage().waitForLoadState();
        Assert.assertTrue(__page1.roleMarkedAsDismissed(this.roleIdContainer.getValue()).getAttribute("class").contains("social-activity-btn--red-active"));
        __page1 = __page1.clickDismissRoleId(this.roleIdContainer.getValue());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForJobRoleRecommendationByTitle(this.roleIdContainer.getValue());
        expect(__page1.firstCard()).toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
    }

    public shouldDismissSuggestedJobRoleOnAllJobRolesPage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.goToFirstRoleCard();
        __page2 = __page2.getRoleName(this.roleIdContainer);
        __page2 = __page2.clickBackButton();
        __page2 = __page2.performActionForSuggestedNotYourCurrentRole(this.dismiss);
        __page2 = __page2.refreshPage();
        expect(__page2.firstCardName().first()).not.toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
        __page2 = __page2.goToSuggestionsPageViaTab();
        expect(__page2.firstCard().first()).not.toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
        __page2 = __page2.goToRolesPageViaTab();
        __page2 = __page2.clickManageRoles();
        __page2 = __page2.selectLeftMenuTab(this.dismissed);
        __page2 = __page2.refreshPageUntilRoleFound(this.roleIdContainer.getValue());
        expect(__page2.rolesByID(this.roleIdContainer.getValue())).toBeVisible({ timeout: 30000 });
        __page2.getPage().waitForLoadState();
        Assert.assertTrue(__page2.roleMarkedAsDismissed(this.roleIdContainer.getValue()).getAttribute("class").contains("social-activity-btn--red-active"));
        __page2 = __page2.clickDismissRoleId(this.roleIdContainer.getValue());
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToSuggestionsPageViaTab();
        __page2 = __page2.waitForJobRoleRecommendationByTitle(this.roleIdContainer.getValue());
        expect(__page2.firstCard()).toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
        __page2 = __page2.goToRolesPageViaTab();
        expect(__page2.firstCard()).toContainText(this.roleIdContainer.getValue(), { timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
