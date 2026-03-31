// @ts-nocheck
import { GroupsRestService } from "common/api/GroupsRestService";
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { APIResponse } from "common/testing/playwright";

export class SmartCardRestService extends GroupsRestService {

    public deleteSmartCard(eclId: string): void {
        let deleteSmartCardResponse: APIResponse = deleteRequest(EndpointsEnum.SMARTCARD_ENDPOINT.getEndpoint() + eclId);
        if (deleteSmartCardResponse.ok()) {
            System.out.println("Smart card with id: "+ eclId + " has been deleted");
        } else {
            System.out.println("Smart card with id: " + eclId + " has not been deleted. Response status: " + deleteSmartCardResponse);
        }
    }

}
