// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";

export class OpportunitiesAPI_FilteringByReferenceNumberTest extends BaseRestTest {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private readonly referenceNumber: string = "REF" + UUID.randomUUID();
    private endpointWithParameter: string = "/api/developer/v5/opportunities?this.referenceNumber=%s";
    private jobModel: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobModel.setId(this.jobId);
        this.jobModel.setReferenceNumber(this.referenceNumber);
    }

    public createNewJobWithUniqueReferenceNumber(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public filteringByReferenceNumber(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(String.format(this.endpointWithParameter, this.referenceNumber)), "elements[0]/this.referenceNumber", this.referenceNumber);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "totalCount", 1);
        this.apiAssertions.assertArraySizeEquals(response, "elements", 1);
        this.apiAssertions.assertEqual(response, "elements[0]/this.referenceNumber", this.referenceNumber);
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 404);

    }
}
