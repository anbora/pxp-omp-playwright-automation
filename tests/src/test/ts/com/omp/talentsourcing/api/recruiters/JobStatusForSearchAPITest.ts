import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";
import { JobStatusForSearchApiModel } from "models/talentsourcing/JobStatusForSearchApiModel";

export class JobStatusForSearchAPITest extends CommonOperationsForApiTest {

    private static readonly TOTAL_ELEMENTS: string = "totalElements";
    private static readonly TOTAL_COUNT: string = "totalCount";
    private token: string;
    private static readonly SOURCING_SEARCH_ENDPOINT: string = "pxp-talent-marketplace-ecs/matching/tm-source/search";
    private jobStatusForSearchApiModel: JobStatusForSearchApiModel;
    private tokenParameter: TokenParameter = new TokenParameter();

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
      this.jobStatusForSearchApiModel = this.getObjectFromJson("fixtures/talentsourcing/JobStatusForSearchApiDto.json", JobStatusForSearchApiModel);
    }

    public shouldGetJobForMyPublishedVacanciesStatus(): void {
        let response: APIResponse = searchJobVacancies(JobStatusForSearchAPITest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        let response1: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint());
        Assert.assertEquals(response.status(), 200);
        //Assert.assertEquals(this.getJsonBody(response).get(TOTAL_ELEMENTS).getAsInt(), this.getJsonBody(response1).get(TOTAL_COUNT).getAsInt());
    }

    public shouldGetJobForOpenJobStatus(): void {
        this.jobStatusForSearchApiModel.setJobStatus("OPEN");
        let response: APIResponse = searchJobVacancies(JobStatusForSearchAPITest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        let response1: APIResponse = this.getRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + "?status=OPEN");
        Assert.assertEquals(response.status(), 200);
        //Assert.assertEquals(this.getJsonBody(response).get(TOTAL_ELEMENTS).getAsInt(), this.getJsonBody(response1).get(TOTAL_COUNT).getAsInt());
    }
}
