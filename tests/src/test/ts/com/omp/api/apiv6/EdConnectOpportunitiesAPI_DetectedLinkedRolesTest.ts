import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobDescription } from "models/edconnect/JobDescription";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_DetectedLinkedRolesTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private readonly title: string = "Java Developer " + UUID.randomUUID().toString().substring(0, 10);
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobModel: JobVacancyModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobModel.setLinked_roles([]);
        let jobDescription: JobDescription = this.jobModel.getJob_descriptions().get(0);
        jobDescription.setTitle(this.title);
        this.jobModel.setJob_descriptions(List.of(jobDescription));
        this.jobModel.setId(this.jobId);
    }

    public createNewJob(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public checkLinkedRolesDetection(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(this.endpoint + this.jobId), "linked_roles[0]/linked_role_status", "DETECTED");

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "linked_roles[0]/linked_role_status", "DETECTED");
        this.apiAssertions.assertNotEqual(response, "linked_roles[0]/internal_id", null);
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.getRequest(this.endpoint + this.jobId), 404);

    }
}
