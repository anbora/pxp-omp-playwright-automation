import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class JobRoleDescriptionsTest extends BaseRestTest {
    private user: UserModel;
    private LARGER_DESCRIPTION: string = "As a Selenium Automation Tester, you will be responsible for designing and developing test automation frameworks and test cases to test web applications using Selenium. In addition, you will also be responsible for troubleshooting and debugging the existing automation code to improve its efficiency. Furthermore, you will also be required to work closely with the development team to ensure that all the features are properly tested before release. To be successful in this role, you should have priority";
    private LARGER_ADDITIONAL_DESCRIPTION: string = "additional As a Selenium Automation Tester, you will be responsible for designing and developing test";
    private SMALLER_DESCRIPTION: string = "Description for test";
    private SMALLER_ADDITIONAL_DESCRIPTION: string = "Additional for test";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckRoleCreatedWithLargerDescriptionAndAdditionalDescription(): void {
        let roleId: any;
        let ROLE_NAME: string = UUID.randomUUID().toString();
        let CYPRESS_ROLE_NAME: string = "CypressRoleName_" + ROLE_NAME;
      let roleId: any = this.createRole(CYPRESS_ROLE_NAME, this.LARGER_DESCRIPTION, this.LARGER_ADDITIONAL_DESCRIPTION, (this.getPortalConfig(this.portalIndex).getRoleFamilyId()) );
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(RoleDetailsPage, roleId)
                .waitForRoleDetailsToBeVisible(CYPRESS_ROLE_NAME)
                .check(RoleDetailsAssertions)
                    .assertThatRoleNameEqualTo(CYPRESS_ROLE_NAME)
                    .assertThatRoleDescriptionDivValueContains(this.LARGER_DESCRIPTION)
                    .assertThatRoleDescriptionStrongValueContains(this.LARGER_ADDITIONAL_DESCRIPTION)
                .endAssertion();
        this.deleteRole(ROLE_NAME, roleId);
    }

    public shouldCheckRoleCreatedWithSmallerDescriptionAndAdditionalDescription(): void {
        let roleId: any;
        let ROLE_NAME: string = UUID.randomUUID().toString();
        let CYPRESS_ROLE_NAME: string = "CypressRoleName_" + ROLE_NAME;
      let roleId: any = this.createRole(CYPRESS_ROLE_NAME, this.SMALLER_DESCRIPTION, this.SMALLER_ADDITIONAL_DESCRIPTION, (this.getPortalConfig(this.portalIndex).getRoleFamilyId()) );
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(RoleDetailsPage, roleId)
                .waitForRoleDetailsToBeVisible(CYPRESS_ROLE_NAME)
                .check(RoleDetailsAssertions)
                    .assertThatRoleNameEqualTo(CYPRESS_ROLE_NAME)
                    .assertThatRoleDescriptionDivValueContains(this.SMALLER_DESCRIPTION)
                    .assertThatRoleDescriptionStrongValueContains(this.SMALLER_ADDITIONAL_DESCRIPTION)
                .endAssertion();
        this.deleteRole(ROLE_NAME, roleId);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
