import { RolesAssertions } from "assertions/admin/roles/RolesAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HelpSectionPermissionTest extends GroupsRestService {

    private readonly accountsLabel: string = "Accounts";
    private readonly helpSectionPermissionName: string = "Enable help section";
    private readonly adminRoleName: string = "admin";
    private readonly memberRoleName: string = "member";
    private adminUser: UserModel;
    private regularUser: UserModel;

    public initialize(): void {
      this.adminUser = this.createUser(true);
      this.regularUser = this.createUser(false);
    }

    public verifyPermissionForNewRole(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(this.accountsLabel)
                .openRolesPage()
                .clickAddNewRole()
                .check(RolesAssertions)
                    .assertThatPermissionIsSwitchOff(this.helpSectionPermissionName)
                .endAssertion();
    }

    public verifyPermissionAndHelpSectionForAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(this.accountsLabel)
                .openRolesPage()
                .clickEditRole(this.adminRoleName)
                .check(RolesAssertions)
                    .assertThatPermissionIsSwitchOn(this.helpSectionPermissionName)
                .endAssertion()
                .clickCloseButton()
                .clickUserDropdownButton()
                .check(RolesAssertions)
                    .assertThatHelpSectionIsVisibleInAdminPanel()
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickUserButton()
                .check(LandingPageAssertions)
                    .assertThatHelpSectionIsVisible()
                .endAssertion();
    }

    public turnOffPermissionForMemberRole(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goToAdminPanel()
                .selectMainTab(this.accountsLabel)
                .openRolesPage()
                .clickEditRole(this.memberRoleName)
                .turnOffPermission(this.helpSectionPermissionName)
                .clickSaveButton();
    }

    public verifyHelpSectionForUserWhenPermissionIsOff(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.regularUser))
                .clickUserButton()
                .check(LandingPageAssertions)
                    .assertThatHelpSectionIsInvisible()
                .endAssertion();
    }

    public turnOnPermissionForMemberRole(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goToAdminPanel()
                .selectMainTab(this.accountsLabel)
                .openRolesPage()
                .clickEditRole(this.memberRoleName)
                .turnOnPermission(this.helpSectionPermissionName)
                .clickSaveButton();
    }

    public verifyHelpSectionForUserWhenPermissionIsOn(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.regularUser))
                .clickUserButton()
                .check(LandingPageAssertions)
                    .assertThatHelpSectionIsVisible()
                .endAssertion();
    }

    public afterTests(): void {
        this.deleteUser(this.adminUser);
        this.deleteUser(this.regularUser);
    }
}
