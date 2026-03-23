import { HrDataConfigurationAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationAssertion";
import { HrDataCreateJobRoleAssertion } from "assertions/admin/hrdata/HrDataCreateJobRoleAssertion";
import { HrDataJobRolesAssertion } from "assertions/admin/hrdata/HrDataJobRolesAssertion";
import { OpportunityMarketplaceSourcingAssertions } from "assertions/admin/OpportunityMarketplaceSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataExtIdLabelTest extends BaseRestTest {

    private hrdata: string = "HR Data";
    private user: UserModel;
    private jobRoleName: string = UUID.randomUUID().toString();
    private roleDescription: string = UUID.randomUUID().toString();
    private roleSummary: string = UUID.randomUUID().toString();
    private additionalDescription: string = UUID.randomUUID().toString();
    private functionAndFamilyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private functionName: string = "QA Job Function For Roles (DO NOT TOUCH)";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkJobRoleExternalIdInfoLabel(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrdata)
                .openMenuForJobRolesHRData()
                .clickAddJobRoleButton()
                .typeRoleName(this.jobRoleName)
                .typeRoleDescription(this.roleDescription)
                .typeRoleSummary(this.roleSummary)
                .typeAdiitionalDescription(this.additionalDescription)
                .clickLocationDropdown()
                .selectFunctionAndFamily(this.functionName, this.functionAndFamilyName)
                .clickJobLevelDropdown()
                .check(HrDataCreateJobRoleAssertion)
                .assertThatExternalIdTextIsDisplayed()
                .endAssertion()
                .clickSaveButton()
                .clickSearchJobRole(this.jobRoleName)
                .clickEditJobRoleButton();

    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
