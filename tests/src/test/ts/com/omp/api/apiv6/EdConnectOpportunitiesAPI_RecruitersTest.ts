// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";
import { Recruiters } from "models/edconnect/Recruiters";
import { UserModel } from "models/user/UserModel";

export class EdConnectOpportunitiesAPI_RecruitersTest extends EdConnectRestService {

    private readonly firstJobId: string = "restassureJob1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob2" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private recruiterUserId: string;
    private recruiterUser: UserModel;
    private jobWithValidRecruiter: JobVacancyModel;
    private jobWithInvalidRecruiter: JobVacancyModel;

    public initialize(): void {
      this.recruiterUser = this.createUser();
      this.recruiterUserId = this.recruiterUser.externalId;
      this.jobWithValidRecruiter = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithRecruiters.json", JobVacancyModel);
      this.jobWithInvalidRecruiter = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithRecruiters.json", JobVacancyModel);
        this.jobWithInvalidRecruiter.setId(this.secondJobId);
        let validRecruitersList: Array<Recruiters> = this.jobWithValidRecruiter.getRecruiters();
        validRecruitersList.get(0).setExternal_id(this.recruiterUserId);
        this.jobWithValidRecruiter.setId(this.firstJobId);
        this.jobWithValidRecruiter.setRecruiters(validRecruitersList);
    }

    public createNewJobWithRecruiter(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithValidRecruiter);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyRecruiters(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(this.endpoint + this.firstJobId), "recruiters[0]/external_id", this.recruiterUserId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "recruiters[0]/external_id", this.recruiterUserId);
        this.apiAssertions.assertTrue(response, "recruiters[0]/visible");
    }

    public validateRecruiterId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithInvalidRecruiter);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.recruiters: Invalid recruiter user");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 404);

    }

    public deleteUser(): void {

      this.deleteUser(this.recruiterUser);

    }
}
