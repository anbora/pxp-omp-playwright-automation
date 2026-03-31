// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { UserModel } from "models/user/UserModel";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class GroupBulkRemovalTabAccessBasicTest extends GroupsRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + GroupBulkRemovalTabAccessBasicTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + GroupBulkRemovalTabAccessBasicTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly GROUP_LEADER: string = "Group Leader";
    private groupId: string;
    private user: UserModel;
    private user2: UserModel;
    private user3: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();

    public initialize(): void {

      this.groupId = createGroup(GroupBulkRemovalTabAccessBasicTest.GROUP_NAME, GroupBulkRemovalTabAccessBasicTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user = this.createUser(true);
      this.user2 = this.createUser(false);
      this.user3 = this.createUser(false);
        this.addUserToGroup(this.groupId, this.user2);
        this.addUserToGroup(this.groupId, this.user3);

    }

    public verifyThatGlobalAdminHasAccessToBulkRemovalTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(GroupDetailsPage, GroupBulkRemovalTabAccessBasicTest.GROUP_NAME);
        __page1 = __page1.clickSettings();
        __page1 = __page1.clickManageGroupOption();
        expect(__page1.bulkRemovalTab).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that bulk removal tab is present");
    }
    public verifyThatGroupAdminHasAccessToBulkRemovalTab(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(MembersGroupPage, GroupBulkRemovalTabAccessBasicTest.GROUP_NAME)
                .changeGroupMemberRole(this.user2.fullName,GroupBulkRemovalTabAccessBasicTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.goDirectlyTo(MembersGroupPage, GroupBulkRemovalTabAccessBasicTest.GROUP_NAME);
        expect(__page2.bulkRemovalTab).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified that bulk removal tab is present");
    }

    public verifyThatGroupLeaderHasAccessToBulkRemovalTab(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(MembersGroupPage, GroupBulkRemovalTabAccessBasicTest.GROUP_NAME)
                .changeGroupMemberRole(this.user3.fullName,GroupBulkRemovalTabAccessBasicTest.GROUP_LEADER)
                .goDirectlyTo(SignOutPage);

                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user3));
        __page3 = __page3.goDirectlyTo(MembersGroupPage, GroupBulkRemovalTabAccessBasicTest.GROUP_NAME);
        expect(__page3.bulkRemovalTab).toBeVisible({ timeout: 30000 });
        __page3.logger.info("Successfully verified that bulk removal tab is present");
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
        this.deleteGroup(this.groupId);
    }
}
