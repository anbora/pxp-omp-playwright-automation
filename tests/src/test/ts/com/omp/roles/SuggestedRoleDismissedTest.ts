import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { ManageRoleAssertions } from "assertions/careergrowth/roles/ManageRoleAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaTab()
                .waitForRoleSuggestions()
                .goToFirstRoleCard()
                .getRoleName(this.roleIdContainer)
                .clickBackButton()
                .performActionForSuggestedNotYourCurrentRole(this.dismiss)
                .refreshPage()
                .check(RoleListAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.roleIdContainer.getValue())
                .endAssertion()
                .goToRolesPageViaTab()
                .check(RoleListAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.roleIdContainer.getValue())
                .endAssertion()
                .typeSearchValue(this.roleIdContainer.getValue())
                .check(RoleListAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.roleIdContainer.getValue())
                .endAssertion()
                .clickManageRoles()
                .selectLeftMenuTab(this.dismissed)
                .refreshPageUntilRoleFound(this.roleIdContainer.getValue())
                .check(ManageRoleAssertions)
                    .assertThatRoleIsDisplayedOnTheList(this.roleIdContainer.getValue())
                    .assertThatRoleIsMarkedAsDismissed(this.roleIdContainer.getValue())
                .endAssertion()
                .clickDismissRoleId(this.roleIdContainer.getValue())
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .waitForJobRoleRecommendationByTitle(this.roleIdContainer.getValue())
                .check(SuggestionsAssertions)
                    .assertThatFirstRoleOnRecommendedRolesListIsEqualTo(this.roleIdContainer.getValue());
    }

    public shouldDismissSuggestedJobRoleOnAllJobRolesPage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .goToFirstRoleCard()
                .getRoleName(this.roleIdContainer)
                .clickBackButton()
                .performActionForSuggestedNotYourCurrentRole(this.dismiss)
                .refreshPage()
                .check(RoleListAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.roleIdContainer.getValue())
                .endAssertion()
                .goToSuggestionsPageViaTab()
                .check(SuggestionsAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.roleIdContainer.getValue())
                .endAssertion()
                .goToRolesPageViaTab()
                .clickManageRoles()
                .selectLeftMenuTab(this.dismissed)
                .refreshPageUntilRoleFound(this.roleIdContainer.getValue())
                .check(ManageRoleAssertions)
                    .assertThatRoleIsDisplayedOnTheList(this.roleIdContainer.getValue())
                    .assertThatRoleIsMarkedAsDismissed(this.roleIdContainer.getValue())
                .endAssertion()
                .clickDismissRoleId(this.roleIdContainer.getValue())
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .waitForJobRoleRecommendationByTitle(this.roleIdContainer.getValue())
                .check(SuggestionsAssertions)
                    .assertThatFirstRoleOnRecommendedRolesListIsEqualTo(this.roleIdContainer.getValue())
                .endAssertion()
                .goToRolesPageViaTab()
                .check(RoleListAssertions)
                    .assertThatFirstRoleOnRecommendedRolesListIsEqualTo(this.roleIdContainer.getValue());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
