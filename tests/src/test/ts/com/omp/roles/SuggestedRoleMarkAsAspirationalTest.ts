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
import { expect } from "common/testing/playwright";

export class SuggestedRoleMarkAsAspirationalTest extends BaseRestTest {

    private noPath: string = "No path selection";
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

    public shouldMarkRoleAsAspirational(): void {
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
        __page1 = __page1.goToRolesPageViaTab();
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.markRoleAspirational();
        __page1 = __page1.selectPathForAspirationalSubmenu(this.noPath);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaTab();
        __page1 = __page1.refreshPage();
        __page1 = __page1.waitForRoleMarkedAsAspirationalSuggestionById(this.roleIdContainer.getValue());
        expect(__page1.markedAsAspirationalRoleIdArrowIcon(this.roleIdContainer.getValue()).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.yourAspirationalRolesInformation()).toBeVisible({ timeout: 30000 });
        expect(__page1.yourAspirationalRolesInformation()).toContainText("Your aspirational", { timeout: 30000 });
        expect(__page1.numberOfYourAspirationalRoles).toHaveCount(1);
        __page1 = __page1.viewDetailsOfAspirationalRole();
        expect(__page1.markedAsAspirationalRoleButton).toContainText("Job Role marked as aspirational", { timeout: 30000 });
        __page1 = __page1.removeRoleAsAspirational();
        expect(__page1.markRoleAsAspirationalButton.first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickBackButton();
        __page1 = __page1.waitForRoleMarkedAsAspirationalSuggestionByIdIsNotVisible(this.roleIdContainer.getValue());
        __page1 = __page1.goToCareerGrowthWelcomePageViaTab();
        __page1 = __page1.refreshPage();
        expect(__page1.yourAspirationalRolesInformation()).toBeVisible({ timeout: 30000 });
        expect(__page1.yourAspirationalRolesInformation()).toContainText("we can help you with a learning plan", { timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
