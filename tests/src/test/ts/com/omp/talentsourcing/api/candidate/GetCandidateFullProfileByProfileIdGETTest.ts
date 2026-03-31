// @ts-nocheck
import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIRequestContext, APIResponse, RequestOptions } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";

export class GetCandidateFullProfileByProfileIdGETTest extends CommonOperationsForApiTest {

    private static readonly REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT: string = "/pxp-talent-marketplace-ecs/matching/requisitions-candidate/candidate-profile/";
    private token: string;
    private tokenParameter: TokenParameter = new TokenParameter();

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
    }

    shouldGetCandidateProfileByProfileId(): void {
        let profile: string = this.getCypressUser().id;
        let response: APIResponse = getCandidateProfileByProfileId(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, this.token, profile);
        Assert.assertEquals(response.status(), 200);
    }

    shouldNotGetCandidateProfileIfProfileIdIsInvalid(): void {
        let response: APIResponse = getCandidateProfileByProfileId(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, this.token, "PROFILEID_RUN_FOR_TEST");
        Assert.assertEquals(response.status(), 500);
    }

    shouldNotGetCandidateProfileIfTokenIsInvalid(): void {
        let invalidToken: string = "abc_RUN_FOR_TEST";
        let response: APIResponse = getCandidateProfileByProfileId(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, invalidToken, this.getCypressUser().id);
        Assert.assertEquals(response.status(), 403);
    }

    shouldNotGetCandidateProfileIfEndpointIsInvalid(): void {
        let response: APIResponse = getCandidateProfileByProfileId("ENDPOINT_RUN_FOR_TEST", this.token);
        Assert.assertEquals(response.status(), 503);
    }

    shouldNotGetCandidateProfileIfArrayProvidedAsProfileId(): void {
        let response: APIResponse = getCandidateProfileByProfileId(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, this.token, "[_RUN_FOR_TEST]");
        Assert.assertEquals(response.status(), 400);
    }

    shouldNotGetCandidateProfileIfProfileIdIsProvidedAsSpecialCharacter(): void {
        let response: APIResponse = getCandidateProfileByProfileId(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, this.token, "@##$$%^&**_RUN_FOR_TEST");
        Assert.assertEquals(response.status(), 500);
    }

    shouldNotGetCandidateProfileIfIncorrectHttpMethods(): void {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(this.token);

        let response: APIResponse = tokenRequest.fetch(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, RequestOptions.create()
                .setHeader(CONTENT_TYPE, APPLICATION_JSON)
                .setHeader(AUTHORIZATION, BEARER + this.token));

        Assert.assertEquals(response.status(), 403);
    }

    shouldNotGetCandidateProfileIfProfileIdIsBlank(): void {
        let response: APIResponse = getCandidateProfileByProfileId(GetCandidateFullProfileByProfileIdGETTest.REQUISITIONS_CANDIDATE_CANDIDATE_PROFILE_ENDPOINT, this.token, "");
        Assert.assertEquals(response.status(), 403);
    }
}
