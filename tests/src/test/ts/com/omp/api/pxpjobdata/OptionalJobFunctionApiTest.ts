import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { APIResponse } from "common/testing/playwright";
import { FamilyModel } from "models/family/FamilyModel";

export class OptionalJobFunctionApiTest extends CommonOperationsForApiTest {

    private readonly CREATE_JOB_FAMILY_ENDPOINT: string = "pxp-job-data/v1/job/family";
    private readonly jobFamilyId: string = "jobFamilyId" + UUID.randomUUID();
    private readonly jobFamilyTitle: string = "jobFamilyTitle" + UUID.randomUUID();
    private endpointWithParameter: string = "pxp-job-data/v1/job/family/%s";
    private id: string;
    private familyModel: FamilyModel;
    private token: string;

    public initialize(): void {
      this.token = this.getTokenForTalentDataApi(MicroserviceEnum.PXP_JOB_DATA);
      this.familyModel = this.getObjectFromJson("fixtures/family/JobFamily.json", FamilyModel);
        this.familyModel.setExternalId(this.jobFamilyId);
        this.familyModel.setTitle(this.jobFamilyTitle);
    }

    public shouldCreateJobFamilyWithoutJobFunction(): void {
        let response: APIResponse = this.postRequest(this.CREATE_JOB_FAMILY_ENDPOINT, this.token, this.familyModel);
        System.out.println(response.text());
      this.id = this.apiAssertions.getStringValueFromResponse(response, "data/this.id");

        this.apiAssertions.assertStatus(response, 200);
        //TODO: Add additional assertion from 'familyModel' variable
    }

    public shouldDeleteJobFamily(): void {
        this.waitForResponse(10000);
        let response: APIResponse = this.deleteRequest(this.token, (String.format(this.endpointWithParameter, this.id)));

        this.apiAssertions.assertStatus(response, 200);
    }

    //TODO: Add get method to check that job family is removed
}
