// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { assertFalse, assertTrue } from "common/testing/runtime";

export class MentorshipCarouselVisibilityPermissionTest extends BaseRestTest {

    private user: UserModel;
    private user2: UserModel;
    private accounts: string = "Accounts";
    private adminRole: string = "admin";
    private permissionName: string = "View mentorship opportunities";
    private memberRole: string = "member";

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(false);
    }

    public mentorsCarouselShouldBeVisibleUserAdmin(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        expect(__page1.mentorsCarousel).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        expect(__page1.allMentorsHeader).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.accounts);
        __page1 = __page1.openUsersPage();
        __page1 = __page1.fillInSearchInput(this.user.email);
        __page1 = __page1.checkUserRole();
        __page1 = __page1.clickCloseRolesModalButton();
        __page1 = __page1.checkUserRole();
        expect(__page1.currentRolesField()).toContainText("admin", { timeout: 30000 });
        __page1.logger.info("Successfully verified that admin role is assigned to user");
        __page1 = __page1.clickCloseRolesModalButton();
        __page1 = __page1.openRolesPage();
        __page1 = __page1.clickEditRole(this.adminRole);
        assertTrue(__page1.checkboxPermission(this.permissionName).isChecked(), "Permission '" + this.permissionName + "' should be checked!");
        __page1.logger.info("Successfully verified that permission is switched on");
        __page1 = __page1.clickCloseButton();
        __page1 = __page1.clickEditRole(this.memberRole);
        assertFalse(__page1.checkboxPermission(this.permissionName).isChecked(), "Permission '" + this.permissionName + "' should be unchecked!");
        __page1.logger.info("Successfully verified that permission is switched off");
        __page1 = __page1.clickCloseButton();
    }

    public mentorsCarouselShouldNotBeVisibleUserMember(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        expect(__page2.mentorsCarousel).not.toBeVisible({ timeout: 5000 });
        __page2 = __page2.goToCareerGrowthPage();
        expect(__page2.mentorshipsCard).not.toBeVisible({ timeout: 5000 });
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
