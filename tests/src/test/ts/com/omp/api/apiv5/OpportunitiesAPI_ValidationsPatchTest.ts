// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobModel } from "models/job/JobModel";

export class OpportunitiesAPI_ValidationsPatchTest extends BaseRestTest {
    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private jobModel: JobModel;
    private updateEndDate: JobModel;
    private updateCountryCode: JobModel;
    private updateDefault: JobModel;
    private updateLanguageCode: JobModel;
    private updateLatitude: JobModel;
    private updateLongitude: JobModel;
    private updateStatus: JobModel;
    private updateRemote: JobModel;
    private updateScheduleType: JobModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
      this.updateEndDate = this.getObjectFromJson("fixtures/job/validations/UpdateEndDateValidationDto.json", JobModel);
      this.updateCountryCode = this.getObjectFromJson("fixtures/job/validations/UpdateCountryCodeValidationDto.json", JobModel);
      this.updateDefault = this.getObjectFromJson("fixtures/job/validations/UpdateDefaultValidationDto.json", JobModel);
      this.updateLanguageCode = this.getObjectFromJson("fixtures/job/validations/UpdateLanguageCodeValidationDto.json", JobModel);
      this.updateLatitude = this.getObjectFromJson("fixtures/job/validations/UpdateLatitudeValidationDto.json", JobModel);
      this.updateLongitude = this.getObjectFromJson("fixtures/job/validations/UpdateLongitudeValidationDto.json", JobModel);
      this.updateStatus = this.getObjectFromJson("fixtures/job/validations/UpdateStatusValidationDto.json", JobModel);
      this.updateRemote = this.getObjectFromJson("fixtures/job/validations/UpdateRemoteValidationDto.json", JobModel);
      this.updateScheduleType = this.getObjectFromJson("fixtures/job/validations/UpdateScheduleTypeValidationDto.json", JobModel);
        this.jobModel.setId(this.jobId);
    }

    public createNewJobWithUniqueId(): void {
        let response: APIResponse = this.postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public validateEndDate(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateEndDate);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", ": endDateTime cannot be earlier than startDateTime");
    }

    public validateCountryCode(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateCountryCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.location[0].countryCode: Invalid country code");
    }

    public validateDefault(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateDefault);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.jobDescriptions: Exactly one job description should be set as default to true");
    }

    public validateLanguageCode(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateLanguageCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.jobDescriptions[0].languageCode: Invalid language");
    }

    public validateLatitude(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateLatitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.location[0].latitude: must be greater than or equal to -90");
    }

    public validateLongitude(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateLongitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.location[0].longitude: must be less than or equal to 180");
    }

    public validateStatus(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateStatus);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "Invalid status. Valid values are case sensitive: OPEN, CLOSED");
    }

    public validateRemote(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateRemote);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertContains(response, "[0]/message", "Invalid remote. Valid values are case sensitive:");
        this.apiAssertions.assertContains(response,"[0]/message", "ON_SITE");
        this.apiAssertions.assertContains(response,"[0]/message", "HYBRID");
        this.apiAssertions.assertContains(response,"[0]/message", "REMOTE");
    }

    public validateScheduleType(): void {
        let response: APIResponse = this.patchRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + this.jobId, this.updateScheduleType);

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
