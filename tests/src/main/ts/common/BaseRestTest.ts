import { ApiAssertions } from "common/ApiAssertions";
import { BaseTest } from "common/BaseTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { Gson, JsonArray, JsonObject, JsonProcessingException, ObjectMapper } from "common/testing/json";
import { APIRequest, APIRequestContext, APIResponse, RequestOptions } from "common/testing/playwright";
import { ITestContext, assertTrue } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";
import { FamilyModel } from "models/family/FamilyModel";
import { FunctionModel } from "models/function/FunctionModel";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { Location } from "models/job/Location";
import { RoleModel } from "models/role/RoleModel";
import { CreateUserModel } from "models/user/CreateUserModel";
import { User } from "models/user/User";
import { UserModel } from "models/user/UserModel";

export class BaseRestTest extends BaseTest {

    private static readonly CYPRESS_VALUE: string = "cypress";
    private static readonly LAST_NAME: string = "custom-user";
    private static readonly EMAIL_VALUE: string = "@csod.com";
    private static readonly PASSWORD: string = "T@lentlink.1";
    private static readonly ENCRYPTED_PASSWORD: string = "ff/7v9Evld9vhPtLNEdNE3ccEPST0v4IpI8xj9JCF+WvQnwzQmsSxwle5RgdFWfzQmYbKzz0kavvnUAJ/yvauiu0leww7zA+LzBk917bSNbJ3fVawKO5YmA0f5oj0bjF2XeRoyPXwqrIFclfN5VDNXJY2+0KXTxFSBkDEW+pPGg=";
//    public APIRequestContext internalRequestWithoutToken;

    private isMainUserLogged: boolean = false;
    protected mainUserCookies: AtomicReference<string> = new AtomicReference("");
    private mainUserCsrfToken: string = "";
    private mainUserJwtToken: string = "";
    private request: APIRequestContext;
    public mainUserInternalRequest: APIRequestContext;
    public apiAssertions: ApiAssertions = new ApiAssertions();

    public createAPIContextBeforeClass(): void {
      let request:  = createAPIRequestContext();
    } //A helper method that creates the API request context with necessary headers (e.g., content-type, X-API-KEY, X-ACCESS-TOKEN).

    public beforeSuite(): void {
        super.beforeSuite();
      let request:  = createAPIRequestContext();
    }

    public loginToMainUser(): void {
        if (System.getProperty("resultDashboard", "false").equals("true") && this.portalIndex == 0) {
          let mainUserCsrfToken:  = System.getProperty("csrfMainUser");
          let mainUserJwtToken:  = System.getProperty("jwtMainUser");
            mainUserCookies.set(System.getProperty("cookiesMainUser"));

        } else {
            let userModel: CreateUserModel = getObjectFromJson("fixtures/user/SignIn.json", CreateUserModel);
            let user: User = userModel.getUser();
            user.set_password(getCypressUser().encryptedPassword);
            userModel.setUser(user);

            let response: APIResponse = postInternalRequest(createInternalAPIRequestContext(""), "/auth/users/sign_in.json", userModel);
            this.logger.info(response.text());
            this.logger.info(response.status());
          let mainUserCsrfToken:  = getJsonBody(response).get("csrfToken").getAsString();
          let mainUserJwtToken:  = getJsonBody(response).get("jwtToken").getAsString();

            response.headersArray().forEach(httpHeader => {
                if (httpHeader.name.equals("Set-Cookie")) {
                    let cookieVariables: string[] = httpHeader.value.split(";");
                    mainUserCookies.set(mainUserCookies.get() + cookieVariables[0] + ";");
                }
            });
        }

      let mainUserInternalRequest:  = createInternalAPIRequestContext(mainUserJwtToken);
    }

    public loginToAUserForInternalRequest(user: UserModel): APIRequestContext {
        let userModel: any = new CreateUserModel();
        let userData: any = new User();
        userData.setEmail(user.email);
        userData.set_password(user.encryptedPassword);
        userData.setTermsAccepted(true);
        userModel.setUser(userData);

        let response: APIResponse = postInternalRequest(createInternalAPIRequestContext(""), "/auth/users/sign_in.json", userModel);
        let jwtToken: string = getJsonBody(response).get("jwtToken").getAsString();
        return this.createInternalAPIRequestContext(jwtToken);
    }

