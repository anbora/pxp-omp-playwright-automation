// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";

export class OpportunitiesAPI_DetectedLinkedRolesTest extends BaseRestTest {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private readonly title: string = "Java Developer " + UUID.randomUUID().toString().substring(0, 10);
    private jobModel: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobModel.setLinkedRoles([]);
        let jobDescription: JobDescription = this.jobModel.getJobDescriptions().get(0);
        jobDescription.setTitle(this.title);
        this.jobModel.setJobDescriptions(List.of(jobDescription));
        this.jobModel.setId(this.jobId);
    }

    public createNewJob(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public checkLinkedRolesDetection(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), "linkedRoles[0]/linkedRoleStatus", "DETECTED");

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "linkedRoles[0]/linkedRoleStatus", "DETECTED");
        this.apiAssertions.assertNotEqual(response, "linkedRoles[0]/internalId", null);
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 404);

    }
}
