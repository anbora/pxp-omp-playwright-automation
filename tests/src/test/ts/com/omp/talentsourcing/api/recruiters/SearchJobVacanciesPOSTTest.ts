import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { Assert, assertNotSame } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";
import { JobStatusForSearchApiModel } from "models/talentsourcing/JobStatusForSearchApiModel";

export class SearchJobVacanciesPOSTTest extends CommonOperationsForApiTest {
    private static readonly SOURCING_SEARCH_ENDPOINT: string = "pxp-talent-marketplace-ecs/matching/tm-source/search";
    private static readonly ROLEX: string = "ROLEX";
    private token: string;
    private jobStatusForSearchApiModel: JobStatusForSearchApiModel;
    private jobId: string = "talentsourcing259d8530-f830-49e4-b3a0-574a84cc7c11";
    private tokenParameter: TokenParameter = new TokenParameter();

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
      this.jobStatusForSearchApiModel = this.getObjectFromJson("fixtures/talentsourcing/JobStatusForSearchApiDto.json", JobStatusForSearchApiModel);
    }

    public shouldGetDetailsForValidJobKeyword(): void {
        this.jobStatusForSearchApiModel.setKeyword("abc681");
        this.jobStatusForSearchApiModel.setJobStatus("OPEN");
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 200);
        Assert.assertEquals(this.getJsonBody(response).get("totalElements").getAsInt(), 1);
        Assert.assertEquals(this.getJsonBody(response).get("values").getAsJsonArray().get(0).getAsJsonObject().get("id").getAsString(), this.jobId);

    }

    public shouldNotGetSearchResultIfKeywordIsInvalid(): void {
        this.jobStatusForSearchApiModel.setKeyword("QQA%^^%%_RUN_FOR_TEST");
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 200);
    }

    public shouldNotGetSearchResultIfInvalidPageNumber(): void {
        this.jobStatusForSearchApiModel.setPageNumber(0);
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 400);
    }

    public shouldNotGetSearchResultIfPageSize(): void {
        this.jobStatusForSearchApiModel.setPageSize(0);
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 400);
    }

    public shouldNotGetSearchResultIfInvalidType(): void {
        this.jobStatusForSearchApiModel.setType(SearchJobVacanciesPOSTTest.ROLEX);
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 400);
    }

    public shouldNotGetSearchResultIfInvalidSortType(): void {
        this.jobStatusForSearchApiModel.setSortType(SearchJobVacanciesPOSTTest.ROLEX);
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetSearchResultIfInvalidSortOrder(): void {
        this.jobStatusForSearchApiModel.setSortOrder(SearchJobVacanciesPOSTTest.ROLEX);
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetSearchResultIfTokenIsInvalid(): void {
        this.token = "abc";
        let response: APIResponse = searchJobVacancies(SearchJobVacanciesPOSTTest.SOURCING_SEARCH_ENDPOINT, this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetSearchResultIfEndpointIsInvalid(): void {
        let response: APIResponse = searchJobVacancies("ENDPOINT", this.token, this.jobStatusForSearchApiModel);
        Assert.assertEquals(response.status(), 503);
    }
}