    public deleteAllUsers(): void {
        if (!isMainUserLogged) {
            this.loginToMainUser();
          let isMainUserLogged:  = true;
        }
        let searchForUserResponse: APIResponse = getInternalRequest(mainUserInternalRequest, "/api/v2/cms/users/search?fields=id,external_id,email&limit=1500&include_suspended=true&q=cypress&is_cms=true&no_sort=true", mainUserCookies.get());
        this.getJsonBody(searchForUserResponse).get("users").getAsJsonArray().forEach(jsonElement => {
            let email: string = jsonElement.getAsJsonObject().get("email").getAsString();
            if (!email.equals(getCypressUser().email) && !email.equals(getCypress2User().email) && !email.equals(getCypress3User().email)) {
                let userModel: any = new UserModel();
                userModel.id = jsonElement.getAsJsonObject().get("id").getAsString();
                System.out.println(jsonElement.getAsJsonObject().get("id"));
                System.out.println(jsonElement.getAsJsonObject().get("email"));
                this.deleteUser(userModel);
                try {
                    Thread.sleep(5000);
                } catch (e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    private createUserApiV6(isAdmin: boolean): UserModel {

        if (!isMainUserLogged) {
            this.loginToMainUser();
          let isMainUserLogged:  = true;
        }

        let user: any = new UserModel();
        let randomValue: string = UUID.randomUUID().toString();

        user.name = CYPRESS_VALUE + randomValue;
        user.email = CYPRESS_VALUE + randomValue + EMAIL_VALUE;
        user.password = PASSWORD;
        user.fullName = user.name + " User";
        user.encryptedPassword = ENCRYPTED_PASSWORD;

        String createUser = String.format(`{
                  "user": {
                    "email": "%s",
                    "external_id": "%s",
                    "first_name": "%s",
                    "last_name": "%s"
                  }
                }`, user.email, randomValue, user.name, "User", user.password);

        APIResponse response = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions().setBaseURL(getPortalConfig(this.portalIndex).getUrl()))
                .post("/api/developer/v6/users",
                        RequestOptions.create()
                                .setData(createUser)
                                .setHeader("CURRENT-USER", (getPortalConfig(this.portalIndex).getV6CurrentUser()))
                                .setHeader("X-ACCESS-TOKEN", (getPortalConfig(this.portalIndex).getV6token()))
                                .setHeader("Content-Type", "application/json")
                );

        user.id = getJsonBody(response).getAsJsonObject("user").getAsJsonPrimitive("id").getAsString();
        user.externalId = getJsonBody(response).getAsJsonObject("user").get("external_id").getAsString();

        String updateUserPassword = String.format(`{
                    "user": {
                        "password": "%s",
                        "is_cms": true,
                        "profile_attributes": {
                            "job_title": ""
                        }
                    }
                }`, user.password);

        let updateUserPasswordResponse: APIResponse = putInternalRequest(mainUserInternalRequest, "/api/v2/users/" + user.id, updateUserPassword, mainUserCookies.get());

        this.logger.info("   + update user password: " + updateUserPasswordResponse.status());
        System.out.println(updateUserPasswordResponse.status());
        System.out.println(updateUserPasswordResponse.text());
        if (isAdmin) {
            String updateRoleJson = String.format(`{
                        "authenticity_token": "%s",
                        "role_ids": [%s]
                    }`, mainUserCsrfToken, getPortalConfig(this.portalIndex).getAdminRoles());

            let assignRolesToUser: APIResponse = putInternalRequest(mainUserInternalRequest, "/cms/api/users/" + user.id + "/assign_roles.json", updateRoleJson, mainUserCookies.get());
            this.logger.info("   + assign role to user: " + assignRolesToUser.status() + " | role ids: " + getPortalConfig(this.portalIndex).getAdminRoles());
        }

        this.logger.info("   + user email: " + user.email + " | user password: " + user.password + " | user id: " + user.id);

      /*  CreateUserModel userModel = new CreateUserModel();
        let userData: any = new User();
        userData.setEmail(user.email);
        userData.set_password(user.encryptedPassword);
        userData.setTermsAccepted(true);
        userModel.setUser(userData);
        let response2: APIResponse = postInternalRequest(createInternalAPIRequestContext(""), "/auth/users/sign_in.json", userModel);

        System.out.println(response2.text());
        System.out.println(response2.status());
        let localUserCsrfToken: string = getJsonBody(response2).get("csrfToken").getAsString();
        let localUserJwtToken: string = getJsonBody(response2).get("jwtToken").getAsString();
        let localUserCookies: any = new AtomicReference("");

        response2.headersArray().forEach(httpHeader => {
            if (httpHeader.name.equals("Set-Cookie")) {
                let cookieVariables: string[] = httpHeader.value.split(";");
                localUserCookies.set(localUserCookies.get() + cookieVariables[0] + ";");
            }
        });

        String passOnboardingJson = String.format(`{
                    "authenticity_token": "%s",
                    "user": {
                        "id": %s,
                        "first_name": "%s",
                        "last_name": "User",
                        "profile_attributes": {
                            "language": "en"

                    },
                    "step": 1,
                    "custom_onboarding": true
                }`, localUserCsrfToken, user.id, user.name);

        let onboardingRequest: APIResponse = putInternalRequest(createInternalAPIRequestContext(localUserJwtToken), "/api/user_onboardings/" + user.id, passOnboardingJson, localUserCookies.get());
        System.out.println(onboardingRequest.status() + " | " + onboardingRequest.text());

       */
        return user;
    }

    public createUser(): UserModel {

      return this.createUser(false);

    }

    public createUser(isAdmin: boolean): UserModel {

        this.logger.info("Try to create user:");

        if (System.getProperty("config", "qaAws").equals("skip")) { // SKIP APIv6 for user creation
            if (!isMainUserLogged) {
                this.loginToMainUser();
              let isMainUserLogged:  = true;
            }
            let user: any = new UserModel();
            let randomValue: string = UUID.randomUUID().toString();

            user.name = CYPRESS_VALUE + randomValue;
            user.email = CYPRESS_VALUE + randomValue + EMAIL_VALUE;
            user.password = PASSWORD;
            user.fullName = user.name + " User";
            user.encryptedPassword = ENCRYPTED_PASSWORD;

            let fileId: string = "";
            let previewBulkImportStatus: number = 0;
            for (int i = 0; i < 10; i++) {
                String previewBulkImport = String.format(`{
                            "authenticity_token": "%s",
                            "user_details": {
                                "first_name": "%s",
                                "last_name": "%s",
                                "email": "%s",
                                "password": "%s"
                            }
                        }`, mainUserCsrfToken, user.name, "User", user.email, user.password);

                let previewBulkImportResponse: APIResponse = postInternalRequest(createInternalAPIRequestContext(""), "/cms/api/users/preview_bulk_import", previewBulkImport, mainUserCookies.get());
                try {
                  let previewBulkImportStatus:  = previewBulkImportResponse.status();
                  let fileId:  = getJsonBody(previewBulkImportResponse).get("file_id").getAsString();
                } catch (e) {
                    //nothing to do
                }
                if (!fileId.equals("")) {
                    break;
                } else {
                    try {
                        Thread.sleep(2000);
                    } catch (e) {
                        throw new RuntimeException(e);
                    }
                }
            }

            this.logger.info("   + preview bulk request: " + previewBulkImportStatus + " | fileId: " + fileId);

            String bulkUpload = String.format(`{
                        "authenticity_token": "%s",
                        "file_id": %s,
                        "send_welcome_email":false,
                        "channel_ids":[],
                        "team_ids":[],
                        "emails":[],
                        "invitable":true
                    }`, mainUserCsrfToken, fileId);

            try {
                Thread.sleep(1000);
            } catch (e) {
                throw new RuntimeException(e);
            }

            let bulkUploadResponse: APIResponse = putInternalRequest(createInternalAPIRequestContext(""), "/cms/api/users/bulk_upload", bulkUpload, mainUserCookies.get());

            this.logger.info("   + bulk upload request: " + bulkUploadResponse.status());

            try {
                Thread.sleep(2000);
            } catch (e) {
                throw new RuntimeException(e);
            }

            for (int i = 0; i < 50; i++) {
                let searchForUserResponse: APIResponse = getInternalRequest(mainUserInternalRequest, "/api/v2/cms/users/search?fields=id,external_id,email&limit=1&include_suspended=true&q=" + user.email + "&is_cms=true&no_sort=true", mainUserCookies.get());
                let firstUserOnTheList: JsonObject = getJsonBody(searchForUserResponse).get("users").getAsJsonArray().get(0).getAsJsonObject();
                if (firstUserOnTheList.get("email").getAsString().equals(user.email)) {
                    this.logger.info("   + try to get user | try(" + (i + 1) + ") | status: " + searchForUserResponse.status() + " | user found with email: " + user.email);
                    user.id = firstUserOnTheList.get("id").getAsString();
                    user.externalId = firstUserOnTheList.get("externalId").getAsString();
                } else {
                    this.logger.info("   + try to get user | try(" + (i + 1) + ") | status: " + searchForUserResponse.status() + " | user not found | expected: '" + user.email + "' but found: '" + firstUserOnTheList.get("email") + "'");
                }
                if (user.id == null) {
                    try {
                        Thread.sleep(3000);
                    } catch (e) {
                        throw new RuntimeException(e);
                    }
                } else {
                    this.logger.info("   + user created with id: " + user.id);
                    break;
                }
            }
            if (user.id == null) {
                this.logger.warn("   + user not created");
            }

            String updateUserPassword = String.format(`{
                        "user": {
                            "password": "%s",
                            "is_cms": true,
                            "profile_attributes": {
                                "job_title": ""
                            }
                        }
                    }`, user.password);

            let updateUserPasswordResponse: APIResponse = putInternalRequest(mainUserInternalRequest, "/api/v2/users/" + user.id, updateUserPassword, mainUserCookies.get());

            this.logger.info("   + update user password: " + updateUserPasswordResponse.status());

            if (isAdmin) {
                String updateRoleJson = String.format(`{
                            "authenticity_token": "%s",
                            "role_ids": [%s]
                        }`, mainUserCsrfToken, getConfig().getPortal().get(this.portalIndex).getAdminRoles());

                let assignRolesToUser: APIResponse = putInternalRequest(mainUserInternalRequest, "/cms/api/users/" + user.id + "/assign_roles.json", updateRoleJson, mainUserCookies.get());
                this.logger.info("   + assign role to user: " + assignRolesToUser.status() + " | role ids: " + getPortalConfig(this.portalIndex).getUrl());
            }

            this.logger.info("   + user email: " + user.email + " | user password: " + user.password + " | user id: " + user.id);

//            CreateUserModel userModel = new CreateUserModel();
//            User userData = new User();
//            userData.setEmail(user.email);
//            userData.set_password(user.encryptedPassword);
//            userData.setTermsAccepted(true);
//            userModel.setUser(userData);
//            APIResponse response = postInternalRequest(createInternalAPIRequestContext(""), "/auth/users/sign_in.json", userModel);
//
//            System.out.println(response.text());
//            System.out.println(response.status());
//            String localUserCsrfToken = getJsonBody(response).get("csrfToken").getAsString();
//            String localUserJwtToken = getJsonBody(response).get("jwtToken").getAsString();
//            AtomicReference<String> localUserCookies = new AtomicReference("");
//
//            response.headersArray().forEach(httpHeader => {
//                if (httpHeader.name.equals("Set-Cookie")) {
//                    String[] cookieVariables = httpHeader.value.split(";");
//                    localUserCookies.set(localUserCookies.get() + cookieVariables[0] + ";");
//                }
//            });
//
//            String passOnboardingJson = String.format(`//                    {
//                        "authenticity_token": "%s",
//                        "user": {
//                            "id": %s,
//                            "first_name": "%s",
//                            "last_name": "User",
//                            "profile_attributes": {
//                                "language": "en"
//                            }
//                        },
//                        "step": 1,
//                        "custom_onboarding": true
//                    }`, localUserCsrfToken, user.id, user.name);
//
//            APIResponse onboardingRequest = putInternalRequest(createInternalAPIRequestContext(localUserJwtToken), "/api/user_onboardings/" + user.id, passOnboardingJson, localUserCookies.get());
//            System.out.println(onboardingRequest.status() + " | " + onboardingRequest.text());

            return user;
        } else {
            return this.createUserApiV6(isAdmin);
        }
    }

    public deleteUser(user: UserModel): void {
        let response: APIResponse = postInternalRequest(mainUserInternalRequest, "/api/v2/cms/users/bulk_delete?user_ids[]=" + user.id, "{}", mainUserCookies.get());
        System.out.println(response.status());
    }

    public createJobFunction(): string {

      return createJobFunction(UUID.randomUUID().toString());

    }

    public createJobFunction(functionName: string): string {
        this.loginToMainUser();

        let functionModel: FunctionModel = getObjectFromJson("fixtures/function/JobFunction.json", FunctionModel);
        functionModel.setTitle(functionName);

        let createFunctionResponse: APIResponse = postInternalRequest(mainUserInternalRequest, EndpointsEnum.FUNCTION_ENDPOINT.getEndpoint(), functionModel);
        this.assertTrue(createFunctionResponse.ok());
        return this.getJsonBody(createFunctionResponse).get("data").getAsJsonObject().get("id").getAsString();
    }

    public deleteJobFunction(jobFunctionId: string): void {
        let deleteJobFunctionResponse: APIResponse = deleteInternalRequest(mainUserInternalRequest, EndpointsEnum.FUNCTION_ENDPOINT.getEndpoint() + jobFunctionId);
        this.assertTrue(deleteJobFunctionResponse.ok());
    }

    public createJobFamily(familyName: string, functionId: string): string {
        this.loginToMainUser();

        let familyModel: FamilyModel = getObjectFromJson("fixtures/family/JobFamily.json", FamilyModel);
        familyModel.setTitle(familyName);
        familyModel.setFunctionId(functionId);
        familyModel.setExternalId(UUID.randomUUID().toString());

        let createFamilyResponse: APIResponse = postInternalRequest(mainUserInternalRequest, EndpointsEnum.FAMILY_ENDPOINT.getEndpoint(), familyModel);
        this.assertTrue(createFamilyResponse.ok());
        return this.getJsonBody(createFamilyResponse).get("data").getAsJsonObject().get("id").getAsString();
    }

    public deleteJobFamily(jobFamilyId: string): void {
        let deleteJobFamilyResponse: APIResponse = deleteInternalRequest(mainUserInternalRequest, EndpointsEnum.FAMILY_ENDPOINT.getEndpoint() + jobFamilyId);
        this.assertTrue(deleteJobFamilyResponse.ok());
    }

    public createRole(title: string, description: string, additionalDescription: string): string {

      return createRole(title, description, additionalDescription, (getPortalConfig(portalIndex).getRoleFamilyId()));

    }

    public createRole(title: string, description: string, additionalDescription: string, familyId: string): string {
        this.loginToMainUser();

        let roleModel: RoleModel = getObjectFromJson("fixtures/role/CreateRole.json", RoleModel);
        roleModel.setTitle(title);
        roleModel.setDescription("<h3 id = 'h3IdFromCustomDescription'>" + title + "</h3>");
        roleModel.setJobDescription("<div id = 'divIdFromCustomDescription'><span>" + description + "</span></div>");
        roleModel.setOtherDescription("<strong id = 'strongIdFromCustomDescription'>" + additionalDescription + "</strong><a id = 'aIdFromCustomDescription'>" + title + "</a>");
        roleModel.setFamilyId(familyId);

        let createRoleResponse: APIResponse = postInternalRequest(mainUserInternalRequest, EndpointsEnum.ROLE_ENDPOINT.getEndpoint(), roleModel);
        this.assertTrue(createRoleResponse.ok());
        return this.getJsonBody(createRoleResponse).get("data").getAsJsonObject().get("id").getAsString();
    }

    public deleteRole(title: string, roleId: string): void {
        this.loginToMainUser();

        let roleModel: RoleModel = getObjectFromJson("fixtures/role/InactivateRole.json", RoleModel);
        roleModel.setTitle(title);
        roleModel.setFamilyId(getPortalConfig(this.portalIndex).getRoleFamilyId());

        let createRoleResponse: APIResponse = putInternalRequest(mainUserInternalRequest, EndpointsEnum.ROLE_ENDPOINT.getEndpoint() + roleId, roleModel);
        this.assertTrue(createRoleResponse.ok());
    }

    public createJob(title: string): string {

      return createJob(title, false);

    }

    /**
     * If payload doesn't contain linked role provided explicitly, then linked job roles will be detected therefore
     * you don't have control over which additional skills will appear in context of your job.
     * To ensure that skills will be detected only based on job's title and description we have to
     * link the job explicitly with a role which itself doesn't have any skill assigned.
     * Example of such a role is the gardenerRole stored in configuration pera each environment.
     * @param title
     * @param withLinkedRoleWithoutSkills
     * @return
     */
    public createJob(title: string, withLinkedRoleWithoutSkills: boolean): string {
        let jobModel: JobModel = getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        jobModel.setId("restassureJob_" + title.replaceAll(" ", ""));
      if(withLinkedRoleWithoutSkills: ):  {
            let linkedRole: any = new LinkedRole();
            linkedRole.setInternalId(getPortalConfig(this.portalIndex).getGardenerRoleId());
            linkedRole.setLinkedRoleStatus("DECLARED");
            jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        }
        return createJob(title, jobModel);
    }

    public createJob(title: string, jobModel: JobModel): string {

      return createJob(title, jobModel, true);

    }

    public createJob(title: string, jobModel: JobModel, randomJobId: boolean): string {
        let jobDescriptionList: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptionList.get(0).setTitle(title);
        jobModel.setJobDescriptions(jobDescriptionList);
        let location: Array<Location> = jobModel.getLocation();
        location.get(0).setLocationId(getPortalConfig(this.portalIndex).getLocationId());
        if (randomJobId) {
            jobModel.setId("restassureJob_" + title.replaceAll(" ", "") + UUID.randomUUID().toString().substring(1, 6));
        }
        let createJobResponse: APIResponse = postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), jobModel);
        System.out.println(createJobResponse.text());
        this.assertTrue(createJobResponse.ok(), "Job is not created! Expected status: [200] but found [" + createJobResponse.status() + "]. " + createJobResponse.text());

        return this.getJsonBody(createJobResponse).get("id").getAsString();
    }

    public createJobWithEmptyLocation(title: string, jobModel: JobModel): string {
        let jobDescriptionList: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptionList.get(0).setTitle(title);
        jobModel.setJobDescriptions(jobDescriptionList);
        let createJobResponse: APIResponse = postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), jobModel);
        this.assertTrue(createJobResponse.ok(), "Job is not created! Expected status: [200] but found [" + createJobResponse.status() + "]. " + createJobResponse.text());

        return this.getJsonBody(createJobResponse).get("id").getAsString();
    }

