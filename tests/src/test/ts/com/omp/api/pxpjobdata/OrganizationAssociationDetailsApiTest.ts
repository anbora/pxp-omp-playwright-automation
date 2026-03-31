// @ts-nocheck
import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { APIResponse } from "common/testing/playwright";

export class OrganizationAssociationDetailsApiTest extends CommonOperationsForApiTest {
    private token: string;
    private endpoint: string = "pxp-job-data/v1/org/config?association_context=user&visibility_context=job_vacancy_filter";

    public initialize(): void {

    this.token = this.getTokenForTalentDataApi(MicroserviceEnum.PXP_JOB_DATA);

    }

    public shouldCheckOrganizationAssociationDetails(): void {
let response: APIResponse = this.getRequest(this.endpoint,this.token);
        this.apiAssertions.assertStatus(response,200);
    }
}
