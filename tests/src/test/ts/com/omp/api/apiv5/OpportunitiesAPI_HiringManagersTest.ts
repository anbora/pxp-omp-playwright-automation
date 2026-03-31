// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { HiringManagers } from "models/job/HiringManagers";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";

export class OpportunitiesAPI_HiringManagersTest extends BaseRestTest {

    private readonly firstJobId: string = "restassureJob1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob2" + UUID.randomUUID();
    private hiringManagerUserId: string;
    private hiringManagerUser: UserModel;
    private jobWithValidHiringManager: JobModel;
    private jobWithInvalidHiringManager: JobModel;

    public initialize(): void {
      this.hiringManagerUser = this.createUser();
      this.hiringManagerUserId = this.hiringManagerUser.externalId;
      this.jobWithValidHiringManager = this.getObjectFromJson("fixtures/job/JobVacancyWithHiringManagers.json", JobModel);
      this.jobWithInvalidHiringManager = this.getObjectFromJson("fixtures/job/JobVacancyWithHiringManagers.json", JobModel);
        this.jobWithInvalidHiringManager.setId(this.secondJobId);
        let validHiringManagersList: Array<HiringManagers> = this.jobWithValidHiringManager.getHiringManagers();
        validHiringManagersList.get(0).setExternalId(this.hiringManagerUserId);
        this.jobWithValidHiringManager.setId(this.firstJobId);
        this.jobWithValidHiringManager.setHiringManagers(validHiringManagersList);
    }

    public createNewJobWithHiringManager(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithValidHiringManager);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyHiringManagers(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), "hiringManagers[0]/externalId", this.hiringManagerUserId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "hiringManagers[0]/externalId", this.hiringManagerUserId);
        this.apiAssertions.assertTrue(response, "hiringManagers[0]/visible");
    }

    public validateHiringManagerId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithInvalidHiringManager);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.hiringManagers: Invalid manager user");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 404);

    }

    public deleteUser(): void {

      this.deleteUser(this.hiringManagerUser);

    }
}
