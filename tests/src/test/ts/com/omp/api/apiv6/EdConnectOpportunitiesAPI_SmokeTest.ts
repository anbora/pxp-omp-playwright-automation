// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_SmokeTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobModel: JobVacancyModel;
    private updateJobModel: JobVacancyModel;

    public initialize(): void {
      this.updateJobModel = this.getObjectFromJson("fixtures/job/edconnect/UpdatedPublicOpportunityDto.json", JobVacancyModel);
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobModel.setId(this.jobId);
    }

    public getAllJobs(): void {

      this.apiAssertions.assertGreaterThan(this.getRequest(this.endpoint), "total_count", 0);

    }

    public createNewJobWithUniqueId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public createNewJobWithExistingId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.id: Please pass an unique id, Job with this id already exists");
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
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 404);

    }
}
