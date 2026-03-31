// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_DeclaredLinkedRolesTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobModel: JobVacancyModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobVacancyModel);
        this.jobModel.setId(this.jobId);
    }

    public createNewJob(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public checkLinkedRolesAndInheritance(): void {
        let response: APIResponse = this.getRequest(this.endpoint + this.jobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "linked_roles[0]/linked_role_status", "DECLARED");
        this.apiAssertions.assertNotEqual(response, "linked_roles[0]/internal_id", null);
        this.apiAssertions.assertEqual(response, "linked_roles[0]/external_id", "wtj7cbe5-2bfd-42b0-8560-ba87ae436e69");
        this.apiAssertions.assertEqual(response, "level", "MID_SENIOR");
        this.apiAssertions.assertEqual(response, "career_track", "INDIVIDUAL_CONTRIBUTOR");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(this.endpoint + this.jobId), 404);

    }
}
