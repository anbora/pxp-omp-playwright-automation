// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class OpportunitiesAPI_FilteringByStatusTest extends BaseRestTest {

    private endpointWithParameter: string = "/api/developer/v5/opportunities?status=%s";
    private statusOpen: string = "OPEN";
    private statusClosed: string = "CLOSED";
    private totalVacancies: number;
    private openVacancies: number;
    private closedVacancies: number;

    public filteringByStatus(): void {
        let allJobsResponse: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint());
      this.totalVacancies = this.apiAssertions.getIntValueFromResponse(allJobsResponse, "totalCount");

        let openJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.statusOpen));
      this.openVacancies = this.apiAssertions.getIntValueFromResponse(openJobsResponse, "totalCount");

        let closedJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.statusClosed));
      this.closedVacancies = this.apiAssertions.getIntValueFromResponse(closedJobsResponse, "totalCount");

        this.apiAssertions.assertTrue(this.totalVacancies > this.openVacancies);
        this.apiAssertions.assertTrue(this.totalVacancies > this.closedVacancies);
        this.apiAssertions.assertTrue(this.openVacancies + this.closedVacancies == this.totalVacancies);
    }
}
