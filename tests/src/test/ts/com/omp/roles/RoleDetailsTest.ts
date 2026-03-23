import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class RoleDetailsTest extends BaseRestTest {

    private ROLE_NAME: string = UUID.randomUUID().toString();
    private CYPRESS_ROLE_NAME: string = "CypressRoleName_" + this.ROLE_NAME;
    private internship: string = "Internship";
    private roleId: string;
    private user: UserModel;

    public initialize(): void {
      this.roleId = this.createRole(this.CYPRESS_ROLE_NAME, this.ROLE_NAME, this.ROLE_NAME);
      this.user = this.createUser();
    }

    public shouldCheckRoleTitleDescriptionAndLevel(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(RoleDetailsPage, this.roleId)
                .waitForRoleDetailsToBeVisible(this.CYPRESS_ROLE_NAME)
                .check(RoleDetailsAssertions)
                    .assertThatRoleNameEqualTo(this.CYPRESS_ROLE_NAME)
                    .assertThatRoleDescriptionH3ValueContains(this.ROLE_NAME)
                    .assertThatRoleDescriptionDivValueContains(this.ROLE_NAME)
                    .assertThatRoleDescriptionAValueContains(this.ROLE_NAME)
                    .assertThatRoleDescriptionStrongValueContains(this.ROLE_NAME)
                    .assertThatLevelIsEqualTo(this.internship);
    }

    public afterTests(): void {
        this.deleteRole(this.ROLE_NAME, this.roleId);
        this.deleteUser(this.user);
    }
}
