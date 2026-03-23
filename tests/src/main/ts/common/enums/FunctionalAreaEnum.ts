import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";

export enum FunctionalAreaEnum {

	ADMIN(REACH, "ADMIN", "ADMIN", true, 8),
	CAREER_WIZARD(APOLLO, "CAREER_WIZARD", "CAREER_WIZARD", true, 5),
	EDCAST_API(APOLLO, "EDCAST_API", "EDCAST_API", false, 1),
	EDCAST_PUBLIC_API(APOLLO, "EDCAST_PUBLIC_API", "EDCAST_PUBLIC_API", false, 4),
	HOMELESS(COMMODORE, "HOMELESS", "HOMELESS", true, 6),
	JOBS(AVISTA, "JOBS", "JOBS", true, 1),
	LANDING(CREWMATES, "LANDING", "LANDING", true, 10),
	MATCHING(AVISTA, "MATCHING", "MATCHING", true, 5),
	MENTORSHIP(CREWMATES, "MENTORSHIP", "MENTORSHIP", false, 1),
	OTHER(COMMODORE, "OTHER", "OTHER", true, 12),
	REFRESH(COMMODORE, "REFRESH", "REFRESH", false, 12),
	PROFILES(AVISTA, "PROFILES", "PROFILES", true, 9),
	PROJECT(CREWMATES, "PROJECT", "PROJECT", true, 1),
	RECOMMENDATIONS(AVISTA, "RECOMMENDATIONS", "RECOMMENDATIONS", true, 4),
	ROLES(AVISTA, "ROLES", "ROLES", true, 4),
	SEARCH(AVISTA, "SEARCH", "SEARCH", true, 7),
	SOCIATIVE(AVISTA, "SOCIATIVE", "SOCIATIVE", true, 13),
	CREATECOLLECTION(CONTENTSTUDIO, "CS", "CS", true, 13),
	TALENTSOURCING(INTERCEPTOR, "TALENTSOURCING", "TALENTSOURCING", false, 1),
	TALENTSOURCING_API(INTERCEPTOR, "TALENTSOURCING_API", "TALENTSOURCING_API", false, 1),
	PXP_JOB_DATA(COMMODORE, "PXP_JOB_DATA", "PXP_JOB_DATA", false, 1),
	PXP_TM_SEARCH_SVC(COMMODORE,"PXP_TM_SEARCH_SVC", "PXP_TM_SEARCH_SVC", false, 1),
	ME(COMMODORE, "ME", "ME", true, 5),
	SKILLSTUDIO_SUITE(SKILLSTUDIO, "SS", "SS", true, 13),
	GROUPS(CASCADA, "GROUPS", "GROUPS", true,14),
	ED_CONNECT(APOLLO, "ED_CONNECT", "ED_CONNECT", false, 15),
	CONTENT_MANAGEMENT(CASCADA, "SMART_CARDS", "SMART_CARDS", false, 16),
	SKILLS_PASSPORT(ESPRIT,"SKILLS_PASSPORT" ,"SKILLS_PASSPORT" ,false ,17);

	private readonly suiteName: string;
	private readonly suiteParam: string;
	private readonly parallel: boolean;
	private readonly order: number;
	private readonly teamResponsible: TeamsResponsibleEnum;

	constructor(teamResponsible: TeamsResponsibleEnum, suiteName: string, suiteParam: string, parallel: boolean, order: number) {
		this.suiteName = suiteName;
		this.suiteParam = suiteParam;
		this.parallel = parallel;
		this.teamResponsible = teamResponsible;
		this.order = order;
	}

	public getSuiteName(): string {

	  return suiteName;
	}

	public getSuiteParam(): string {

	  return suiteParam;
	}

	public getParallel(): boolean {

	  return parallel;
	}

	public getOrder(): number {

	  return order;
	}

	public getTeamResponsible(): TeamsResponsibleEnum {

	  return teamResponsible;
	}

	public static getOrderOfArea(suiteName: string): number {

	  return getEnumBySuiteName(suiteName).getOrder();

	}

	public static getParallelOfArea(suiteName: string): boolean {

	  return getEnumBySuiteName(suiteName).getParallel();

	}

	private static getEnumBySuiteName(suiteName: string): FunctionalAreaEnum {
		return Arrays.stream(FunctionalAreaEnum.values())
				.filter(p => p.getSuiteName().equals(suiteName))
				.findFirst().get();
	}

}
