import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";

export class OpportunitiesAPI_DeclaredLinkedRolesTest extends BaseRestTest {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private jobModel: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        this.jobModel.setId(this.jobId);
    }

    public createNewJob(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public checkLinkedRolesAndInheritance(): void {
        let response: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "linkedRoles[0]/linkedRoleStatus", "DECLARED");
        this.apiAssertions.assertNotEqual(response, "linkedRoles[0]/internalId", null);
        this.apiAssertions.assertEqual(response, "linkedRoles[0]/externalId", "wtj7cbe5-2bfd-42b0-8560-ba87ae436e69");
        this.apiAssertions.assertEqual(response, "level", "MID_SENIOR");
        this.apiAssertions.assertEqual(response, "careerTrack", "INDIVIDUAL_CONTRIBUTOR");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 404);

    }
}
