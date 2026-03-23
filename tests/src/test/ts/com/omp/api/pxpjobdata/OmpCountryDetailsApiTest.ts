import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { APIResponse } from "common/testing/playwright";

export class OmpCountryDetailsApiTest extends CommonOperationsForApiTest {

    private token: string;
    private endpoint: string = "pxp-job-data/v1/lovs?groupId=hr-country-lov";

    public initialize(): void {

    this.token = this.getTokenForTalentDataApi(MicroserviceEnum.PXP_JOB_DATA);

    }

    public shouldCheck200Ok(): void {
        let response: APIResponse = this.getRequest(this.endpoint,this.token);
        this.apiAssertions.assertStatus(response,200);
    }
}
