// @ts-nocheck
class MicroserviceValue {
  constructor(private readonly microserviceName: string) {}

  public getMicroserviceName(): string {
    return this.microserviceName;
  }
}

export const MicroserviceEnum = {
  PXP_JOB_DATA: new MicroserviceValue("/pxp-job-data"),
  PXP_TM_SEARCH_SVC: new MicroserviceValue("/pxp-tm-search-svc"),
  PXP_TALENT_DATA: new MicroserviceValue("/pxp-talent-data")
} as const;

export type MicroserviceEnum = (typeof MicroserviceEnum)[keyof typeof MicroserviceEnum];
