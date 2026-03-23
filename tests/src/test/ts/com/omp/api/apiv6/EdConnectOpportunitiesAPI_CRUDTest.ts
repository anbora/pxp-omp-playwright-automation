import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_CRUDTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private updateJobModel: JobVacancyModel;
    private jobModel: JobVacancyModel;

    public initialize(): void {
      this.updateJobModel = this.getObjectFromJson("fixtures/job/edconnect/UpdatedPublicOpportunityDto.json", JobVacancyModel);
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobModel.setId(this.jobId);
    }

    public createNewJob(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public updateJob(): void {

      this.apiAssertions.assertStatus(this.patchRequest(this.endpoint + this.jobId, this.updateJobModel), 200);

    }

    public getJobById(): void {
        let response: APIResponse = this.getRequest(this.endpoint + this.jobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "status", "CLOSED");
        this.apiAssertions.assertEqual(response, "contract_type", "PERMANENT");
        this.apiAssertions.assertEqual(response, "company", "UpdatedCompanyName");
        this.apiAssertions.assertEqual(response, "remote", "REMOTE");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(this.endpoint + this.jobId), 404);

    }
}
