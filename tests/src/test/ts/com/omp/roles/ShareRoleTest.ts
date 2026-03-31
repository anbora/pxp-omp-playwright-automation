// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.senderUser));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaTab();
        __page1 = __page1.clickShareInContextOfFirstAvailableRoleAndStoreItsId(this.roleId);
        this.assertShareModalHeaderDisplays();
        __page1 = __page1.selectUserToShare(this.receiverUser.getName());
        __page1 = __page1.enterShareMessage(this.message);
        __page1 = __page1.notifyIndividuals();
        __page1 = __page1.clickShare();
        return super.assertShareSuccessToasterDisplays();
        __page1 = __page1.waitForNotificationToBeSend();
    }

    public verifySharedWithMeShowsSharedRole(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.receiverUser));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickRolesTab();
        __page2 = __page2.selectLeftMenuTab("Shared with me");
        __page2 = __page2.waitForRole(this.roleId.getValue());
        expect(__page2.rolesByID(this.roleId.getValue())).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickViewMessage(this.roleId.getValue());
        expect(__page2.message).toContainText(this.message, { timeout: 30000 });
        __page2 = __page2.closeMessageModal();
    }

    public afterClass(): void {
        this.deleteUser(this.receiverUser);
        this.deleteUser(this.senderUser);
    }
}
