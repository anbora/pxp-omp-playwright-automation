// @ts-nocheck
import { Config } from "common/config/Config";
import { ObjectMapper } from "common/testing/json";

export class BaseGatling extends Simulation {

    private jwtMainUser: string = "";

    public httpProtocol: any = http
            .baseUrl(this.getUrl())
            .inferHtmlResources(AllowList(), DenyList(".*\\.js", ".*\\.css", ".*\\.gif", ".*\\.jpeg", ".*\\.jpg", ".*\\.ico", ".*\\.woff", ".*\\.woff2", ".*\\.(t|o)tf", ".*\\.png", ".*\\.svg", ".*detectportal\\.firefox\\.com.*"))
            .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

    public headersWithToken: Map<string, string> = new Map([
            ["x-api-token", this.getInternalApiToken()]
    ]);

    public getInternalApiToken(): string {
      this.jwtMainUser = System.getProperty("jwtMainUser");

        System.out.println("JWT: " + this.jwtMainUser);
        return this.jwtMainUser;
    }

    public getUrl(): string {
        let config: Config = null;
        try {
            config = new ObjectMapper().readerFor(Config).readValue(this.getClass().getClassLoader().getResourceAsStream("configuration/" + System.getProperty("config", "performance") + "/config.json"));
        } catch (e) {
            throw new RuntimeException(e);
        }
        return config.getPortal().get(0).getUrl();
    }

    //  public String getPublicApiToken() {
//    Playwright this.playwrightForRestAPI = Playwright.create();
//    APIRequestContext tokenRequest;
//    Map<String, String> headers = new HashMap();
//    Config config = null;
//    try {
//      config = new ObjectMapper().readerFor(Config).readValue(this.getClass().getClassLoader().getResourceAsStream("configuration/" + System.getProperty("config", "qaAws") + "/config.json"));
//    } catch (e) {
//      throw new RuntimeException(e);
//    }
//    headers.put("X-API-KEY", config.apiKey);
//    headers.put("X-ACCESS-TOKEN", config.jwtToken);
//
//    tokenRequest = this.playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
//            .setBaseURL(config.url)
//            .setExtraHTTPHeaders(headers));
//
//    APIResponse tokenResponse = tokenRequest.get("/api/developer/v5/auth", RequestOptions.create().setHeader("X-API-KEY", config.apiKey).setHeader("X-AUTH-TOKEN", config.jwtToken));
//    assertTrue(tokenResponse.ok());
//    JsonObject json = new Gson().fromJson(tokenResponse.text(), JsonObject);
//    this.playwrightForRestAPI.close();
//    System.out.println("JWT: " + json.get("jwt_token").getAsString());
////    return json.get("jwt_token").getAsString();
//    return "eyJhbGciOiJIUzI1NiJ9.eyJob3N0X25hbWUiOm51bGwsInVzZXJfaWQiOjUxOTMyNiwiaXNfb3JnX2FkbWluIjp0cnVlLCJpc19zdXBlcmFkbWluIjpmYWxzZSwib3JnYW5pemF0aW9uX2lkIjo0MDAyNDUsInRpbWVzdGFtcCI6IjIwMjQtMDItMDIgMTA6NTU6NTIgVVRDIiwib3JnYW5pemF0aW9uX3VybCI6Im9tcGF1dG9tYXRpb252MS5lZGNhc3RwcmV2aWV3LmNvbSIsImV4cCI6MTcxNDY0NzM1Miwic2Vzc2lvbl9pZCI6ImQzN2E3NmEwNTA4ZTJkNTA1NTkyY2QxZmQ0YzQ5MWQzIn0.eOPVsFzO8pThPOX9jMtYJdm7bitDshBN0oOYqdL54hI";
//  }
}
