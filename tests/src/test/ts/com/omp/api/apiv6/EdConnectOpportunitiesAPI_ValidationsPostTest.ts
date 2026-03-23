import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_ValidationsPostTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private readonly updatedJobId: string = "restassureJobUpdated" + UUID.randomUUID();
    private readonly wrongEndTime: string = "2014-12-09T10:15:30.00Z";
    private readonly wrongStatus: string = "Fake Status";
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobModel: JobVacancyModel;
    private jobModelWithWrongLatitude: JobVacancyModel;
    private jobModelWithWrongLongitude: JobVacancyModel;
    private jobModelWithWrongRemote: JobVacancyModel;
    private jobModelWithWrongCountryCode: JobVacancyModel;
    private jobModelWithWrongLanguageCode: JobVacancyModel;
    private jobModelWithWrongScheduleType: JobVacancyModel;
    private jobModelWithWrongDefault: JobVacancyModel;

    public initialize(): void {
      this.jobModel = this.getObjectFromJson("fixtures/job/edconnect/PublicOpportunityDto.json", JobVacancyModel);
      this.jobModelWithWrongLatitude = this.getObjectFromJson("fixtures/job/edconnect/validations/LatitudeValidationDto.json", JobVacancyModel);
      this.jobModelWithWrongLongitude = this.getObjectFromJson("fixtures/job/edconnect/validations/LongitudeValidationDto.json", JobVacancyModel);
      this.jobModelWithWrongRemote = this.getObjectFromJson("fixtures/job/edconnect/validations/RemoteValidationDto.json", JobVacancyModel);
      this.jobModelWithWrongCountryCode = this.getObjectFromJson("fixtures/job/edconnect/validations/CountryCodeValidationDto.json", JobVacancyModel);
      this.jobModelWithWrongLanguageCode = this.getObjectFromJson("fixtures/job/edconnect/validations/LanguageCodeValidationDto.json", JobVacancyModel);
      this.jobModelWithWrongScheduleType = this.getObjectFromJson("fixtures/job/edconnect/validations/ScheduleTypeValidationDto.json", JobVacancyModel);
      this.jobModelWithWrongDefault = this.getObjectFromJson("fixtures/job/edconnect/validations/IsDefaultValidationDto.json", JobVacancyModel);
        this.jobModel.setId(this.jobId);
    }

    public createNewJobWithUniqueId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 201);
        this.apiAssertions.assertEqual(response, "id", this.jobId);
    }

    public createNewJobWithExistingId(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.id: Please pass an unique id, Job with this id already exists");
    }

    public validateEndDate(): void {
        this.jobModel.setId(this.updatedJobId);
        this.jobModel.setEnd_date_time(this.wrongEndTime);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto: endDateTime cannot be earlier than startDateTime");
    }

    public validateLatitude(): void {
        this.jobModelWithWrongLatitude.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongLatitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.location[0].latitude: must be less than or equal to 90");
    }

    public validateLongitude(): void {
        this.jobModelWithWrongLongitude.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongLongitude);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.location[0].longitude: must be greater than or equal to -180");
    }

    public validateCountryCode(): void {
        this.jobModelWithWrongCountryCode.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongCountryCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.location[0].countryCode: Invalid country code");
    }

    public validateLanguageCode(): void {
        this.jobModelWithWrongLanguageCode.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongLanguageCode);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.jobDescriptions[0].languageCode: Invalid language");
    }

    public validateDefault(): void {
        this.jobModelWithWrongDefault.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongDefault);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.jobDescriptions: Exactly one job description should be set as default to true");
    }

    public validateJobStatus(): void {
        this.jobModel.setId(this.updatedJobId);
        this.jobModel.setStatus(this.wrongStatus);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModel);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "Invalid status. Valid values are case sensitive: OPEN, CLOSED");
    }

    public validateRemote(): void {
        this.jobModelWithWrongRemote.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongRemote);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertContains(response, "[0]/message", "Invalid remote. Valid values are case sensitive:");
        this.apiAssertions.assertContains(response, "[0]/message", "ON_SITE");
        this.apiAssertions.assertContains(response, "[0]/message", "HYBRID");
        this.apiAssertions.assertContains(response, "[0]/message", "REMOTE");
    }

    public validateScheduleType(): void {
        this.jobModelWithWrongScheduleType.setId(this.updatedJobId);

        let response: APIResponse = this.postRequest(this.endpoint, this.jobModelWithWrongScheduleType);

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
