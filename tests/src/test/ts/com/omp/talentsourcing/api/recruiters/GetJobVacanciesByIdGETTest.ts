// @ts-nocheck
import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIRequestContext, APIResponse, RequestOptions } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";

export class GetJobVacanciesByIdGETTest extends CommonOperationsForApiTest {

    private static readonly GET_JOB_VACANCY_BY_ID: string = "/pxp-talent-marketplace-ecs/matching/tm-source/job/";
    private static readonly INVALID_JOBID: string = "ab_RUN_FOR_TEST";
    private static readonly NO_OPPORTUNITY_FOUND_FOR_JOB_ID_AB: string = "No opportunity found for Job Id ab_RUN_FOR_TEST";
    private readonly jobId: string = "talentsourcing2b";
    private static readonly INVALID_TOKEN: string = "Invalid_Token";
    private token: string;
    private tokenParameter: TokenParameter = new TokenParameter();

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
    }

    public shouldNotDetailsIfTokenIsInvalid(): void {
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, GetJobVacanciesByIdGETTest.INVALID_TOKEN, this.jobId);
        let text: Map<string, string> = response.headers();
        if (text.containsKey("x-frame-options")) {
            Assert.assertTrue(text.containsValue("DENY"));
        }
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetDetailsIfJobIdIsInvalid(): void {
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, this.token, GetJobVacanciesByIdGETTest.INVALID_JOBID);
        let text: Map<string, string> = response.headers();
        if (text.containsKey("x-csod-error-message")) {
            Assert.assertTrue(text.containsValue(GetJobVacanciesByIdGETTest.NO_OPPORTUNITY_FOUND_FOR_JOB_ID_AB));
        }
        Assert.assertEquals(response.status(), 404);
    }

    public shouldNotGetDetailsIfJobIsProvidedBlank(): void {
        let jobIds: string = "";
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, this.token, jobIds);
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetDetailsIfJobIdIsRemovedFromPathParameter(): void {
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, this.token);
        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetDetailsForIncorrectHttpMethods(): void {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(this.token);

        let response: APIResponse = tokenRequest.post(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID + 12, RequestOptions.create()
                .setHeader(CONTENT_TYPE, APPLICATION_JSON)
                .setHeader(AUTHORIZATION, BEARER + this.token));

        Assert.assertEquals(response.status(), 403);
    }

    public shouldNotGetDetailsForIfInvalidEndpointsPath(): void {
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, this.token, "12_RUN_FOR_TEST");
        Assert.assertEquals(response.status(), 404);
    }

    public shouldNotDetailsIfJobIdIsSpecialCharacter(): void {
        let jobIds: string = "%%%&&&(((_RUN_FOR_TEST";
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, this.token, jobIds);
        Assert.assertEquals(response.status(), 400);
    }

    public shouldNotDetailsIfJobIdIsProvidedAsArray(): void {
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID + "[_RUN_FOR_TEST]", this.token);
        Assert.assertEquals(response.status(), 400);
    }

    public shouldGetDetailsIfJobIsValid(): void {
        let response: APIResponse = getJobVacancyById(GetJobVacanciesByIdGETTest.GET_JOB_VACANCY_BY_ID, this.token, this.jobId);
        Assert.assertEquals(response.status(), 200);
        let actualData: string = this.getJsonBody(response).get("id").getAsString();
        Assert.assertEquals(actualData, this.jobId);
    }
}
