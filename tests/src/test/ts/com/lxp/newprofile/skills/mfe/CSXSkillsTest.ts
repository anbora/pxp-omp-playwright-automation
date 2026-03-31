// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { expect } from "common/testing/playwright";

export class CSXSkillsTest extends GroupsRestService {

    private readonly userName: string = "npatil";
    private readonly userPassword: string = "popeye1234";
    private readonly criticalSkillsSection: string = "Critical skills";
    private readonly yourSkillProficiency: string = "Your skill proficiency";
    private readonly yourSkills: string = "Your skills";
    private readonly suggestedSkills: string = "Suggested skills";

    public verifyLoadedCSXSkills(): void {
                let __page1: any = this;
        __page1 = __page1.getCsLoginPage(this.getConfig().getProficiencyURL());
        __page1 = __page1.loginToApplication(this.userName, this.userPassword);
        __page1 = __page1.goDirectlyTo(NewProfilePage);
        __page1 = __page1.openSkillTab();
        expect(__page1.headerOfSection(this.criticalSkillsSection)).toBeVisible();
        __page1.logger.info("Successfully verified that section " + this.criticalSkillsSection + " is visible");
        expect(__page1.headerOfSection(this.yourSkillProficiency)).toBeVisible();
        __page1.logger.info("Successfully verified that section " + this.yourSkillProficiency + " is visible");
        expect(__page1.headerOfSection(this.yourSkills)).toBeVisible();
        __page1.logger.info("Successfully verified that section " + this.yourSkills + " is visible");
        expect(__page1.headerOfSection(this.suggestedSkills)).toBeVisible();
        __page1.logger.info("Successfully verified that section " + this.suggestedSkills + " is visible");
    }
}
