// @ts-nocheck
import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JsonObject } from "common/testing/json";
import { APIRequestContext, APIResponse, RequestOptions } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";
import { GetMatchingCandidateByJobIdModel } from "models/talentsourcing/GetMatchingCandidateByJobIdModel";

export class GetMatchingCandidateProfilesByJobIdPOSTTest extends CommonOperationsForApiTest {

    private static readonly SOURCING_CANDIDATE_ENDPOINT: string = "/pxp-talent-marketplace-ecs/matching/requisitions-candidate/candidates/filter";
    private static readonly INVALID_ENDPOINT: string = "/pxp-talent-marketplace-ecs/matching/requisitions-cand-djfkasjdf873_RUN_FOR_TEST/candidates";
    private static readonly REQ_ID: string = "srlqa0001";
    private static readonly REQUISITION_ID_MUST_BE_PROVIDED: string = "Requisition ID must be provided!";
    private static readonly FAILED_MESSAGE: string = "Actual and expected message are different";
    private static readonly X_CSOD_ERROR_MESSAGE: string = "x-csod-error-message";
    private static readonly RESPONSE_IF_JOB_ID_IS_INVALID: string = "{\"values\":[],\"pageSize\":10,\"pageNumber\":1,\"totalElements\":0,\"totalPages\":0}";
    private static readonly PROFILES_PROFILE_RECOMMENDATION_NOT_FOUND_FOR_REQ_ID_SRLQA_0001_FFFFFE: string = "Profiles: profile recommendation not found for req_id : srlqa0001fffffe";
    private getMatchingCandidateByJobIdModel: GetMatchingCandidateByJobIdModel;
    private tokenParameter: TokenParameter = new TokenParameter();
    private token: string;

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
      this.getMatchingCandidateByJobIdModel = this.getObjectFromJson("fixtures/talentsourcing/GetMatchingCandidateByJobId.json", GetMatchingCandidateByJobIdModel);
        this.getMatchingCandidateByJobIdModel.setReqId(GetMatchingCandidateProfilesByJobIdPOSTTest.REQ_ID);
        this.getMatchingCandidateByJobIdModel.setLimit(10);
        this.getMatchingCandidateByJobIdModel.setPage(1);
    }

    public shouldGetProfileIfJobIsValid(): void {
        let response: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, this.token, this.getMatchingCandidateByJobIdModel);
        Assert.assertEquals(response.status(), 200);
    }

    shouldNotGetProfileIfJobIsInvalid(): void {
        this.getMatchingCandidateByJobIdModel.setReqId("srlqa0001fffffe");
        let response: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, this.token, this.getMatchingCandidateByJobIdModel);
        Assert.assertEquals(response.status(), 200);
        Assert.assertEquals(response.text(),GetMatchingCandidateProfilesByJobIdPOSTTest.RESPONSE_IF_JOB_ID_IS_INVALID);
    }

    shouldNotGetProfileIfTokenIsInvalid(): void {
        this.token = "Abc";
        let response1: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, this.token, this.getMatchingCandidateByJobIdModel);
        Assert.assertEquals(response1.status(), 403);

    }

    shouldNotGetProfileIfInvalidEndpointPath(): void {
        let response1: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.INVALID_ENDPOINT, this.token, this.getMatchingCandidateByJobIdModel);
        Assert.assertEquals(response1.status(), 403);
    }

    shouldNotGetProfileIfSortTypeIsInvalid(): void {
        this.getMatchingCandidateByJobIdModel.setSortOrder("NewTest_RUN_FOR_TEST");
        let response: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, this.token, this.getMatchingCandidateByJobIdModel);
        Assert.assertEquals(response.status(), 403);
    }

    shouldNotGetProfileIfInvalidPageIsProvided(): void {
        this.getMatchingCandidateByJobIdModel.setPage(0);
        this.getMatchingCandidateByJobIdModel.setReqId(GetMatchingCandidateProfilesByJobIdPOSTTest.REQ_ID);
        let response: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, this.token, this.getMatchingCandidateByJobIdModel);
        Assert.assertEquals(response.status(), 403);
    }

    shouldNotGetProfileIfPayloadIsNotProvided(): void {
        let response: APIResponse = postMatchingCandidateProfileByJobId(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, this.token);
        Assert.assertEquals(response.status(), 403);
    }

    shouldNotGetProfileIfReqidIsRemovedFromPayload(): void {
        let tokenRequest: any;

        let data: any = new HashMap();
        data.put("limit", 10);
        data.put("this.page", 1);
      let tokenRequest: any = tokenRequest(this.token);

        let response: APIResponse = tokenRequest.post(GetMatchingCandidateProfilesByJobIdPOSTTest.SOURCING_CANDIDATE_ENDPOINT, RequestOptions.create()
                .setHeader(CONTENT_TYPE, APPLICATION_JSON)
                .setHeader(AUTHORIZATION, BEARER + this.token)
                .setData(data));

        let text: Map<string, string> = response.headers();
        if (text.containsKey(GetMatchingCandidateProfilesByJobIdPOSTTest.X_CSOD_ERROR_MESSAGE)) {
            let actualData: string = text.get(GetMatchingCandidateProfilesByJobIdPOSTTest.X_CSOD_ERROR_MESSAGE);
            Assert.assertEquals(actualData, GetMatchingCandidateProfilesByJobIdPOSTTest.REQUISITION_ID_MUST_BE_PROVIDED, GetMatchingCandidateProfilesByJobIdPOSTTest.FAILED_MESSAGE);
        }
        Assert.assertEquals(response.status(), 400);
    }
}
