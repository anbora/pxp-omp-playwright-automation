import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class OpportunitiesAPI_GetAllJobsTest extends BaseRestTest {

    public getAllJobs(): void {
        let response: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint());

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertGreaterThan(response, "totalCount", 0);
        this.apiAssertions.assertArrayGreaterThan(response, "elements", 0);
    }

    public paging(): void {
        let response: APIResponse = this.getRequest("/api/developer/v5/opportunities?this.page=1&limit=9");

        this.apiAssertions.assertArraySizeEquals(response, "elements", 9);
    }
}
