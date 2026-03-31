// @ts-nocheck
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
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
