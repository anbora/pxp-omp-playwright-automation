import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_FilteringBySourceTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private readonly testSource: string = "testSource" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private queryEndpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT_WITH_QUERY.getEndpoint();
    private endpointWithParameter: string = this.queryEndpoint + "source=%s";
    private jobModel: JobVacancyModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobModel.setId(this.jobId);
        this.jobModel.setSource(this.testSource);
    }

    public createNewJobWithUniqueSource(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public filteringBySource(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(String.format(this.endpointWithParameter, this.testSource)), "elements[0]/source", this.testSource);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "total_count", 1);
        this.apiAssertions.assertArraySizeEquals(response, "elements", 1);
        this.apiAssertions.assertEqual(response, "elements[0]/source", this.testSource);
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(this.endpoint + this.jobId), 404);

    }
}
