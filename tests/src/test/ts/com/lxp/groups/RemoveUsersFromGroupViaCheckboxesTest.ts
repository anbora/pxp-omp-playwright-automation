// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { UserModel } from "models/user/UserModel";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";

export class RemoveUsersFromGroupViaCheckboxesTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + RemoveUsersFromGroupViaCheckboxesTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + RemoveUsersFromGroupViaCheckboxesTest.UNIQUE_SUFFIX;
    private static readonly TOTAL_NUMBER_OF_GROUP_MEMBERS: string = "4";
    private static readonly SELECTED_NUMBER_OF_GROUP_MEMBERS: string = "2";
    private static readonly NUMBER_OF_GROUP_MEMBERS_AFTER_REMOVAL: string = "2";
    private groupId: string;
    private user: UserModel;
    private user2: UserModel;
    private user3: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();

    public initialize(): void {

      this.groupId = createGroup(RemoveUsersFromGroupViaCheckboxesTest.GROUP_NAME, RemoveUsersFromGroupViaCheckboxesTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user = this.createUser(true);
      this.user2 = this.createUser(false);
      this.user3 = this.createUser(false);
        this.addUserToGroup(this.groupId, this.user);
        this.addUserToGroup(this.groupId, this.user2);
        this.addUserToGroup(this.groupId, this.user3);
    }

    public verifyThatGroupMembersCanBeRemovedInBulkUsingCheckboxes(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(MembersGroupPage, RemoveUsersFromGroupViaCheckboxesTest.GROUP_NAME);
        expect(__page1.getTotalNumberOfGroupMembers()).toContainText(RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);
        __page1.logger.info("Successfully verified that total number of group members is: " + RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);
        expect(__page1.getRemoveGroupMembersButton()).not.toBeVisible();
        __page1.logger.info("Successfully verified that remove group members button is not present");
        assertTrue(__page1.optionToSelect(this.user.getFullName()).isDisabled());
        __page1.logger.info("Successfully verified that checkbox is disabled");
        __page1 = __page1.selectCheckbox(this.user2.fullName);
        __page1 = __page1.selectCheckbox(this.user3.fullName);
        expect(__page1.getRemoveGroupMembersButton()).toBeVisible();
        __page1.logger.info("Successfully verified that remove group members button is present");
        expect(__page1.getSelectedUsersText()).toHaveText(RemoveUsersFromGroupViaCheckboxesTest.SELECTED_NUMBER_OF_GROUP_MEMBERS + " out of " + RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS + "  members selected");
        __page1.logger.info("Successfully verified that number of selected users is: " + RemoveUsersFromGroupViaCheckboxesTest.SELECTED_NUMBER_OF_GROUP_MEMBERS);
        __page1 = __page1.clickCancelButton();
        expect(__page1.getTotalNumberOfGroupMembers()).toContainText(RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);
        __page1.logger.info("Successfully verified that total number of group members is: " + RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);
        __page1 = __page1.selectCheckbox(this.user2.fullName);
        __page1 = __page1.selectCheckbox(this.user3.fullName);
        __page1 = __page1.clickRemoveButton();
        expect(__page1.getConfirmationModalText()).toHaveText("You are about to remove " + RemoveUsersFromGroupViaCheckboxesTest.SELECTED_NUMBER_OF_GROUP_MEMBERS + " members(s) from " + this.groupModel.getName() + " group");
        __page1.logger.info("Successfully verified that number of users to be removed is: " + RemoveUsersFromGroupViaCheckboxesTest.SELECTED_NUMBER_OF_GROUP_MEMBERS);
        __page1 = __page1.clickCloseConfirmationModal();
        expect(__page1.getTotalNumberOfGroupMembers()).toContainText(RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);
        __page1.logger.info("Successfully verified that total number of group members is: " + RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);
        expect(__page1.getRemoveGroupMembersButton()).not.toBeVisible();
        __page1.logger.info("Successfully verified that remove group members button is not present");
        __page1 = __page1.selectCheckbox(this.user2.fullName);
        __page1 = __page1.selectCheckbox(this.user3.fullName);
        __page1 = __page1.clickRemoveButton();
        __page1 = __page1.clickRemoveButtonInModal();
        expect(__page1.getRemoveGroupMembersButton()).not.toBeVisible();
        __page1.logger.info("Successfully verified that remove group members button is not present");
        expect(__page1.getTotalNumberOfGroupMembers()).toContainText(RemoveUsersFromGroupViaCheckboxesTest.NUMBER_OF_GROUP_MEMBERS_AFTER_REMOVAL);
        __page1.logger.info("Successfully verified that total number of group members is: " + RemoveUsersFromGroupViaCheckboxesTest.NUMBER_OF_GROUP_MEMBERS_AFTER_REMOVAL);

    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
        this.deleteGroup(this.groupId);
    }
}
