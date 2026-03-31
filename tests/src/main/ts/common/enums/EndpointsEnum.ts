// @ts-nocheck
class EndpointValue {
  constructor(private readonly endpoint: string) {}

  public getEndpoint(): string {
    return this.endpoint;
  }
}

export const EndpointsEnum = {
  JOB_ENDPOINT: new EndpointValue("/api/developer/v5/opportunities/"),
  FUNCTION_ENDPOINT: new EndpointValue("/ext_service/csod/pxp-job-data/v1/job/function/"),
  FAMILY_ENDPOINT: new EndpointValue("/ext_service/csod/pxp-job-data/v1/job/family/"),
  GEOLOCATION_ENDPOINT: new EndpointValue("ext_service/csod/pxp-talent-marketplace-ecs/geolocation/geocode?query=%s&language=en"),
  ROLE_ENDPOINT: new EndpointValue("/ext_service/csod/pxp-job-data/v1/job/role/"),
  MATCHING_DETAILS: new EndpointValue("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/job/%s/matching/details?language=en"),
  MATCHING: new EndpointValue("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/job/%s/matching?language=en&preferences=level,workplace_model,job_type,schedule,job_role_type,career_goal,locations"),
  JOB_RECOMMENDATION: new EndpointValue("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/job?limit=15&language=en&sortType=MATCH&sortOrder=DESC"),
  ROLE_RECOMMENDATION: new EndpointValue("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/role?limit=15&language=en&sortType=MATCH&sortOrder=DESC"),
  SEARCH: new EndpointValue("/api/v2/users/opportunities/search"),
  GROUP_ENDPOINT: new EndpointValue("/api/developer/v5/teams/"),
  ED_CONNECT_JOB_VACANCIES_ENDPOINT: new EndpointValue("/api/developer/v6/job_vacancies/"),
  ED_CONNECT_JOB_VACANCIES_ENDPOINT_WITH_QUERY: new EndpointValue("/api/developer/v6/job_vacancies?"),
  ED_CONNECT_CONTENTS_ENDPOINT: new EndpointValue("/api/developer/v6/contents/"),
  ED_CONNECT_PATHWAYS_ENDPOINT: new EndpointValue("/api/developer/v6/pathways/"),
  ED_CONNECT_JOURNEYS_ENDPOINT: new EndpointValue("/api/developer/v6/journeys/"),
  SMARTCARD_ENDPOINT: new EndpointValue("/api/developer/v5/cards/"),
  SKILLSPASSPORT_ENDPOINT: new EndpointValue("/api/developer/v6/skills-passport"),
  DISPOSITIONS_ENDPOINT: new EndpointValue("/api/developer/v6/dispositions")
} as const;

export type EndpointsEnum = (typeof EndpointsEnum)[keyof typeof EndpointsEnum];
