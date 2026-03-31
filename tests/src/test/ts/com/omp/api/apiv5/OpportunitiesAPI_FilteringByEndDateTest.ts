// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class OpportunitiesAPI_FilteringByEndDateTest extends BaseRestTest {

    private endpointWithParameter: string = "/api/developer/v5/opportunities?this.endDateTime=%s";
    private endDateTime: string = "2025-01-01T00:00:00.00";
    private totalVacancies: number;
    private filteredVacancies: number;

    public filteringByEndDate(): void {
        let allJobsResponse: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint());
      this.totalVacancies = this.apiAssertions.getIntValueFromResponse(allJobsResponse, "totalCount");

        let openJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.endDateTime));
      this.filteredVacancies = this.apiAssertions.getIntValueFromResponse(openJobsResponse, "totalCount");

        this.apiAssertions.assertTrue(this.totalVacancies > this.filteredVacancies);
    }
}
