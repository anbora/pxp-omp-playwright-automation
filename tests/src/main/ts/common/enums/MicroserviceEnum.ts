export enum MicroserviceEnum {

    PXP_JOB_DATA("/pxp-job-data"),
    PXP_TM_SEARCH_SVC("/pxp-tm-search-svc"),
    PXP_TALENT_DATA("/pxp-talent-data");

    private readonly microserviceName: string;

  MicroserviceEnum(microserviceName: string):  {

    this.microserviceName = microserviceName;

  }
}
