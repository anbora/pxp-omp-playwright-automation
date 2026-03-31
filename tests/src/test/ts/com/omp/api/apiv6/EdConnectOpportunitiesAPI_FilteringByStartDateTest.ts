// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class EdConnectOpportunitiesAPI_FilteringByStartDateTest extends EdConnectRestService {

    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private queryEndpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT_WITH_QUERY.getEndpoint();
    private endpointWithParameter: string = this.queryEndpoint + "start_date_time=%s";
    private startDateTime: string = "2023-01-01T00:00:00.00";
    private totalVacancies: number;
    private filteredVacancies: number;

    public filteringByStartDate(): void {
        let allJobsResponse: APIResponse = this.getRequest(this.endpoint);
      this.totalVacancies = this.apiAssertions.getIntValueFromResponse(allJobsResponse, "total_count");

        let openJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.startDateTime));
      this.filteredVacancies = this.apiAssertions.getIntValueFromResponse(openJobsResponse, "total_count");

        this.apiAssertions.assertTrue(this.totalVacancies > this.filteredVacancies);
    }
}
