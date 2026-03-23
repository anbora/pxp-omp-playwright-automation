import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";
import { Recruiters } from "models/job/Recruiters";
import { UserModel } from "models/user/UserModel";

export class OpportunitiesAPI_RecruitersTest extends BaseRestTest {

    private readonly firstJobId: string = "restassureJob1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob2" + UUID.randomUUID();
    private recruiterUserId: string;
    private recruiterUser: UserModel;
    private jobWithValidRecruiter: JobModel;
    private jobWithInvalidRecruiter: JobModel;

    public initialize(): void {
      this.recruiterUser = this.createUser();
      this.recruiterUserId = this.recruiterUser.externalId;
      this.jobWithValidRecruiter = this.getObjectFromJson("fixtures/job/JobVacancyWithRecruiters.json", JobModel);
      this.jobWithInvalidRecruiter = this.getObjectFromJson("fixtures/job/JobVacancyWithRecruiters.json", JobModel);
        this.jobWithInvalidRecruiter.setId(this.secondJobId);
        let validRecruitersList: Array<Recruiters> = this.jobWithValidRecruiter.getRecruiters();
        validRecruitersList.get(0).setExternalId(this.recruiterUserId);
        this.jobWithValidRecruiter.setId(this.firstJobId);
        this.jobWithValidRecruiter.setRecruiters(validRecruitersList);
    }

    public createNewJobWithRecruiter(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithValidRecruiter);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyRecruiters(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), "recruiters[0]/externalId", this.recruiterUserId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "recruiters[0]/externalId", this.recruiterUserId);
        this.apiAssertions.assertTrue(response, "recruiters[0]/visible");
    }

    public validateRecruiterId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithInvalidRecruiter);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.recruiters: Invalid recruiter user");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 404);

    }

    public deleteUser(): void {

      this.deleteUser(this.recruiterUser);

    }
}
