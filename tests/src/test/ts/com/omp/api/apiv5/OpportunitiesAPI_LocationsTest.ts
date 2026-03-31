// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";
import { Location } from "models/job/Location";

export class OpportunitiesAPI_LocationsTest extends BaseRestTest {

    private readonly validLocationId: string = "10101";
    private readonly invalidLocationId: string = "invalidLocationId_" + UUID.randomUUID();
    private readonly firstJobId: string = "restassureJob_1" + UUID.randomUUID();
    private readonly secondJobId: string = "restassureJob_2" + UUID.randomUUID();
    private readonly thirdJobId: string = "restassureJob_3" + UUID.randomUUID();
    private readonly name: string = "testName";
    private readonly city: string = "Warszawa";
    private readonly countryCode: string = "PL";
    private readonly region: string = "malopolskie";
    private readonly postCode: string = "31-237";
    private readonly primary: string = "true";
    private jobWithValidLocationId: JobModel;
    private jobWithNoLocationId: JobModel;
    private jobWithInvalidLocation: JobModel;
    private locationIdValidationMessage: string = "createJob.jobDto.location: with ids: [%s] not found";

    public initialize(): void {
      this.jobWithValidLocationId = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobWithValidLocationId.setId(this.firstJobId);
      this.jobWithNoLocationId = this.getObjectFromJson("fixtures/job/JobVacancyWithLocationDetails.json", JobModel);
        this.jobWithNoLocationId.setId(this.secondJobId);
      this.jobWithInvalidLocation = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobWithInvalidLocation.setId(this.thirdJobId);
        let locationList: Array<Location> = this.jobWithInvalidLocation.getLocation();
        locationList.get(0).setLocationId(this.invalidLocationId);
    }

    public createNewJobWithValidLocationId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithValidLocationId);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyLocationId(): void {
        let response: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "location[0]/locationId", this.validLocationId);
    }

    public createNewJobWithNoLocationId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithNoLocationId);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.secondJobId);
    }

    public checkJobVacancyLocationDetails(): void {
        let response: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.secondJobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "location[0]/this.name", this.name);
        this.apiAssertions.assertEqual(response, "location[0]/this.city", this.city);
        this.apiAssertions.assertEqual(response, "location[0]/this.countryCode", this.countryCode);
        this.apiAssertions.assertEqual(response, "location[0]/this.region", this.region);
        this.apiAssertions.assertEqual(response, "location[0]/this.postCode", this.postCode);
        this.apiAssertions.assertEqual(response, "location[0]/this.primary", this.primary);
    }

    public validateLocationId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobWithInvalidLocation);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", String.format(this.locationIdValidationMessage, this.invalidLocationId));
    }

    public deleteJobs(): void {
        this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 200);
        this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.secondJobId), 200);
    }

    public checkTheRemoval(): void {
        this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.firstJobId), 404);
        this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.secondJobId), 404);
    }
}
