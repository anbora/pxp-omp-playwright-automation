// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_ValidationsPatchTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobModel: JobVacancyModel;
    private updateEndDate: JobVacancyModel;
    private updateCountryCode: JobVacancyModel;
    private updateDefault: JobVacancyModel;
    private updateLanguageCode: JobVacancyModel;
    private updateLatitude: JobVacancyModel;
    private updateLongitude: JobVacancyModel;
    private updateStatus: JobVacancyModel;
    private updateRemote: JobVacancyModel;
    private updateScheduleType: JobVacancyModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
      this.updateEndDate = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateEndDateValidationDto.json", JobVacancyModel);
      this.updateCountryCode = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateCountryCodeValidationDto.json", JobVacancyModel);
      this.updateDefault = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateDefaultValidationDto.json", JobVacancyModel);
      this.updateLanguageCode = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateLanguageCodeValidationDto.json", JobVacancyModel);
      this.updateLatitude = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateLatitudeValidationDto.json", JobVacancyModel);
      this.updateLongitude = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateLongitudeValidationDto.json", JobVacancyModel);
      this.updateStatus = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateStatusValidationDto.json", JobVacancyModel);
      this.updateRemote = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateRemoteValidationDto.json", JobVacancyModel);
      this.updateScheduleType = this.getObjectFromJson("fixtures/job/edconnect/validations/UpdateScheduleTypeValidationDto.json", JobVacancyModel);
        this.jobModel.setId(this.jobId);
    }

    public createNewJobWithUniqueId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public validateEndDate(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateEndDate);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", ": endDateTime cannot be earlier than startDateTime");
    }

    public validateCountryCode(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateCountryCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.location[0].countryCode: Invalid country code");
    }

    public validateDefault(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateDefault);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.jobDescriptions: Exactly one job description should be set as default to true");
    }

    public validateLanguageCode(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateLanguageCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.jobDescriptions[0].languageCode: Invalid language");
    }

    public validateLatitude(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateLatitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.location[0].latitude: must be greater than or equal to -90");
    }

    public validateLongitude(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateLongitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "updateById.jobDto.location[0].longitude: must be less than or equal to 180");
    }

    public validateStatus(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateStatus);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "Invalid status. Valid values are case sensitive: OPEN, CLOSED");
    }

    public validateRemote(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateRemote);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertContains(response, "[0]/message", "Invalid remote. Valid values are case sensitive:");
        this.apiAssertions.assertContains(response, "[0]/message", "ON_SITE");
        this.apiAssertions.assertContains(response, "[0]/message", "HYBRID");
        this.apiAssertions.assertContains(response, "[0]/message", "REMOTE");
    }

    public validateScheduleType(): void {
        let response: APIResponse = this.patchRequest(this.endpoint + this.jobId, this.updateScheduleType);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertContains(response, "[0]/message", "Invalid scheduleType. Valid values are case sensitive: FULL_TIME, PART_TIME");
    }

    public deleteJobById(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 200);

    }

    public checkTheRemoval(): void {

      this.apiAssertions.assertStatus(this.deleteRequest(this.endpoint + this.jobId), 404);

    }
}
