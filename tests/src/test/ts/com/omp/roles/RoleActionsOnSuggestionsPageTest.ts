import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { ManageRoleAssertions } from "assertions/careergrowth/roles/ManageRoleAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSkipForNowButton()
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaTab()
                .waitForRoleSuggestions()
                .refreshPage()
                .goToFirstRoleCard()
                .getRoleName(this.roleIdContainer)
                .clickBackButton()
                .performActionForSuggestedNotYourCurrentRole(this.dismiss)
                .refreshPage()
                .check(RoleListAssertions)
//                    .assertThatRoleSuggestionIsNotOnTheList(roleIdContainer.getValue())
                .endAssertion()
                .goToProfileFromUserDropDown(this.user.name)
                .clickRolesTab()
                .selectLeftMenuTab(this.dismissed)
                .refreshPageUntilRoleFound(this.roleIdContainer.getValue())
                .check(ManageRoleAssertions)
                    .assertThatRoleIsDisplayedOnTheList(this.roleIdContainer.getValue())
                    .assertThatRoleIsMarkedAsDismissed(this.roleIdContainer.getValue())
                .endAssertion()
                .clickDismissRoleId(this.roleIdContainer.getValue())
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .waitForRoleSuggestions()
                .waitForJobRoleRecommendationByTitle(this.roleIdContainer.getValue())
                .check(SuggestionsAssertions)
//                    .assertThatGivenRoleIdSuggestionIsOnTheList(roleIdContainer.getValue())
                .endAssertion()
                .performActionForSuggestedNotYourCurrentRole(this.markAsAspirationalRole)
                .check(SuggestionsAssertions)
                    .assertThatFirstRoleIsMarkedWithArrowIcon()
                .endAssertion()
                .goToProfileFromUserDropDown(this.user.name)
                .clickRolesTab()
                .selectLeftMenuTab(this.markedAsAspirationalRole)
                .refreshPageUntilRoleFound(this.roleIdContainer.getValue())
                .check(ManageRoleAssertions)
                    .assertThatRoleIsDisplayedOnTheList(this.roleIdContainer.getValue())
                    .assertThatRoleIsMarkedAsAspirational(this.roleIdContainer.getValue())
                .endAssertion()
                .clickMoreActionsButton()
                .check(ManageRoleAssertions)
                    .assertThatActionIsNotDisplayed(this.dismiss)
                    .assertThatActionIsNotDisplayed(this.markAsAspirationalRole)
                .endAssertion()
                .refreshPage()
                .performActionForRole(this.removeAsAspirationalRole)
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .check(SuggestionsAssertions)
//                    .assertThatRoleIdIsNotMarkedWithArrowIcon(roleIdContainer.getValue())
        ;
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
