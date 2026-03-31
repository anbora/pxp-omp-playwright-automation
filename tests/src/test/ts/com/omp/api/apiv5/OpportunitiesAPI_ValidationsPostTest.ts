// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";
import { Location } from "models/job/Location";

export class OpportunitiesAPI_ValidationsPostTest extends BaseRestTest {
    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private readonly updatedJobId: string = "restassureJobUpdated" + UUID.randomUUID();
    private readonly wrongEndTime: string = "2014-12-09T10:15:30.00Z";
    private readonly wrongStatus: string = "Fake Status";
    private jobModel: JobModel;
    private updateJobModel: JobModel;
    private jobModelWithWrongLatitude: JobModel;
    private jobModelWithWrongLongitude: JobModel;
    private jobModelWithWrongRemote: JobModel;
    private jobModelWithWrongCountryCode: JobModel;
    private jobModelWithWrongLanguageCode: JobModel;
    private jobModelWithWrongScheduleType: JobModel;
    private jobModelWithWrongDefault: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
      this.jobModelWithWrongLatitude = this.getObjectFromJson("fixtures/job/validations/LatitudeValidationDto.json", JobModel);
      this.jobModelWithWrongLongitude = this.getObjectFromJson("fixtures/job/validations/LongitudeValidationDto.json", JobModel);
      this.jobModelWithWrongRemote = this.getObjectFromJson("fixtures/job/validations/RemoteValidationDto.json", JobModel);
      this.jobModelWithWrongCountryCode = this.getObjectFromJson("fixtures/job/validations/CountryCodeValidationDto.json", JobModel);
      this.jobModelWithWrongLanguageCode = this.getObjectFromJson("fixtures/job/validations/LanguageCodeValidationDto.json", JobModel);
      this.jobModelWithWrongScheduleType = this.getObjectFromJson("fixtures/job/validations/ScheduleTypeValidationDto.json", JobModel);
      this.jobModelWithWrongDefault = this.getObjectFromJson("fixtures/job/validations/IsDefaultValidationDto.json", JobModel);
        this.jobModel.setId(this.jobId);
      this.updateJobModel = this.getObjectFromJson("fixtures/job/UpdatedPublicOpportunityDto.json", JobModel);
        let locations: Array<Location> = this.updateJobModel.getLocation();
        locations.get(0).setLocationId(this.getPortalConfig(this.portalIndex).getLocationId());
        this.updateJobModel.setLocation(locations);
    }

    public createNewJobWithUniqueId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public createNewJobWithExistingId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.id: Please pass an unique id, Job with this id already exists");
    }

    public validateEndDate(): void {
        this.jobModel.setId(this.updatedJobId);
        this.jobModel.setEndDateTime(this.wrongEndTime);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto: endDateTime cannot be earlier than startDateTime");
    }

    public validateLatitude(): void {
        this.jobModelWithWrongLatitude.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongLatitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.location[0].latitude: must be less than or equal to 90");
    }

    public validateLongitude(): void {
        this.jobModelWithWrongLongitude.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongLongitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.location[0].longitude: must be greater than or equal to -180");
    }

    public validateCountryCode(): void {
        this.jobModelWithWrongCountryCode.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongCountryCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.location[0].countryCode: Invalid country code");
    }

    public validateLanguageCode(): void {
        this.jobModelWithWrongLanguageCode.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongLanguageCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.jobDescriptions[0].languageCode: Invalid language");
    }

    public validateDefault(): void {
        this.jobModelWithWrongDefault.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongDefault);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.jobDescriptions: Exactly one job description should be set as default to true");
    }

    public validateJobStatus(): void {
        this.jobModel.setId(this.updatedJobId);
        this.jobModel.setStatus(this.wrongStatus);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "Invalid status. Valid values are case sensitive: OPEN, CLOSED");
    }

    public validateRemote(): void {
        this.jobModelWithWrongRemote.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongRemote);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertContains(response, "[0]/message", "Invalid remote. Valid values are case sensitive:");
        this.apiAssertions.assertContains(response, "[0]/message","ON_SITE");
        this.apiAssertions.assertContains(response, "[0]/message","HYBRID");
        this.apiAssertions.assertContains(response, "[0]/message","REMOTE");
    }

    public validateScheduleType(): void {
        this.jobModelWithWrongScheduleType.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModelWithWrongScheduleType);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertContains(response, "[0]/message", "Invalid scheduleType. Valid values are case sensitive: FULL_TIME, PART_TIME");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId), 404);

    }
}
