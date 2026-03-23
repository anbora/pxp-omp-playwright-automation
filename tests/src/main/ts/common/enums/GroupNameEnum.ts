export enum GroupNameEnum {

    /***
     * OMP GROUPS:
     */
    OMP_FEATURE             ("ompFeature"),
    OMP_SMOKE               ("ompSmoke"),
    OMP_REGRESSION          ("ompRegression"),
    OMP_AUTOMATION_ONLY     ("ompAutomationOnly"),
    OMP_OTHER               ("ompOther"),
    OMP_TEST                ("ompTest"),
    OMP_TRANSLATION         ("ompTranslation"),

    /***
     * CS GROUPS:
     */
    CS_FEATURE  	        ("csFeature"),
    CS_SMOKE	            ("csSmoke"),
    CS_REGRESSION  	        ("csRegression"),
    SS_SMOKE                ("ssSmoke"),

    /***
     * LXP GROUPS:
     */

    LXP_FEATURE  	        ("lxpFeature"),
    LXP_SMOKE	            ("lxpSmoke"),
    LXP_REGRESSION  	    ("lxpRegression");

    private readonly groupName: string;

  GroupNameEnum(groupName: string):  {

    this.groupName = groupName;

  }

    public getGroupName(): string {

      return groupName;
    }
}
