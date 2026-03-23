import { RolesAssertions } from "assertions/admin/roles/RolesAssertions";
import { UsersAdminAssertions } from "assertions/admin/users/UsersAdminAssertions";
import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                .endAssertion()
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .check(MentorshipDiscoveryAssertions)
                    .assertAllMentorsHeaderIsDisplayed()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.accounts)
                .openUsersPage()
                .fillInSearchInput(this.user.email)
                .checkUserRole()
                .clickCloseRolesModalButton()
                .checkUserRole()
                .check(UsersAdminAssertions)
                    .assertThatUserHasAdminRoleAssigned()
                .endAssertion()
                .clickCloseRolesModalButton()
                .openRolesPage()
                .clickEditRole(this.adminRole)
                .check(RolesAssertions)
                    .assertThatPermissionIsSwitchOn(this.permissionName)
                .endAssertion()
                .clickCloseButton()
                .clickEditRole(this.memberRole)
                .check(RolesAssertions)
                    .assertThatPermissionIsSwitchOff(this.permissionName)
                .endAssertion()
                .clickCloseButton();
    }

    public mentorsCarouselShouldNotBeVisibleUserMember(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsNotDisplayed()
                .endAssertion()
                .goToCareerGrowthPage()
                .check(WelcomePageAssertions)
                    .assertThatMentorshipTabIsNotVisible()
                .endAssertion();
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
