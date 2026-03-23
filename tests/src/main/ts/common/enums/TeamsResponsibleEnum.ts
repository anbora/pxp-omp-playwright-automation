export enum TeamsResponsibleEnum {
    AVISTA("Avista Team"),
    APOLLO("Apollo Team"),
    INTERCEPTOR("Interceptor Team"),
    COMMODORE ("Commodore Team"),
    CREWMATES ("Crewmates Team"),
    REACH ("Reach Team"),
    UNASSIGNED("Unassigned"),
    CONTENTSTUDIO("ContentStudio Team"),
    SKILLSTUDIO("SkillsStudio Team"),
    CASCADA("Cascada Team"),
    ESPRIT("Esprit Team");

    private readonly teamName: string;

  TeamsResponsibleEnum(teamName: string):  {

    this.teamName = teamName;

  }

    public getTeamName(): string {

      return teamName;
    }

}
