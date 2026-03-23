import { HrDataAssertions } from "assertions/admin/hrdata/HrDataAssertions";
import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateAndSearchRoleTest extends BaseRestTest {

    private one: number = 1;
    private roleName: string = UUID.randomUUID().toString();
    private hrData: string = "HR Data";
    private jobRoles: string = "Job Roles";
    private qaFamily: string = "QA family";
    private qaFunctionFamily: string = "QA family";
    private internship: string = "Internship";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createRoleManuallyViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHRData(this.jobRoles)
                .addJobRole()
                .typeRoleName(this.roleName)
                .selectFunctionAndFamily(this.qaFamily, this.qaFunctionFamily)
                .clickJobLevelDropdown()
                .clickSaveButton()
                .check(HrDataAssertions)
                    .assertThatJobRoleIsDisplayedOnTheList(this.roleName);
    }

    public shouldSearchForRoleInOpportunityMarketplace(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.roleName)
                .check(RoleListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.one);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
