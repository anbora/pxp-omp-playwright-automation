export enum EndpointsEnum {
    JOB_ENDPOINT("/api/developer/v5/opportunities/"),
    FUNCTION_ENDPOINT("/ext_service/csod/pxp-job-data/v1/job/function/"),
    FAMILY_ENDPOINT("/ext_service/csod/pxp-job-data/v1/job/family/"),
    GEOLOCATION_ENDPOINT("ext_service/csod/pxp-talent-marketplace-ecs/geolocation/geocode?query=%s&language=en"),
    ROLE_ENDPOINT("/ext_service/csod/pxp-job-data/v1/job/role/"),
    MATCHING_DETAILS("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/job/%s/matching/details?language=en"),
    MATCHING("/ext_service/csod/pxp-talent-marketplace-ecs/opportunities/job/%s/matching?language=en&preferences=level,workplace_model,job_type,schedule,job_role_type,career_goal,locations"),
    JOB_RECOMMENDATION("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/job?limit=15&language=en&sortType=MATCH&sortOrder=DESC"),
    ROLE_RECOMMENDATION("/ext_service/csod/pxp-talent-marketplace-ecs/matching/opportunities-matcher/role?limit=15&language=en&sortType=MATCH&sortOrder=DESC"),
    SEARCH("/api/v2/users/opportunities/search"),
    GROUP_ENDPOINT("/api/developer/v5/teams/"),
    ED_CONNECT_JOB_VACANCIES_ENDPOINT("/api/developer/v6/job_vacancies/"),
    ED_CONNECT_JOB_VACANCIES_ENDPOINT_WITH_QUERY("/api/developer/v6/job_vacancies?"),
    ED_CONNECT_CONTENTS_ENDPOINT("/api/developer/v6/contents/"),
    ED_CONNECT_PATHWAYS_ENDPOINT("/api/developer/v6/pathways/"),
    ED_CONNECT_JOURNEYS_ENDPOINT("/api/developer/v6/journeys/"),
    SMARTCARD_ENDPOINT ("/api/developer/v5/cards/"),
    SKILLSPASSPORT_ENDPOINT("/api/developer/v6/skills-passport"),
    DISPOSITIONS_ENDPOINT("/api/developer/v6/dispositions");

    private readonly endpoint: string;

  EndpointsEnum(endpoint: string):  {

    this.endpoint = endpoint;

  }

    public getEndpoint(): string {

      return endpoint;
    }
}
