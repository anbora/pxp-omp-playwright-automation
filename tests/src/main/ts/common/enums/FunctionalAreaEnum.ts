// @ts-nocheck
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";

class FunctionalAreaValue {
  constructor(
    private readonly teamResponsible: TeamsResponsibleEnum,
    private readonly suiteName: string,
    private readonly suiteParam: string,
    private readonly parallel: boolean,
    private readonly order: number
  ) {}

  public getSuiteName(): string {
    return this.suiteName;
  }

  public getSuiteParam(): string {
    return this.suiteParam;
  }

  public getParallel(): boolean {
    return this.parallel;
  }

  public getOrder(): number {
    return this.order;
  }

  public getTeamResponsible(): TeamsResponsibleEnum {
    return this.teamResponsible;
  }
}

const values = {
  ADMIN: new FunctionalAreaValue(TeamsResponsibleEnum.REACH, "ADMIN", "ADMIN", true, 8),
  CAREER_WIZARD: new FunctionalAreaValue(TeamsResponsibleEnum.APOLLO, "CAREER_WIZARD", "CAREER_WIZARD", true, 5),
  EDCAST_API: new FunctionalAreaValue(TeamsResponsibleEnum.APOLLO, "EDCAST_API", "EDCAST_API", false, 1),
  EDCAST_PUBLIC_API: new FunctionalAreaValue(TeamsResponsibleEnum.APOLLO, "EDCAST_PUBLIC_API", "EDCAST_PUBLIC_API", false, 4),
  HOMELESS: new FunctionalAreaValue(TeamsResponsibleEnum.COMMODORE, "HOMELESS", "HOMELESS", true, 6),
  JOBS: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "JOBS", "JOBS", true, 1),
  LANDING: new FunctionalAreaValue(TeamsResponsibleEnum.CREWMATES, "LANDING", "LANDING", true, 10),
  MATCHING: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "MATCHING", "MATCHING", true, 5),
  MENTORSHIP: new FunctionalAreaValue(TeamsResponsibleEnum.CREWMATES, "MENTORSHIP", "MENTORSHIP", false, 1),
  OTHER: new FunctionalAreaValue(TeamsResponsibleEnum.COMMODORE, "OTHER", "OTHER", true, 12),
  REFRESH: new FunctionalAreaValue(TeamsResponsibleEnum.COMMODORE, "REFRESH", "REFRESH", false, 12),
  PROFILES: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "PROFILES", "PROFILES", true, 9),
  PROJECT: new FunctionalAreaValue(TeamsResponsibleEnum.CREWMATES, "PROJECT", "PROJECT", true, 1),
  RECOMMENDATIONS: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "RECOMMENDATIONS", "RECOMMENDATIONS", true, 4),
  ROLES: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "ROLES", "ROLES", true, 4),
  SEARCH: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "SEARCH", "SEARCH", true, 7),
  SOCIATIVE: new FunctionalAreaValue(TeamsResponsibleEnum.AVISTA, "SOCIATIVE", "SOCIATIVE", true, 13),
  CREATECOLLECTION: new FunctionalAreaValue(TeamsResponsibleEnum.CONTENTSTUDIO, "CS", "CS", true, 13),
  TALENTSOURCING: new FunctionalAreaValue(TeamsResponsibleEnum.INTERCEPTOR, "TALENTSOURCING", "TALENTSOURCING", false, 1),
  TALENTSOURCING_API: new FunctionalAreaValue(TeamsResponsibleEnum.INTERCEPTOR, "TALENTSOURCING_API", "TALENTSOURCING_API", false, 1),
  PXP_JOB_DATA: new FunctionalAreaValue(TeamsResponsibleEnum.COMMODORE, "PXP_JOB_DATA", "PXP_JOB_DATA", false, 1),
  PXP_TM_SEARCH_SVC: new FunctionalAreaValue(TeamsResponsibleEnum.COMMODORE, "PXP_TM_SEARCH_SVC", "PXP_TM_SEARCH_SVC", false, 1),
  ME: new FunctionalAreaValue(TeamsResponsibleEnum.COMMODORE, "ME", "ME", true, 5),
  SKILLSTUDIO_SUITE: new FunctionalAreaValue(TeamsResponsibleEnum.SKILLSTUDIO, "SS", "SS", true, 13),
  GROUPS: new FunctionalAreaValue(TeamsResponsibleEnum.CASCADA, "GROUPS", "GROUPS", true, 14),
  ED_CONNECT: new FunctionalAreaValue(TeamsResponsibleEnum.APOLLO, "ED_CONNECT", "ED_CONNECT", false, 15),
  CONTENT_MANAGEMENT: new FunctionalAreaValue(TeamsResponsibleEnum.CASCADA, "SMART_CARDS", "SMART_CARDS", false, 16),
  SKILLS_PASSPORT: new FunctionalAreaValue(TeamsResponsibleEnum.ESPRIT, "SKILLS_PASSPORT", "SKILLS_PASSPORT", false, 17)
} as const;

export const FunctionalAreaEnum = {
  ...values,
  values: (): FunctionalAreaValue[] => Object.values(values),
  getOrderOfArea: (suiteName: string): number =>
    Object.values(values).find((value) => value.getSuiteName() === suiteName)?.getOrder() ?? 0,
  getParallelOfArea: (suiteName: string): boolean =>
    Object.values(values).find((value) => value.getSuiteName() === suiteName)?.getParallel() ?? false
} as const;

export type FunctionalAreaEnum = (typeof values)[keyof typeof values];
