import { HrDataOrganizationDeactivationAssertion } from "assertions/admin/hrdata/HrDataOrganizationDeactivationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataOrganizationDeactWarningTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkDeactivationWarningViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForOrganizationHRData()
                .clickEditOrganizationButton()
                .clickInactiveButton()
                .check(HrDataOrganizationDeactivationAssertion)
                    .assertThatDeactivationWarningIsDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
