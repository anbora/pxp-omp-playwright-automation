// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { assertFalse, assertTrue } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.adminUser));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.accountsLabel);
        __page1 = __page1.openRolesPage();
        __page1 = __page1.clickAddNewRole();
        assertFalse(__page1.checkboxPermission(this.helpSectionPermissionName).isChecked(), "Permission '" + this.helpSectionPermissionName + "' should be unchecked!");
        __page1.logger.info("Successfully verified that permission is switched off");
    }

    public verifyPermissionAndHelpSectionForAdmin(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.adminUser));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.accountsLabel);
        __page2 = __page2.openRolesPage();
        __page2 = __page2.clickEditRole(this.adminRoleName);
        assertTrue(__page2.checkboxPermission(this.helpSectionPermissionName).isChecked(), "Permission '" + this.helpSectionPermissionName + "' should be checked!");
        __page2.logger.info("Successfully verified that permission is switched on");
        __page2 = __page2.clickCloseButton();
        __page2 = __page2.clickUserDropdownButton();
        assertTrue(__page2.helpSection.isVisible(), "Help section should be visible!");
        __page2.logger.info("Successfully verified that help section is visible in admin panel");
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.clickUserButton();
        assertTrue(__page2.helpSection.isVisible(), "Help section should be visible!");
        __page2.logger.info("Successfully verified that help section is visible in admin panel");
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
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.regularUser));
        __page3 = __page3.clickUserButton();
        assertFalse(__page3.helpSection.isVisible(), "Help section should be invisible!");
        __page3.logger.info("Successfully verified that help section is invisible in admin panel");
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
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.regularUser));
        __page4 = __page4.clickUserButton();
        assertTrue(__page4.helpSection.isVisible(), "Help section should be visible!");
        __page4.logger.info("Successfully verified that help section is visible in admin panel");
    }

    public afterTests(): void {
        this.deleteUser(this.adminUser);
        this.deleteUser(this.regularUser);
    }
}
