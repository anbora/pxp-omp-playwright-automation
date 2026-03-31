// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";
import { Location } from "models/job/Location";

export class OpportunitiesAPI_SmokeTest extends BaseRestTest {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private jobModel: JobModel;
    private updateJobModel: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobModel.setId(this.jobId);
        let locations: Array<Location> = this.jobModel.getLocation();
        locations.get(0).setLocationId(this.getPortalConfig(this.portalIndex).getLocationId());
        this.jobModel.setLocation(locations);
        System.out.println(this.jobId);

      this.updateJobModel = this.getObjectFromJson("fixtures/job/UpdatedPublicOpportunityDto.json", JobModel);
        this.updateJobModel.setLocation(locations);
    }

    public getAllJobs(): void {

      this.apiAssertions.assertGreaterThan(this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint()), "totalCount", 0);

    }

    public createNewJobWithUniqueId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public createNewJobWithExistingId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.id: Please pass an unique id, Job with this id already exists");
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
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 404);

    }
}
