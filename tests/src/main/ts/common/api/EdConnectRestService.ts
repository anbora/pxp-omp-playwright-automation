import { BaseRestTest } from "common/BaseRestTest";
import { Gson } from "common/testing/json";
import { APIRequest, APIResponse, RequestOptions } from "common/testing/playwright";

export class EdConnectRestService extends BaseRestTest {

    public getRequest(endpoint: string): APIResponse {
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).get(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token())));
               return response;
    }

    public postRequest(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).post(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token()))
                .setData(body));
        return response;
    }

    public patchRequest(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).patch(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token()))
                .setData(body));

        return response;
    }

    public putRequest(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).put(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token()))
                .setData(body));

        return response;
    }

    public putRequest(endpoint: string): APIResponse {
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).put(endpoint, RequestOptions.create()
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token())));
        return response;
    }

    public deleteRequest(endpoint: string): APIResponse {
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).delete(endpoint, RequestOptions.create()
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token())));
        return response;
    }

    public postRequestWithoutBody(endpoint: string): APIResponse {
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).post(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token())));
        return response;
    }

    //helper method for debugging purposes
    public postRequestForDebugging(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        System.out.println("Request body:");
        System.out.println(body);
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).post(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token()))
                .setData(body));

        if (response.body() != null) {
            let responseBody: any = new String(response.body(), StandardCharsets.UTF_8);
            System.out.println("Response Body:");
            System.out.println(responseBody);
        } else {
            System.out.println("Response Body is empty or null.");
        }
        return response;
    }

    //helper method for debugging purposes
    public putRequestForDebugging(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
        System.out.println("Request body:");
        System.out.println(body);
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).put(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token()))
                .setData(body));

        if (response.body() != null) {
            let responseBody: any = new String(response.body(), StandardCharsets.UTF_8);
            System.out.println("Response Body:");
            System.out.println(responseBody);
        } else {
            System.out.println("Response Body is empty or null.");
        }

        return response;
    }

    //helper method for debugging purposes
    public getRequestForDebugging(endpoint: string): APIResponse {
        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl())).get(endpoint, RequestOptions.create()
                .setHeader("content-type", "application/json")
                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token())));
        if (response.body() != null) {
            let responseBody: any = new String(response.body(), StandardCharsets.UTF_8);
            System.out.println("Response Body:");
            System.out.println(responseBody);
        } else {
            System.out.println("Response Body is empty or null.");
        }
        return response;
    }

}
