import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIRequestContext, APIResponse, RequestOptions } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";
import { ShortlistCandidateApiModel } from "models/talentsourcing/ShortlistCandidateApiModel";

export class CandidateShortlistForJobOpportunityPutApiTest extends CommonOperationsForApiTest {

    private static readonly JOB_ID: string = "277192BR";
    private profileId: string = "3198042";
    private tokenParameter: TokenParameter = new TokenParameter();
    private token: string;
    private static readonly CANDIDATE_SHORTLIST: string = "/pxp-talent-marketplace-ecs/requisitions-candidate/shortlist/";
    private shortlistCandidateApiModel: ShortlistCandidateApiModel;
    private candidateIds: Array<string>;

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
      this.shortlistCandidateApiModel = this.getObjectFromJson("fixtures/talentsourcing/ShortlistCandidate.json", ShortlistCandidateApiModel);
    }

    public shouldBeAbleToShortlistCandidateWithValidJobIdAndProfileId(): void {
      this.candidateIds = this.shortlistCandidateApiModel.getCandidateIds();
        this.candidateIds.add(this.profileId);
        this.shortlistCandidateApiModel.setCandidateIds(this.candidateIds);
        System.out.println(this.shortlistCandidateApiModel.getCandidateIds());
        let response: APIResponse = shortlistCandidatePut(this.token, CandidateShortlistForJobOpportunityPutApiTest.CANDIDATE_SHORTLIST, CandidateShortlistForJobOpportunityPutApiTest.JOB_ID, this.shortlistCandidateApiModel);
        Assert.assertEquals(this.getJsonBody(response).get("message").toString(), "\"Profile successfully shortlisted.\"");
    }

    public shouldNotBeAbleToShortlistCandidateIfJobIdIsBlank(): void {
        let response: APIResponse = shortlistCandidatePut(this.token, CandidateShortlistForJobOpportunityPutApiTest.CANDIDATE_SHORTLIST, "", this.shortlistCandidateApiModel);
        Assert.assertEquals(response.status(), 403);
    }

   // @API
   // @Test(priority = 2)
    public shouldNotBeAbleToShortlistCandidateIfProfileIdIsBlank(): void {
        let response: APIResponse = shortlistCandidatePut(this.token, CandidateShortlistForJobOpportunityPutApiTest.CANDIDATE_SHORTLIST, CandidateShortlistForJobOpportunityPutApiTest.JOB_ID, "{\n" +
                "\t\"this.candidateIds\": [\n" +
                "\t\"\"\n" +
                "\t]\n" +
                "}");
        Assert.assertEquals(response.status(), 404);
    }

   // @API
    //@Test(priority = 3)
    public shouldNotBeAbleToShortlistCandidateIfJobidAndProfileIdIsBlank(): void {
        let response: APIResponse = shortlistCandidatePut(this.token, CandidateShortlistForJobOpportunityPutApiTest.CANDIDATE_SHORTLIST, "", "{\n" +
                "\t\"this.candidateIds\": [\n" +
                "\t\"\"\n" +
                "\t]\n" +
                "}");
        Assert.assertEquals(response.status(), 404);
    }

    public shouldNotBeAbleToShortlistCandidateIfEndpointIsInvalid(): void {
        let response: APIResponse = shortlistCandidatePut(this.token, "invalid_endpoint_automation_testing/", CandidateShortlistForJobOpportunityPutApiTest.JOB_ID, this.profileId);
        Assert.assertEquals(response.status(), 503);
    }

    public shouldNotBeAbleToShortlistCandidateIfTokenIsInvalid(): void {
        let response: APIResponse = shortlistCandidatePut("this.token", CandidateShortlistForJobOpportunityPutApiTest.CANDIDATE_SHORTLIST, CandidateShortlistForJobOpportunityPutApiTest.JOB_ID, this.profileId);
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotBeAbleToShortlistCandidateIfIncorrectHttpMethods(): void {
        let tokenRequest: APIRequestContext = tokenRequest(this.token);
        let response: APIResponse = tokenRequest.fetch(CandidateShortlistForJobOpportunityPutApiTest.CANDIDATE_SHORTLIST + CandidateShortlistForJobOpportunityPutApiTest.JOB_ID, RequestOptions.create()
                .setHeader(CONTENT_TYPE, APPLICATION_JSON)
                .setHeader(AUTHORIZATION, BEARER + this.token));
        Assert.assertEquals(response.status(), 403);
    }
}
