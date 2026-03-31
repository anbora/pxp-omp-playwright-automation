// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class OpportunitiesAPI_FilteringByStartDateTest extends BaseRestTest {

    private endpointWithParameter: string = "/api/developer/v5/opportunities?this.startDateTime=%s";
    private startDateTime: string = "2023-01-01T00:00:00.00";
    private totalVacancies: number;
    private filteredVacancies: number;

    public filteringByStartDate(): void {
        let allJobsResponse: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint());
      this.totalVacancies = this.apiAssertions.getIntValueFromResponse(allJobsResponse, "totalCount");

        let openJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.startDateTime));
      this.filteredVacancies = this.apiAssertions.getIntValueFromResponse(openJobsResponse, "totalCount");

        this.apiAssertions.assertTrue(this.totalVacancies > this.filteredVacancies);
    }
}
