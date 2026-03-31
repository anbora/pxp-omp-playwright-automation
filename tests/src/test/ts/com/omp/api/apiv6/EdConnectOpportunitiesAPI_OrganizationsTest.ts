// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";
import { Organizations } from "models/edconnect/Organizations";

export class EdConnectOpportunitiesAPI_OrganizationsTest extends EdConnectRestService {

    private readonly firstJobId: string = "restassureJob1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob2" + UUID.randomUUID();
    private readonly thirdJobId: string = "restassureJob3" + UUID.randomUUID();
    private readonly externalId: string = "auto-test-org";
    private readonly wrongExternalId: string = "this.externalId" + UUID.randomUUID();
    private readonly organizationTypeId: string = "DIVISION";
    private readonly wrongOrganizationTypeId: string = "orgTypeId" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobWithValidOrganization: JobVacancyModel;
    private jobWithInvalidOrganizationExternalId: JobVacancyModel;
    private jobWithInvalidOrganizationTypeId: JobVacancyModel;
    private externalIdValidationMessage: string = "createJob.jobDto.organization: Organizations with id: [%s] not found";
    private organizationTypeIdValidationMessage: string = "createJob.jobDto.organization: Organization type id [%s] is incorrect";

    public initialize(): void {
      this.jobWithValidOrganization = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithOrganization.json", JobVacancyModel);
        this.jobWithValidOrganization.setId(this.firstJobId);
        let validOrganizationsList: Array<Organizations> = this.jobWithValidOrganization.getOrganizations();
        validOrganizationsList.get(0).setExternal_id(this.externalId);
        validOrganizationsList.get(0).setOrganization_type_id(this.organizationTypeId);

      this.jobWithInvalidOrganizationExternalId = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithOrganization.json", JobVacancyModel);
        this.jobWithInvalidOrganizationExternalId.setId(this.secondJobId);
        let invalidOrgExternalIdList: Array<Organizations> = this.jobWithInvalidOrganizationExternalId.getOrganizations();
        invalidOrgExternalIdList.get(0).setExternal_id(this.wrongExternalId);
        invalidOrgExternalIdList.get(0).setOrganization_type_id(this.organizationTypeId);

      this.jobWithInvalidOrganizationTypeId = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithOrganization.json", JobVacancyModel);
        this.jobWithInvalidOrganizationTypeId.setId(this.thirdJobId);
        let invalidOrgTypeIdList: Array<Organizations> = this.jobWithInvalidOrganizationTypeId.getOrganizations();
        invalidOrgTypeIdList.get(0).setExternal_id(this.externalId);
        invalidOrgTypeIdList.get(0).setOrganization_type_id(this.wrongOrganizationTypeId);
    }

    public createNewJobWithOrganization(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithValidOrganization);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyOrganization(): void {
        let response: APIResponse = this.repeatRequestUntil(() => this.getRequest(this.endpoint + this.firstJobId), "organizations[0]/external_id", this.externalId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "organizations[0]/organization_type_id", this.organizationTypeId);
        this.apiAssertions.assertEqual(response, "organizations[0]/external_id", this.externalId);
    }

    public validateOrganizationExternalId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithInvalidOrganizationExternalId);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", String.format(this.externalIdValidationMessage, this.wrongExternalId));
    }

    public validateOrganizationTypeId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithInvalidOrganizationTypeId);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", String.format(this.organizationTypeIdValidationMessage, this.wrongOrganizationTypeId));
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 404);

    }
}
