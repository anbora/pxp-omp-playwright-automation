// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { Disposition } from "models/edconnect/Disposition";
import { Dispositions } from "models/edconnect/Dispositions";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";
import { UserModel } from "models/user/UserModel";

export class EdConnectOpportunitiesAPI_DispositionsTest extends EdConnectRestService {

    private jobId: string = "restassureJob" + UUID.randomUUID();
    private jobEndpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private dispositionsEndpoint: string = EndpointsEnum.DISPOSITIONS_ENDPOINT.getEndpoint();
    private externalUserId: string;
    private user: UserModel;
    private jobVacancy: JobVacancyModel;
    private dispositions: Dispositions;

    public initialize(): void {
      this.user = this.createUser();
      this.externalUserId = this.user.externalId;
      this.jobVacancy = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobVacancy.setId(this.jobId);
      this.dispositions = this.getObjectFromJson("fixtures/disposition/Dispositions.json", Dispositions);
        let dispositionsList: Array<Disposition> = this.dispositions.getDispositions();
        dispositionsList.get(0).setUser_id("EXT-" + this.externalUserId);
        dispositionsList.get(0).setOpportunity_id(this.jobId);
        dispositionsList.get(0).setApplication_status("HIRED");
    }

    public createNewJobVacancy(): void {
        let response: APIResponse = this.postRequest(this.jobEndpoint, this.jobVacancy);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public sendDispositionStatus(): void {
        let response: APIResponse = this.postRequest(this.dispositionsEndpoint, this.dispositions);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "success_dispositions_count", 1);
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.jobEndpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.jobEndpoint + this.jobId), 404);

    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
