import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
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

export class JobVacancyAvailableTest extends BaseRestTest {

    private unusuals: string = "Unusuals";
    private newest: string = "Newest First";
    private roleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckOpenJobVacancyIconForRole(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddBasicCareerPreferencesForUser())
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.unusuals)
                .check(RoleListAssertions)
                    .assertThatSimilarJobVacancyAvailableIconIsDisplayedForRole(this.unusuals)
                .endAssertion()
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatThereIsAtLeastOneOpenJobVacancy()
                .endAssertion()
                .clickBackButton()
                .clearSearchKeywordCriteria()
                .sortListBy(this.newest)
                .getFirstCardOnAllList(this.roleContainer)
                .check(RoleListAssertions)
                    .assertThatSimilarJobVacancyAvailableIconIsNotDisplayedForRole(this.roleContainer.getValue())
                .endAssertion()
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatThereIsNoOpenJobVacanciesForRole()
                .endAssertion();
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
