// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";
import { Organization } from "models/job/Organization";

export class OpportunitiesAPI_OrganizationTest extends BaseRestTest {

    private readonly firstJobId: string = "restassureJob1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob2" + UUID.randomUUID();
    private readonly thirdJobId: string = "restassureJob3" + UUID.randomUUID();
    private readonly externalId: string = "auto-test-org";
    private readonly wrongExternalId: string = "this.externalId" + UUID.randomUUID();
    private readonly organizationTypeId: string = "DIVISION";
    private readonly wrongOrganizationTypeId: string = "orgTypeId" + UUID.randomUUID();
    private jobWithValidOrganization: JobModel;
    private jobWithInvalidOrganizationExternalId: JobModel;
    private jobWithInvalidOrganizationTypeId: JobModel;
    private externalIdValidationMessage: string = "createJob.jobDto.organization: Organizations with id: [%s] not found";
    private organizationTypeIdValidationMessage: string = "createJob.jobDto.organization: Organization type id [%s] is incorrect";

    public initialize(): void {
      this.jobWithValidOrganization = this.getObjectFromJson("fixtures/job/JobVacancyWithOrganization.json", JobModel);
        this.jobWithValidOrganization.setId(this.firstJobId);
        let validOrganizationList: Array<Organization> = this.jobWithValidOrganization.getOrganization();
        validOrganizationList.get(0).setExternalId(this.externalId);
        validOrganizationList.get(0).setOrganizationTypeId(this.organizationTypeId);

      this.jobWithInvalidOrganizationExternalId = this.getObjectFromJson("fixtures/job/JobVacancyWithOrganization.json", JobModel);
        this.jobWithInvalidOrganizationExternalId.setId(this.secondJobId);
        let invalidOrgExternalIdList: Array<Organization> = this.jobWithInvalidOrganizationExternalId.getOrganization();
        invalidOrgExternalIdList.get(0).setExternalId(this.wrongExternalId);
        invalidOrgExternalIdList.get(0).setOrganizationTypeId(this.organizationTypeId);

      this.jobWithInvalidOrganizationTypeId = this.getObjectFromJson("fixtures/job/JobVacancyWithOrganization.json", JobModel);
        this.jobWithInvalidOrganizationTypeId.setId(this.thirdJobId);
        let invalidOrgTypeIdList: Array<Organization> = this.jobWithInvalidOrganizationTypeId.getOrganization();
        invalidOrgTypeIdList.get(0).setExternalId(this.externalId);
        invalidOrgTypeIdList.get(0).setOrganizationTypeId(this.wrongOrganizationTypeId);
    }

    public createNewJobWithOrganization(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithValidOrganization);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyOrganization(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), "organization[0]/this.externalId", this.externalId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "organization[0]/this.organizationTypeId", this.organizationTypeId);
        this.apiAssertions.assertEqual(response, "organization[0]/this.externalId", this.externalId);
    }

    public validateOrganizationExternalId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithInvalidOrganizationExternalId);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", String.format(this.externalIdValidationMessage, this.wrongExternalId));
    }

    public validateOrganizationTypeId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithInvalidOrganizationTypeId);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", String.format(this.organizationTypeIdValidationMessage, this.wrongOrganizationTypeId));
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 404);

    }
}
