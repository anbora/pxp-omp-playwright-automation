// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class EdConnectOpportunitiesAPI_GetAllJobsTest extends EdConnectRestService {

    private readonly endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private readonly queryEndpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT_WITH_QUERY.getEndpoint() + "page=1&limit=9";

    public getAllJobs(): void {
        let response: APIResponse = this.getRequest(this.endpoint);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertGreaterThan(response, "total_count", 0);
        this.apiAssertions.assertArrayGreaterThan(response, "elements", 0);
    }

    public paging(): void {
        let response: APIResponse = this.getRequest(this.queryEndpoint);

        this.apiAssertions.assertArraySizeEquals(response, "elements", 9);
    }
}
