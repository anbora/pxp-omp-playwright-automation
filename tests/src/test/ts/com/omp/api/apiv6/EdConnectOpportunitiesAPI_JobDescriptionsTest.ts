import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { JobVacancyModel } from "models/edconnect/JobVacancyModel";

export class EdConnectOpportunitiesAPI_JobDescriptionsTest extends EdConnectRestService {

    private readonly jobId: string = "restassureJob" + UUID.randomUUID();
    private endpoint: string = EndpointsEnum.ED_CONNECT_JOB_VACANCIES_ENDPOINT.getEndpoint();
    private jobVacancyWithTwoDescriptionsInTheSameLanguage: JobVacancyModel;

    public initialize(): void {
      this.jobVacancyWithTwoDescriptionsInTheSameLanguage = this.getObjectFromJson("fixtures/job/edconnect/validations/JobDescriptionLanguageValidation.json", JobVacancyModel);
        this.jobVacancyWithTwoDescriptionsInTheSameLanguage.setId(this.jobId);
    }

    public validateJobVacancyWithTwoDescriptionsInTheSameLanguage(): void {
        let response: APIResponse = this.postRequest(this.endpoint, this.jobVacancyWithTwoDescriptionsInTheSameLanguage);

        this.apiAssertions.assertStatus(response, 400);
        this.apiAssertions.assertEqual(response, "[0]/message", "createJob.jobDto.jobDescriptions: Multiple job descriptions for the same language not allowed");
    }
}
