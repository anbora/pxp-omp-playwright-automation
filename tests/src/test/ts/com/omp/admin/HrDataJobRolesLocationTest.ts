import { HrDataCreateJobRoleAssertion } from "assertions/admin/hrdata/HrDataCreateJobRoleAssertion";
import { HrDataEditJobRoleAssertion } from "assertions/admin/hrdata/HrDataEditJobRoleAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobRolesLocationTest extends BaseRestTest {

    private user: UserModel;
    private hrData: string = "HR Data";
    private jobRoleName: string = UUID.randomUUID().toString();
    private roleDescription: string = UUID.randomUUID().toString();
    private functionAndFamilyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private functionName: string = "QA Job Function For Roles (DO NOT TOUCH)";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createJobRoleWithLocationField(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobRolesHRData()
                .clickAddJobRoleButton()
                .typeRoleName(this.jobRoleName)
                .typeRoleDescription(this.roleDescription)
                .selectFunctionAndFamily(this.functionName, this.functionAndFamilyName)
                .clickJobLevelDropdown()
                .check(HrDataCreateJobRoleAssertion)
                    .assertThatLocationFieldIsDisplayed()
                .endAssertion()
                .clickLocationDropdown()
                .clickSaveButton()
                .clickSearchJobRole(this.jobRoleName)
                .clickEditJobRoleButton()
                .check(HrDataEditJobRoleAssertion)
                    .assertThatLocationIsDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
