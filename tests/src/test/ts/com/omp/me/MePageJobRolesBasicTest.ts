import { ManageRoleAssertions } from "assertions/careergrowth/roles/ManageRoleAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class MePageJobRolesBasicTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public MeJobRolesBasicTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToMePageProfile()
                .clickRolesTab()
                .clickExploreRoles()
                .dismissFirstCard()
                .markFirstSuggestedRoleAsAspirational()
                .goToMePageProfile()
                .clickRolesTab()
                .check(ManageRoleAssertions)
                    .assertThatRoleIsPresentOnTheList()
                .endAssertion()
                .clickMoreActionsButton()
                .performActionForRole("Remove as aspirational Job Role")
                .check(ManageRoleAssertions)
                    .assertThatRoleIsNotPresentOnTheList("You haven`t marked any Job Roles as aspirational yet. Start by exploring Job Roles!")
                .endAssertion()
                .selectLeftMenuTab("Dismissed")
                .check(ManageRoleAssertions)
                    .assertThatRoleIsPresentOnTheList()
                .endAssertion()
                .clickUnDismissFirstRole()
                .check(ManageRoleAssertions)
                    .assertThatRoleIsNotPresentOnTheList("You haven`t marked any Job Roles as dismissed yet.")
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
