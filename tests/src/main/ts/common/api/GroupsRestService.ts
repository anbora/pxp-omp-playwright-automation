import { ApiAssertions } from "common/ApiAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { APIResponse } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";
import { GroupModel } from "models/lxp/GroupModel";
import { UserModel } from "models/user/UserModel";

export class GroupsRestService extends BaseRestTest {

    public createGroup(name: string, description: string, isPrivate: boolean, groupModel: GroupModel): string {
        groupModel.setName(name);
        groupModel.setDescription(description);
        groupModel.setIs_private(isPrivate);
        let createGroupResponse: APIResponse = postRequest(EndpointsEnum.GROUP_ENDPOINT.getEndpoint(), groupModel);
        this.assertTrue(createGroupResponse.ok(), "Group has not been created! Expected status: [200] but found [" + createGroupResponse.status() + "]. " + createGroupResponse.text());
        return new ApiAssertions().getStringValueFromResponse(createGroupResponse, "team/id");
    }

    public addUserToGroup(groupId: string, user: UserModel): void {
        let addUserToGroupResponse: APIResponse = postRequest(EndpointsEnum.GROUP_ENDPOINT.getEndpoint() + groupId + "/add_member", user);
        System.out.println(addUserToGroupResponse.text());
        System.out.println(addUserToGroupResponse.status());
        if (addUserToGroupResponse.ok()) {
            System.out.println("User with the following email address: "+ user.getEmail() + " has been successfully added to group with id " + groupId);
        } else {
            System.out.println("User with the following email address: "+ user.getEmail() + " has not been successfully added to group with id " + groupId + "Response status is :" + addUserToGroupResponse.status());
        }

    }

    public deleteGroup(id: string): void {
        let deleteGroupResponse: APIResponse = deleteRequest(EndpointsEnum.GROUP_ENDPOINT.getEndpoint() + id);
        if (deleteGroupResponse.ok()) {
            System.out.println("Group with id: "+ id + " has been deleted");
        } else {
            System.out.println("Group with id: " + id + " has not been deleted. Response status: " + deleteGroupResponse.status());
        }
    }

}
