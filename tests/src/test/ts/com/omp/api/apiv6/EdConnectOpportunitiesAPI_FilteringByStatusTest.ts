import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class EdConnectOpportunitiesAPI_FilteringByStatusTest extends EdConnectRestService {

    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private queryEndpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT_WITH_QUERY.getEndpoint();
    private endpointWithParameter: string = this.queryEndpoint + "status=%s";
    private statusOpen: string = "OPEN";
    private statusClosed: string = "CLOSED";
    private totalVacancies: number;
    private openVacancies: number;
    private closedVacancies: number;

    public filteringByStatus(): void {
        let allJobsResponse: APIResponse = this.getRequest(this.endpoint);
      this.totalVacancies = this.apiAssertions.getIntValueFromResponse(allJobsResponse, "total_count");

        let openJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.statusOpen));
      this.openVacancies = this.apiAssertions.getIntValueFromResponse(openJobsResponse, "total_count");

        let closedJobsResponse: APIResponse = this.getRequest(String.format(this.endpointWithParameter, this.statusClosed));
      this.closedVacancies = this.apiAssertions.getIntValueFromResponse(closedJobsResponse, "total_count");

        this.apiAssertions.assertTrue(this.totalVacancies > this.openVacancies);
        this.apiAssertions.assertTrue(this.totalVacancies > this.closedVacancies);
        this.apiAssertions.assertTrue(this.openVacancies + this.closedVacancies == this.totalVacancies);
    }
}
