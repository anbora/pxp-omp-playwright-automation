import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
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
                .goToRolesPageViaTab()
                .goToFirstRoleCard()
//                .getRoleId(roleIdContainer)
                .markRoleAspirational()
                .selectPathForAspirationalSubmenu(this.noPath)
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .refreshPage()
                .waitForRoleMarkedAsAspirationalSuggestionById(this.roleIdContainer.getValue())
                .check(RoleListAssertions)
                    .assertThatFirstRoleIdIsMarkedWithArrowIcon(this.roleIdContainer.getValue())
                    .assertThatYourAspirationalRolesInformationTextIsDisplayed("Your aspirational")
                    .assertNumberOfYourAspirationalRoles(1)
                .endAssertion()
                .viewDetailsOfAspirationalRole()
                .check(RoleDetailsAssertions)
                    .assertThatRoleIsMarkedAsAspirational()
                .endAssertion()
                .removeRoleAsAspirational()
                .check(RoleDetailsAssertions)
                    .assertThatMarkAsAspirationalRoleButtonIsDisplayed()
                .endAssertion()
                .clickBackButton()
                .waitForRoleMarkedAsAspirationalSuggestionByIdIsNotVisible(this.roleIdContainer.getValue())
                .goToCareerGrowthWelcomePageViaTab()
                .refreshPage()
                .check(WelcomePageAssertions)
                    .assertThatYourAspirationalRolesInformationTextIsDisplayed("we can help you with a learning plan");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
