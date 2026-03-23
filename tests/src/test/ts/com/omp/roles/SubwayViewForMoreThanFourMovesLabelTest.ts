import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SubwayViewForMoreThanFourMovesLabelTest extends BaseRestTest {

    private startingRole: string = "Nopolitan0";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "Subway -  Nopolitan0";
    private user: UserModel;
    private subwayText: string = "No direct path to this Job Role — build your skills and create your own journey!";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckCareerPathSectionForTextBetweenRoles(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToMePageProfile()
                .editProfile()
                .goToEditProfileFromUserDropDown(this.user.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.endRole)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatRoleMessageIsEqualTo(this.subwayText)
                .endAssertion();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
