import { ManageRoleAssertions } from "assertions/careergrowth/roles/ManageRoleAssertions";
import { ShareRoleAssertions } from "assertions/careergrowth/share/ShareRoleAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ShareRoleTest extends BaseRestTest {

    private roleTitle: string = "CustomRoleToShare_" + UUID.randomUUID();
    private message: string = this.roleTitle + " especially for you..";
    private roleId: ResultContainer = new ResultContainer();
    private senderUser: UserModel;
    private receiverUser: UserModel;

    public initialize(): void {
      this.senderUser = this.createUser();
        this.waitForResponse(20000);
      this.receiverUser = this.createUser();
    }

    public shareChosenRoleWithTheUser(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.senderUser))
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .clickShareInContextOfFirstAvailableRoleAndStoreItsId(this.roleId)
                .check(ShareRoleAssertions)
                    .assertShareRoleHeaderDisplays()
                .endAssertion()
                .selectUserToShare(this.receiverUser.getName())
                .enterShareMessage(this.message)
                .notifyIndividuals()
                .clickShare()
                .check(ShareRoleAssertions)
                    .assertShareSuccessToasterDisplays()
                .endAssertion()
                .waitForNotificationToBeSend();
    }

    public verifySharedWithMeShowsSharedRole(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.receiverUser))
                .goToMePageProfile()
                .clickRolesTab()
                .selectLeftMenuTab("Shared with me")
                .waitForRole(this.roleId.getValue())
                .check(ManageRoleAssertions)
                    .assertThatRoleIsDisplayedOnTheList(this.roleId.getValue())
                .endAssertion()
                .clickViewMessage(this.roleId.getValue())
                .check(ManageRoleAssertions)
                    .assertMessageText(this.message)
                .endAssertion()
                .closeMessageModal();
    }

    public afterClass(): void {
        this.deleteUser(this.receiverUser);
        this.deleteUser(this.senderUser);
    }
}
