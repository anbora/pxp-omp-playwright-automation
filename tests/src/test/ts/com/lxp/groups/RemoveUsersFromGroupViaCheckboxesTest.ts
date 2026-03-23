import { MembersGroupAssertions } from "assertions/groups/MembersGroupAssertions";
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { UserModel } from "models/user/UserModel";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(MembersGroupPage, RemoveUsersFromGroupViaCheckboxesTest.GROUP_NAME)
                .check(MembersGroupAssertions)
                    .assertThatTotalNumberOfGroupMembersIs(RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS)
                    .assertThatRemoveGroupMembersButtonIsNotVisible()
                    .assertThatCheckboxIsDisabledNextToLoggedInUser(this.user.getFullName())
                .endAssertion()
                .selectCheckbox(this.user2.fullName)
                .selectCheckbox(this.user3.fullName)
                .check(MembersGroupAssertions)
                    .assertThatRemoveGroupMembersButtonIsVisible()
                    .assertThatNumberOfSelectedUsersIs(RemoveUsersFromGroupViaCheckboxesTest.SELECTED_NUMBER_OF_GROUP_MEMBERS, RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS)
                .endAssertion()
                .clickCancelButton()
                .check(MembersGroupAssertions)
                    .assertThatTotalNumberOfGroupMembersIs(RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS)
                .endAssertion()
                .selectCheckbox(this.user2.fullName)
                .selectCheckbox(this.user3.fullName)
                .clickRemoveButton()
                .check(MembersGroupAssertions)
                    .assertThatNumberOfUsersToBeRemovedInConfirmationModalIs(RemoveUsersFromGroupViaCheckboxesTest.SELECTED_NUMBER_OF_GROUP_MEMBERS, this.groupModel.getName())
                .endAssertion()
                .clickCloseConfirmationModal()
                .check(MembersGroupAssertions)
                    .assertThatTotalNumberOfGroupMembersIs(RemoveUsersFromGroupViaCheckboxesTest.TOTAL_NUMBER_OF_GROUP_MEMBERS)
                    .assertThatRemoveGroupMembersButtonIsNotVisible()
                .endAssertion()
                .selectCheckbox(this.user2.fullName)
                .selectCheckbox(this.user3.fullName)
                .clickRemoveButton()
                .clickRemoveButtonInModal()
                .check(MembersGroupAssertions)
                    .assertThatRemoveGroupMembersButtonIsNotVisible()
                    .assertThatTotalNumberOfGroupMembersIs(RemoveUsersFromGroupViaCheckboxesTest.NUMBER_OF_GROUP_MEMBERS_AFTER_REMOVAL);

    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
        this.deleteGroup(this.groupId);
    }
}
