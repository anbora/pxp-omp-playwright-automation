// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";
import { Locations } from "models/edconnect/Locations";

export class EdConnectOpportunitiesAPI_LocationsTest extends EdConnectRestService {

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
    private jobWithValidLocationId: JobVacancyModel;
    private jobWithNoLocationId: JobVacancyModel;
    private jobWithInvalidLocation: JobVacancyModel;
    private locationIdValidationMessage: string = "createJob.jobDto.location: with ids: [%s] not found";
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();

    public initialize(): void {
      this.jobWithValidLocationId = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobWithValidLocationId.setId(this.firstJobId);
      this.jobWithNoLocationId = this.getObjectFromJson("fixtures/job/edconnect/JobVacancyWithLocationDetails.json", JobVacancyModel);
        this.jobWithNoLocationId.setId(this.secondJobId);
      this.jobWithInvalidLocation = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
        this.jobWithInvalidLocation.setId(this.thirdJobId);
        let locationsList: Array<Locations> = this.jobWithInvalidLocation.getLocations();
        locationsList.get(0).setLocation_id(this.invalidLocationId);
    }

    public createNewJobWithValidLocationId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithValidLocationId);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.firstJobId);
    }

    public checkJobVacancyLocationId(): void {
        let response: APIResponse = this.getRequest(this.endpoint + this.firstJobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "locations[0]/location_id", this.validLocationId);
    }

    public createNewJobWithNoLocationId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithNoLocationId);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.secondJobId);
    }

    public checkJobVacancyLocationDetails(): void {
        let response: APIResponse = this.getRequest(this.endpoint + this.secondJobId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "locations[0]/this.name", this.name);
        this.apiAssertions.assertEqual(response, "locations[0]/this.city", this.city);
        this.apiAssertions.assertEqual(response, "locations[0]/country_code", this.countryCode);
        this.apiAssertions.assertEqual(response, "locations[0]/this.region", this.region);
        this.apiAssertions.assertEqual(response, "locations[0]/post_code", this.postCode);
        this.apiAssertions.assertEqual(response, "locations[0]/this.primary", this.primary);
        this.apiAssertions.assertNotEqual(response,"locations[0]/latitude", "null");
        this.apiAssertions.assertNotEqual(response,"locations[0]/longitude", "null");
    }

    public validateLocationId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobWithInvalidLocation);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", String.format(this.locationIdValidationMessage, this.invalidLocationId));
    }

    public deleteJobs(): void {
        this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 200);
        this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.secondJobId), 200);
    }

    public checkTheRemoval(): void {
        this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.firstJobId), 404);
        this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.secondJobId), 404);
    }
}
