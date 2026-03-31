// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";
import { Location } from "models/job/Location";

export class OpportunitiesAPI_CRUDTest extends BaseRestTest {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private jobModel: JobModel;
    private updateJobModel: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobModel.setId(this.jobId);

      this.updateJobModel = this.getObjectFromJson("fixtures/job/UpdatedPublicOpportunityDto.json", JobModel);
        let locations: Array<Location> = this.updateJobModel.getLocation();
        locations.get(0).setLocationId(this.getPortalConfig(this.portalIndex).getLocationId());
        this.updateJobModel.setLocation(locations);
    }

    public createNewJob(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public updateJob(): void {

      this.apiAssertions.assertStatus(this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateJobModel), 200);

    }

    public getJobById(): void {
        let response: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "status", "CLOSED");
        this.apiAssertions.assertEqual(response, "contractType", "PERMANENT");
        this.apiAssertions.assertEqual(response, "company", "UpdatedCompanyName");
        this.apiAssertions.assertEqual(response, "remote", "REMOTE");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 404);

    }
}
