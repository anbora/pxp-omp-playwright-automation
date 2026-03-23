import { BaseRestTest } from "common/BaseRestTest";
import { Gson } from "common/testing/json";
import { APIRequest, APIRequestContext, APIResponse, FormData, RequestOptions } from "common/testing/playwright";

export class CommonOperationsForApiTest extends BaseRestTest {

    public static readonly CONTENT_TYPE: string = "content-type";
    public static readonly APPLICATION_JSON: string = "application/json";
    public static readonly AUTHORIZATION: string = "Authorization";
    public static readonly BEARER: string = "Bearer ";

    public getJobVacancyById(endpoint: string, token: string, jobId: string): APIResponse {
        let response: APIResponse = this.getRequest(endpoint, token, jobId);
        return response;
    }

    public getJobVacancyById(endpoint: string, token: string): APIResponse {
        let response: APIResponse = this.getRequest(endpoint, token);
        return response;
    }

    public postMatchingCandidateProfileByJobId(endpoint: string, token: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
        let response: APIResponse = this.postRequest(endpoint, token, body);
        return response;
    }

    public postMatchingCandidateProfileByJobId(endpoint: string, token: string): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token);

        let response: APIResponse = tokenRequest.post(endpoint, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token));

        return response;
    }

    public getCandidateProfileByProfileId(endpoint: string, token: string, profileId: string): APIResponse {
        let response: APIResponse = this.getRequest(endpoint, token, profileId);
        return response;
    }

    public getCandidateProfileByProfileId(endpoint: string, token: string): APIResponse {
        let response: APIResponse = this.getRequest(endpoint, token);
        return response;
    }

    public searchJobVacancies(endpoint: string, token: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
        let response: APIResponse = this.postRequest(endpoint, token, body);
        return response;
    }

    public postJobVacancyForRecruiter(endpoint: string, token: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
        let response: APIResponse = this.postRequest(endpoint, token, body);

        return response;
    }

    public tokenRequest(token: string): APIRequestContext {

      return this.tokenRequest(token, true);

    }

    public tokenRequest(token: string, withContentType: boolean): APIRequestContext {
        let tokenRequest: any;

        let headers: any = new HashMap();
        if (withContentType) {
            headers.put(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON);
        }
        headers.put(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token);

        tokenRequest = this.playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(this.getConfig().getTalentMarketplaceServiceApiURL())
                .setExtraHTTPHeaders(headers)
                .setIgnoreHTTPSErrors(true));

        return tokenRequest;
    }

    public postRequest(endpoint: string, token: string, body: string): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token);
        let response: APIResponse = tokenRequest.post(endpoint, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token)
                .setData(body));
        return response;
    }

    public postRequest(endpoint: string, token: string, classObject: any): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token);
        let body: any = new Gson().toJson(classObject);
      let body: any = body.replace("\"_", "\"");
               let response: APIResponse = tokenRequest.post(endpoint, RequestOptions.create()
//                .setHeader(CONTENT_TYPE, APPLICATION_JSON)
//                .setHeader(AUTHORIZATION, BEARER + token)
                .setData(body));
        return response;
    }

    public postRequestWithCSV(endpoint: string, token: string, csvFile: Path): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token, false);
        let response: APIResponse = tokenRequest.post(endpoint, RequestOptions.create()
                .setMultipart(FormData.create().set("file", csvFile)));
        return response;
    }

    public getRequest(endpoint: string, token: string, parameter: string): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token);

        let response: APIResponse = tokenRequest.get(endpoint + parameter, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token));
        return response;
    }
    public getRequest(endpoint: string, token: string): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token);
        let response: APIResponse = tokenRequest.get(endpoint, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token));
        return response;
    }

    public deleteRequest(token: string, endpoint: string): APIResponse {
        let tokenRequest: any;
      let tokenRequest: any = tokenRequest(token);
        let response: APIResponse = tokenRequest.delete(endpoint, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token));
        return response;
    }

    public shortlistCandidatePut(token: string, endpoint: string, jobId: string, classObject: any): APIResponse {
        let tokenRequest: APIRequestContext = tokenRequest(token);
        let response: APIResponse = tokenRequest.put(endpoint + jobId, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token)
                .setData(classObject));
        return response;
    }

    public shortlistCandidatePut(token: string, endpoint: string, jobId: string, classObject: string): APIResponse {
        let tokenRequest: APIRequestContext = tokenRequest(token);
        let response: APIResponse = tokenRequest.put(endpoint + jobId, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token)
                .setData(classObject));
        return response;
    }

    public shortlistCandidateDelete(token: string, endpoint: string, jobId: string, classObject: any): APIResponse {
        let tokenRequest: APIRequestContext = tokenRequest(token);
        let response: APIResponse = tokenRequest.delete(endpoint + jobId, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token)
                .setData(classObject));
        return response;
    }

    public shortlistCandidateDelete(token: string, endpoint: string, jobId: string, classObject: string): APIResponse {
        let tokenRequest: APIRequestContext = tokenRequest(token);
        let response: APIResponse = tokenRequest.delete(endpoint + jobId, RequestOptions.create()
                .setHeader(CommonOperationsForApiTest.CONTENT_TYPE, CommonOperationsForApiTest.APPLICATION_JSON)
                .setHeader(CommonOperationsForApiTest.AUTHORIZATION, CommonOperationsForApiTest.BEARER + token)
                .setData(classObject));
        return response;
    }
}
