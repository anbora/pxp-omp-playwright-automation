import { HrDataConfigurationAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataConfigurationJobRoleFilterTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private jobRoleFilter: string = "2";
    private jobRoleFilterIncorrect: string = "a";
    private organizationUnitType: string = "Legal Unit";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleConfigurationPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickOrganizationConfiguration()
                .check(HrDataConfigurationAssertion)
                    .assertThatOrganizationConfigurationTabIsDisplayed()
                    .assertThatOrganizationConfigurationIsDisplayed()
                    .assertThatJobRoleFilterLabelIsDisplayed()
                    .assertThatInputTypeNumberIsDisplayed()
                .endAssertion()
                .selectOrganizationUnitType(this.organizationUnitType)
                .clickEnterJobRoleFilterLevelIncorrect(this.jobRoleFilterIncorrect)
                .check(HrDataConfigurationAssertion)
                    .assertThatJobRoleFilterIncorrectIsDisplayed()
                .endAssertion()
                .clickEnterJobRoleFilterLevel(this.jobRoleFilter)
                .clickSaveButton()
                .check(HrDataConfigurationAssertion)
                    .assertThatJobRoleFilterCorrectIsDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
