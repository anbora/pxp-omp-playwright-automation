// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class RoleActionsOnSuggestionsPageTest extends BaseRestTest {

    private first: string = "1";
    private dismiss: string = "Dismiss";
    private dismissed: string = "Dismissed";
    private markedAsAspirationalRole: string = "Marked as aspirational Job Role";
    private markAsAspirationalRole: string = "Mark as aspirational Job Role";
    private removeAsAspirationalRole: string = "Remove as aspirational Job Role";
    private roleIdContainer: ResultContainer = new ResultContainer();
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

    public checkActionsForAnySuggestedRole(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ));
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForRoleSuggestions();
        __page1 = __page1.refreshPage();
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.getRoleName(this.roleIdContainer);
        __page1 = __page1.clickBackButton();
        __page1 = __page1.performActionForSuggestedNotYourCurrentRole(this.dismiss);
        __page1 = __page1.refreshPage();
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickRolesTab();
        __page1 = __page1.selectLeftMenuTab(this.dismissed);
        __page1 = __page1.refreshPageUntilRoleFound(this.roleIdContainer.getValue());
        expect(__page1.rolesByID(this.roleIdContainer.getValue())).toBeVisible({ timeout: 30000 });
        __page1.getPage().waitForLoadState();
        Assert.assertTrue(__page1.roleMarkedAsDismissed(this.roleIdContainer.getValue()).getAttribute("class").contains("social-activity-btn--red-active"));
        __page1 = __page1.clickDismissRoleId(this.roleIdContainer.getValue());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToSuggestionsPageViaTab();
        __page1 = __page1.waitForRoleSuggestions();
        __page1 = __page1.waitForJobRoleRecommendationByTitle(this.roleIdContainer.getValue());
        __page1 = __page1.performActionForSuggestedNotYourCurrentRole(this.markAsAspirationalRole);
        expect(__page1.markedAsAspirationalRoleArrowIcon().first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickRolesTab();
        __page1 = __page1.selectLeftMenuTab(this.markedAsAspirationalRole);
        __page1 = __page1.refreshPageUntilRoleFound(this.roleIdContainer.getValue());
        expect(__page1.rolesByID(this.roleIdContainer.getValue())).toBeVisible({ timeout: 30000 });
        expect(__page1.markedAsAspirationalRoleIdArrowIcon(this.roleIdContainer.getValue())).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickMoreActionsButton();
        expect(__page1.moreActionsPopperOption(this.dismiss)).toBeHidden();
        expect(__page1.moreActionsPopperOption(this.markAsAspirationalRole)).toBeHidden();
        __page1 = __page1.refreshPage();
        __page1 = __page1.performActionForRole(this.removeAsAspirationalRole);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToSuggestionsPageViaTab();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
