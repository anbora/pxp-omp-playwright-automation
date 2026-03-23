import { HrDataConfigurationAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobRoleConfigIndustryDropdown extends BaseRestTest {

    private hrdata: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkIndustryDropdownConfig(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrdata)
                .openMenuForHrConfiguration()
                .clickIndustryDropdown()
                .check(HrDataConfigurationAssertion)
                .assertThatIndustryDropdownValuesAppearOnClick()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
