// @ts-nocheck
import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { APIResponse } from "common/testing/playwright";
import { OrganizationModel } from "models/OrganizationModel";

export class OrganizationFilterSearchApiTest extends CommonOperationsForApiTest {

    private organizationModel: OrganizationModel;
    private readonly SEARCH_ORGANIZATION_BY_ID_ENDPOINT: string = "pxp-tm-search-svc/v1/search_org_byIds";
    private id: string;
    private token: string;

    public initialize(): void {
      this.token = this.getTokenForTalentDataApi(MicroserviceEnum.PXP_TM_SEARCH_SVC);
      this.organizationModel = this.getObjectFromJson("fixtures/organization/OrganizationSearch.json", OrganizationModel);
        this.organizationModel.setIds(this.getConfig().getOrganizationIDs());
    }

    public shouldFilterOrganizationWithFilterValues(): void {
        let response: APIResponse = this.postRequest(this.SEARCH_ORGANIZATION_BY_ID_ENDPOINT, this.token, this.organizationModel);
      this.id = this.apiAssertions.getStringValueFromResponse(response, "divisions[0]/this.id");
        this.apiAssertions.assertStatus(response, 200);
    }
}

//test failing on edcastpreview environment (not finding the requested ID) to be investigated in TM-7425.