    public createJobWithLocation(title: string, locationId: string, jobModel: JobModel): string {
        let jobDescriptionList: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptionList.get(0).setTitle(title);
        jobModel.setJobDescriptions(jobDescriptionList);
        let location: Array<Location> = jobModel.getLocation();
        location.get(0).setLocationId(locationId);        jobModel.setId("restassureJob_" + title.replaceAll(" ", ""));

        let createJobResponse: APIResponse = postRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint(), jobModel);
        this.assertTrue(createJobResponse.ok());
        return this.getJsonBody(createJobResponse).get("id").getAsString();
    }

    public deleteJob(id: string): void {
        let deleteJobResponse: APIResponse = deleteRequest(EndpointsEnum.JOB_ENDPOINT.getEndpoint() + id);
        if (deleteJobResponse.ok()) {
            System.out.println("JOB_DELETED | id: '" + id + "'");
        } else {
            System.out.println("JOB_NO_ DELETED: | status: '" + deleteJobResponse.status() + "' | id: '" + id + "'");
        }
    }

    public getInternalRequest(requestContext: APIRequestContext, endpoint: string): APIResponse {

      return requestContext.get(endpoint);

    }

    public getInternalRequest(requestContext: APIRequestContext, endpoint: string, cookies: string): APIResponse {

      return requestContext.get(endpoint, RequestOptions.create().setHeader("cookie", cookies));

    }

    public deleteInternalRequest(requestContext: APIRequestContext, endpoint: string): APIResponse {

      return requestContext.delete(endpoint);

    }

    public postInternalRequest(endpoint: string, body: string): APIResponse {
        this.loginToMainUser();
      let body:  = body.replace("\"_", "\"");
        return mainUserInternalRequest.post(endpoint, RequestOptions.create().setData(body));
    }

    public postInternalRequest(requestContext: APIRequestContext, endpoint: string, body: string): APIResponse {
      let body:  = body.replace("\"_", "\"");
        return requestContext.post(endpoint, RequestOptions.create().setData(body));
    }

    public postInternalRequest(requestContext: APIRequestContext, endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        return requestContext.post(endpoint, RequestOptions.create().setData(body));
    }

    public putInternalRequest(requestContext: APIRequestContext, endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        return requestContext.put(endpoint, RequestOptions.create().setData(body));
    }

    public postInternalRequest(requestContext: APIRequestContext, endpoint: string, body: string, cookies: string): APIResponse {
      let body:  = body.replace("\"_", "\"");
        return requestContext.post(endpoint, RequestOptions.create().setData(body).setHeader("cookie", cookies));
    }

    public putInternalRequest(requestContext: APIRequestContext, endpoint: string, body: string, cookies: string): APIResponse {
      let body:  = body.replace("\"_", "\"");
        return requestContext.put(endpoint, RequestOptions.create().setData(body).setHeader("cookie", cookies));
    }

    public getRequest(endpoint: string): APIResponse {

      return request.get(endpoint);

    }

    public deleteRequest(endpoint: string): APIResponse {

      return request.delete(endpoint);

    }

    public postRequest(endpoint: string, body: string): APIResponse {
      let body:  = body.replace("\"_", "\"");
        return request.post(endpoint, RequestOptions.create().setData(body));
    }

    public postRequest(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        return request.post(endpoint, RequestOptions.create().setData(body));
    }

    public postRequest(endpoint: string, body: string, cookies: string): APIResponse {
      let body:  = body.replace("\"_", "\"");
        return request.post(endpoint, RequestOptions.create().setData(body).setHeader("cookie", cookies));
    }

    public patchRequest(endpoint: string, body: string): APIResponse {
      let body:  = body.replace("\"_", "\"");
        return request.patch(endpoint, RequestOptions.create().setData(body));
    }

    public patchRequest(endpoint: string, classObject: any): APIResponse {
        let body: any = new Gson().toJson(classObject);
      let body:  = body.replace("\"_", "\"");
        return request.patch(endpoint, RequestOptions.create().setData(body));
    }

    public <T> getObjectFromJson(jsonFile: string, tClass: Class<T>): T {
        try {
            return new ObjectMapper().readValue(getFile(jsonFile), tClass);
        } catch (e) {
            throw new RuntimeException(e);
        }
    }

    public getJsonBody(apiResponse: APIResponse): JsonObject {

      return new Gson().fromJson(apiResponse.text(), JsonObject);

    }

    public getJsonArray(apiResponse: APIResponse): JsonArray {

      return new Gson().fromJson(apiResponse.text(), JsonArray);

    }

    public getFile(file: string): string {
        let is: InputStream = this.getClass().getClassLoader().getResourceAsStream(file);
        assert is != null;
        let isr: any = new InputStreamReader(is);
        let reader: any = new BufferedReader(isr);
        return reader.lines().collect(Collectors.joining(System.lineSeparator()));
    }

    private createAPIRequestContext(): APIRequestContext {
        let headers: any = new HashMap();
        headers.put("content-type", "application/json");
        headers.put("X-API-KEY", getPortalConfig(this.portalIndex).getV5apiKey());
        if (System.getProperty("publicApiToken", "").equals("")) {
            headers.put("X-ACCESS-TOKEN", getToken());
        } else  {
            headers.put("X-ACCESS-TOKEN", System.getProperty("publicApiToken"));
        }

        return playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(getPortalConfig(this.portalIndex).getUrl())
                .setExtraHTTPHeaders(headers));
    }

    public createInternalAPIRequestContext(token: string): APIRequestContext {
        let headers: any = new HashMap();
        headers.put("content-type", "application/json");
        if (!token.equals("")) {
            headers.put("x-api-token", token);
        }

        return playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(getPortalConfig(this.portalIndex).getUrl())
                .setExtraHTTPHeaders(headers));
    }

    private getToken(): string {
        let tokenRequest: any;
        let headers: any = new HashMap();
        headers.put("X-API-KEY", getPortalConfig(this.portalIndex).getV5apiKey());
        headers.put("X-ACCESS-TOKEN", getPortalConfig(this.portalIndex).getV5token());

        tokenRequest = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(getPortalConfig(this.portalIndex).getUrl())
                .setExtraHTTPHeaders(headers));

        let tokenResponse: APIResponse = tokenRequest.get("/api/developer/v5/auth", RequestOptions.create().setHeader("X-API-KEY", getPortalConfig(this.portalIndex).getV5apiKey()).setHeader("X-AUTH-TOKEN", getPortalConfig(this.portalIndex).getV5token()));
        System.out.println("###tokenGeneratedInTest: " + tokenResponse.text());
        System.out.println("###statusOfTheTokenGeneratedInTest: " + tokenResponse.status());
        this.assertTrue(tokenResponse.ok());
        let json: any = new Gson().fromJson(tokenResponse.text(), JsonObject);
        return json.get("jwt_token").getAsString();
    }

    public getTokenForTalentMarketplaceApi(tokenParameter: TokenParameter): string {
        APIRequestContext tokenRequest = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(getConfig().getTalentMarketplaceServiceApiURL())
                .setIgnoreHTTPSErrors(true));

        APIResponse tokenResponse = tokenRequest.post("/pxp-talent-marketplace-ecs/authentication/v2/generate/internal/token", RequestOptions.create()
                .setQueryParam("corp_id", tokenParameter.getAccountId())
                .setQueryParam("cloud-corp-id", tokenParameter.getAccountId())
                .setQueryParam("user-id", tokenParameter.getUserId())
                .setQueryParam("x-app", "edcast")
                .setQueryParam("x-ptn", "edcast"));

        this.assertTrue(tokenResponse.ok());
        return tokenResponse.text();
    }

    public getTokenForTalentDataApi(microserviceName: MicroserviceEnum): string {
        APIRequestContext tokenRequest = playwrightForRestAPI.request().newContext(new APIRequest.NewContextOptions()
                .setBaseURL(getConfig().getTalentMarketplaceServiceApiURL())
                .setIgnoreHTTPSErrors(true));

        APIResponse tokenResponse = tokenRequest.post(microserviceName.getMicroserviceName() + "/authentication/v2/generate/internal/token?", RequestOptions.create()
                .setQueryParam("corp_id", getPortalConfig(this.portalIndex).getAccountId())
                .setQueryParam("cloud-corp-id", getPortalConfig(this.portalIndex).getAccountId())
                .setQueryParam("user-id", getCypressUser().id)
                .setQueryParam("x-app", "edcast"));

        this.assertTrue(tokenResponse.ok());
        return tokenResponse.text();
    }

    public repeatRequestUntil(action: Callable<APIResponse>, jsonPath: string, expected: string): APIResponse {
        let numberOfTries: number = 0;
        let numberOfRepeats: number = 60;
        int timeToWait = 10000; // 10sec
        let response: APIResponse = null;
        do {
            numberOfTries++;
            try {
                System.out.println("CALL " + numberOfTries);
              let response:  = action.call();
                if (response != null) {
                    let jsonObject: any = new AtomicReference(getJsonBody(response));
                    let path: string[] = jsonPath.split("/");
                    let counter: any = new AtomicInteger(1);
                    Arrays.stream(path).forEach(p => {
                        try {
                            if (counter.get() < path.length) {
                                if (p.contains("[") && p.contains("]")) {
                                    let splitString: string[] = p.split("\\[");
                                    if (jsonObject.get().getAsJsonArray(splitString[0]).length > 0) {
                                        jsonObject.set(jsonObject.get().getAsJsonArray(splitString[0]).get(0).getAsJsonObject());
                                    }
                                } else {
                                    jsonObject.set(jsonObject.get().getAsJsonObject(p));
                                }
                            }
                            counter.getAndIncrement();
                        } catch (e) {
                            System.out.println("EX 1");
//                            e.printStackTrace();
                        }
                    });
                    if (jsonObject.get().get(path[path.length - 1]).getAsString().equals(expected)) {
                        System.out.println("WORK " + numberOfTries);
                        break;
                    } else {
                        System.out.println("SLEEP 1");
                        Thread.sleep(timeToWait);
                    }
                    //jsonObject.get("linkedRoles").getAsJsonArray().get(0).getAsJsonObject().get("linkedRoleStatus").getAsString()
                } else {
                    System.out.println("SLEEP 2");
                    Thread.sleep(timeToWait);
                }
            } catch (e) {
                System.out.println("EX 2");
//                System.out.println(e.getMessage());
                try {
                    Thread.sleep(timeToWait);
                } catch (ex) {
                    throw new RuntimeException(ex);
                }
                // do nothing
            }
        } while (numberOfTries < numberOfRepeats);

        return response;
    }

    public createLXPRole(roleName: string): models.lxp.RoleModel {
        String role = String.format(`{
                            "name": "%s",
                            "enable_permissions": [],
                            "offset": 0,
                            "limit": 25,
                            "all_roles": true
                        }`,
                roleName);

        let response: APIResponse = postInternalRequest("/api/v2/roles", role);

        models.lxp.RoleModel roleModel = new models.lxp.RoleModel();
        roleModel.setName(getJsonBody(response).get("name").getAsString());
        roleModel.setId(getJsonBody(response).get("id").getAsString());

        return roleModel;
    }

    public deleteLXPRole(roleModel: models.lxp.RoleModel): void {
        let response: APIResponse = deleteInternalRequest(mainUserInternalRequest, "/api/v2/roles/" + roleModel.getId());
        this.assertTrue(response.ok());
    }
}
