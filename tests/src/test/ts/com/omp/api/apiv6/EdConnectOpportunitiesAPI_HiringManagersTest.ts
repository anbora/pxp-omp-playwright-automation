import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { HiringManagers } from "models/edconnect/HiringManagers";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";
import { UserModel } from "models/user/UserModel";

export class EdConnectOpportunitiesAPI_HiringManagersTest extends EdConnectRestService {

    private readonly firstJobId: string = "restassureJob1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob2" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private hiringManagerUserId: string;
    private hiringManagerUser: UserModel;
    private jobWithValidHiringManager: JobVacancyModel;
    private jobWithInvalidHiringManager: JobVacancyModel;

    public initialize(): void {
      this.hiringManagerUser = this.createUser();
      this.hiringManagerUserId = this.hiringManagerUser.externalId;
      this.jobWithValidHiringManager = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithHiringManagers.json", JobVacancyModel);
      this.jobWithInvalidHiringManager = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithHiringManagers.json", JobVacancyModel);
        this.jobWithInvalidHiringManager.setId(this.secondJobId);
        let validHiringManagersList: Array<HiringManagers> = this.jobWithValidHiringManager.getHiring_managers();
        validHiringManagersList.get(0).setExternal_id(this.hiringManagerUserId);
        this.jobWithValidHiringManager.setId(this.firstJobId);
        this.jobWithValidHiringManager.setHiring_managers(validHiringManagersList);
    }

    public createNewJobWithHiringManager(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithValidHiringManager);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyHiringManagers(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(this.endpoint + this.firstJobId), "hiring_managers[0]/external_id", this.hiringManagerUserId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "hiring_managers[0]/external_id", this.hiringManagerUserId);
        this.apiAssertions.assertTrue(response, "hiring_managers[0]/visible");
    }

    public validateHiringManagerId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithInvalidHiringManager);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.hiringManagers: Invalid manager user");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 404);

    }

    public deleteUser(): void {

      this.deleteUser(this.hiringManagerUser);

    }
}
