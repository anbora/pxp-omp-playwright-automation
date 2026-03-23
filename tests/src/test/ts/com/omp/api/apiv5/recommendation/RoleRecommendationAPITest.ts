import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIRequestContext, APIResponse } from "common/testing/playwright";

export class RoleRecommendationAPITest extends BaseRestTest {

    private user1RequestContext: APIRequestContext;
    private user2RequestContext: APIRequestContext;

    public initialize(): void {
      this.user1RequestContext = this.loginToAUserForInternalRequest(this.getUserByName("user6"));
      this.user2RequestContext = this.loginToAUserForInternalRequest(this.getUserByName("user2"));
    }

    public checkNoRecommendationsForJobs(): void {
        let response: APIResponse = this.postInternalRequest(this.user1RequestContext, EndpointsEnum.ROLE_RECOMMENDATION.getEndpoint(), "{}");

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertResponseSizeIsEmpty(response);
    }

    public checkExcellentRecommendationForJobs(): void {
        let response: APIResponse = this.postInternalRequest(this.user2RequestContext, EndpointsEnum.ROLE_RECOMMENDATION.getEndpoint(), "{}");

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "[0]/title", "Financial planning and analysis manager - Senior");
        this.apiAssertions.assertGreaterThan(response, "[0]/overallScore", 82);
        this.apiAssertions.assertLowerThan(response, "[0]/overallScore", 101);
        this.apiAssertions.assertEqual(response, "[0]/overallScoreStatus", "EXCELLENT");
    }

    public checkGoodRecommendationForJobs(): void {
        let response: APIResponse = this.postInternalRequest(this.user2RequestContext, EndpointsEnum.ROLE_RECOMMENDATION.getEndpoint(), "{}");

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "[1]/title", "Financial planning and analysis manager - Senior Chief Executive");
        this.apiAssertions.assertGreaterThan(response, "[1]/overallScore", 64);
        this.apiAssertions.assertLowerThan(response, "[1]/overallScore", 83);
        this.apiAssertions.assertEqual(response, "[1]/overallScoreStatus", "GOOD");
    }

    public checkFairRecommendationForJobs(): void {
        let response: APIResponse = this.postInternalRequest(this.user2RequestContext, EndpointsEnum.ROLE_RECOMMENDATION.getEndpoint(), "{}");

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "[2]/title", "Financial planning and analysis manager - Chief Data Privacy");
        this.apiAssertions.assertGreaterThan(response, "[2]/overallScore", 39);
        this.apiAssertions.assertLowerThan(response, "[2]/overallScore", 65);
        this.apiAssertions.assertEqual(response, "[2]/overallScoreStatus", "FAIR");
    }
}
