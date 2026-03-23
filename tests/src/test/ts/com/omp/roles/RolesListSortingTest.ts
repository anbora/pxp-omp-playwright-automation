import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class RolesListSortingTest extends BaseRestTest {

    private user: UserModel;
    private roleContainer: ResultContainer = new ResultContainer();

    public dataProviderForRoleSorting(): any[][] {
        return [
                        ["Excellent to Low Match", "Low to Excellent Match"],
                        ["Newest First", "Oldest First"],
                        ["Alphabetical: A-Z", "Alphabetical: Z-A"]
                ];
    }

    public initialize(): void {

    this.user = this.createUser();

    }

    public prepareUserForTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .waitForGoodOrExcellentMatch();
    }

    public shouldCheckRoleSorting(startSorting: string, endSorting: string): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .sortListBy(startSorting)
                .getFirstCardOnAllList(this.roleContainer)
                .check(RoleListAssertions)
                    .assertThatFirstRoleOnAllRolesListIsEqualTo(this.roleContainer.getValue())
                .endAssertion()
                .sortListBy(endSorting)
                .check(RoleListAssertions)
                    .assertThatFirstRoleOnAllRolesListIsNotEqualTo(this.roleContainer.getValue())
                .endAssertion()
                .sortListBy(startSorting)
                .check(RoleListAssertions)
                    .assertThatFirstRoleOnAllRolesListIsEqualTo(this.roleContainer.getValue());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
