// @ts-nocheck
import { BaseGatling } from "com/omp/BaseGatling";

export class SimplePerformanceTest extends BaseGatling {

  private uri06: string = "https://resources-preview.edcast.io/translations/edcast/web/20240201081353";

  private scn: any = scenario("SimplePerformanceTest").repeat(5).on(() => exec(
    http("request_0")
      .get("/career")
      .headers(this.headersWithToken)
      .resources(
        http("request_13")
          .get("/api/v2/organizations/mapped_organizations")
          .headers(this.headersWithToken),
        http("request_14")
          .get("/api/v2/teams.json?role=admin&fields=id")
          .headers(this.headersWithToken),
        http("request_16")
          .get("/api/v2/teams.json?role=sub_admin&fields=id%2C%20name")
          .headers(this.headersWithToken),
        http("request_18")
          .get("/api/v2/users/accessible_candidates.json?personalize_by=false")
          .headers(this.headersWithToken),
        http("request_19")
          .get("/api/settings/version.json")
          .headers(this.headersWithToken),
        http("request_23")
          .get("/api/v2/notifications?limit=5&offset=0")
          .headers(this.headersWithToken),
        http("request_24")
          .get("/translations/en/edcast_translation.csv")
          .headers(this.headersWithToken),
        http("request_25")
          .get("/api/v2/users/notification_config")
          .headers(this.headersWithToken),
        http("/api/v2/configs")
          .get("/api/v2/configs?names%5B%5D=coach_eddy_api_url&names%5B%5D=custom_badges_bucket_name&names%5B%5D=custom_badges_region&names%5B%5D=domo_url&names%5B%5D=zoom_api&names%5B%5D=default_topics&names%5B%5D=guide_me_config&names%5B%5D=enable_guide_me&names%5B%5D=fsp_gtc_config&names%5B%5D=skills_passport_options&configable_type=Organization")
          .headers(this.headersWithToken),
        http("request_27")
          .get("/api/v2/organizations/locations?limit=150&offset=0")
          .headers(this.headersWithToken),
        http("job_roles/details")
          .get("/api/v2/users/job_roles/details?career_growth=true&language=en")
          .headers(this.headersWithToken),
        http("pxp-job-data/v1/configs")
          .get("/ext_service/csod/pxp-job-data/v1/configs?groupId=hr-loc&id=config")
          .headers(this.headersWithToken),
        http("pxp-job-data/v1/configs_2")
          .get("/ext_service/csod/pxp-job-data/v1/configs?groupId=hr-org&id=config")
          .headers(this.headersWithToken),
        http("/profiles/notifications_2")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/profiles/notifications")
          .headers(this.headersWithToken),
        http("/internal/configuration/getHrDataConfig/jobrole")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/internal/configuration/getHrDataConfig/jobrole")
          .headers(this.headersWithToken)
      ),
    this.pause(3),
        http("/opportunities/aspirational")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/aspirational")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0044_request.json")),
    this.pause(3),
        http("request_55")
          .get("/ext_service/csod/pxp-job-data/v1/lovs?groupId=hr-org-type-lov")
          .headers(this.headersWithToken),
        http("request_57")
          .get("/ext_service/csod/pxp-job-data/v1/configs?groupId=hr-org-config")
          .headers(this.headersWithToken),
        http("/api/v2/users/opportunities/recommended")
          .post("/api/v2/users/opportunities/recommended")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0058_request.json")),
        http("/api/v2/users/opportunities/recommended_2")
          .post("/api/v2/users/opportunities/recommended")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0060_request.json")),
        http("/matching/opportunities-matcher/job")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/job?limit=15&language=en")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0070_request.json")),
        http("/skills_users/360/credentials")
          .get("/api/v2/users/skills_users/360/credentials")
          .headers(this.headersWithToken),
        http("/career_development/preferences")
          .get("/api/v2/users/career_development/preferences")
          .headers(this.headersWithToken),
        http("/work_history/find?limit=0")
          .post("/api/v2/users/work_history/find?limit=0")
          .headers(this.headersWithToken),
    this.pause(3),
        http("/matching/opportunities-matcher/role")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/role?limit=15&language=en")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0078_request.json")),
    this.pause(3),
        http("request_84")
          .get(uri06 + "/talentmarketplace/career-path/en-US.json")
          .headers(this.headersWithToken),
    this.pause(3),
        http("/role/discover-roles")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/role/discover-roles?language=en&jobFamilies=&preferences=level%2Cjob_role_type%2Ccareer_goal%2Corganizations")
          .headers(this.headersWithToken),
    this.pause(3),
        http("request_106")
          .get("/ext_service/csod/pxp-job-data/v1/configs?groupId=hr-org-config")
          .headers(this.headersWithToken),
        http("/matching/opportunities-matcher/role_2")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/role?limit=15&language=en&sortType=MATCH&sortOrder=DESC")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0110_request.json")),
        http("/v2/opportunities")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/v2/opportunities")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0111_request.json")),
    this.pause(3),
        http("request_116")
          .get(uri06 + "/recommendations/transision-recommendations/en-US.json")
          .headers(this.headersWithToken),
        http("/pxp-job-data/v1/configs")
          .get("/ext_service/csod/pxp-job-data/v1/configs?groupId=hr-org-config")
          .headers(this.headersWithToken),
        http("/opportunities/role/{roleId}/matching")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/role/17063750821/matching?language=en&preferences=level%2Cjob_role_type%2Ccareer_goal%2Corganizations&overallScore=90&skillsGraphScore=87")
          .headers(this.headersWithToken),
        http("request_128")
          .get("/api/v2/users/opportunities/8661990431978276389/users_with_similar_role")
          .headers(this.headersWithToken),
        http("request_129")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/jobs/config")
          .headers(this.headersWithToken),
        http("/role/{roleId}/shortest-paths")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/role/17063750821/shortest-paths?language=en")
          .headers(this.headersWithToken),
        http("/v2/opportunities_2")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/v2/opportunities")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0133_request.json")),
        http("/opportunities/aspirational_2")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/aspirational")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0134_request.json")),
    this.pause(3),
        http("/profiles/notifications")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/profiles/notifications")
          .headers(this.headersWithToken),
    this.pause(3),
        http("/opportunities/aspirational_3")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/aspirational")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0148_request.json")),
        http("/v2/opportunities_3")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/v2/opportunities")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0149_request.json")),
        http("/matching/opportunities-matcher/role_3")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/role?limit=15&language=en&sortType=MATCH&sortOrder=DESC")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0150_request.json")),
    this.pause(3),
        http("/v2/opportunities_4")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/v2/opportunities")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0160_request.json")),
        http("/matching/opportunities-matcher/job_2")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/job?limit=15&language=en&sortType=MATCH&sortOrder=DESC")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0161_request.json")),
        http("/skills_users/360/credentials_2")
          .get("/api/v2/users/skills_users/360/credentials")
          .headers(this.headersWithToken),
        http("request_163")
          .post("/api/v2/users/work_history/find?limit=0")
          .headers(this.headersWithToken),
    this.pause(3),
        http("request_172")
          .get("/ext_service/csod/pxp-job-data/v1/configs?groupId=hr-org-config")
          .headers(this.headersWithToken),
        http("/opportunities/job/{jobId}/matching")
          .get("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/job/srlqa000711/matching?language=en&preferences=level%2Cworkplace_model%2Cjob_type%2Cschedule%2Cjob_role_type%2Ccareer_goal%2Clocations%2Corganizations&overallScore=38&skillsGraphScore=52")
          .headers(this.headersWithToken),
        http("/opportunities/aspirational_4")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/aspirational")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0179_request.json")),
    this.pause(3),
        http("/v2/opportunities_5")
          .post("/ext_service/csod/pxp-talent-marketplace-ecs/v2/opportunities")
          .headers(this.headersWithToken)
          .body(RawFileBody("com/omp/simpleperformancetest/0181_request.json"))
  ));

//    {
//	    setUp(scn.injectOpen(
//                nothingFor(2),
//                atOnceUsers(1))
//        ).protocols(this.httpProtocol);
//    }
    constructor() {
        super();
        this.setUp(this.scn.injectOpen(
                nothingFor(5),
                atOnceUsers(10),
                rampUsers(190).during(20))
        ).protocols(this.httpProtocol);
    }
}

// 10  |  90   = 100 x 10 = 1000

// 2   |  3    = 5
// 5   |  10   = 15
// ----------------
// 10  |  20   = 30
// 15  |  35   = 50  - duration(10)
// 10  |  65   = 75  - one timeout
// 10  |  90   = 100 - brake point
