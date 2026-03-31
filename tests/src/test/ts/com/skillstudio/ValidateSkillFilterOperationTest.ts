// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { OrganizationOperationPage } from "skillstudio/pages/OrganizationOperationPage";
import { SkillLibraryFilterPage } from "skillstudio/pages/SkillLibraryFilterPage";
import { SkillUploadFromTemplatePage } from "skillstudio/pages/SkillUploadFromTemplatePage";
import { expect } from "common/testing/playwright";

export class ValidateSkillFilterOperationTest extends BaseTest {

    search_skills_nav_path: string[] = ["Libraries", "Skills"];
    public validateUploadSkillFromTemplate(): void {

        let dictionary: any = new HashMap();
        let status: string[] = ["Active"];
        let sources: string[] = ["Custom", "Csx"];
        let languages: string[] = ["English"];
        let linkedSkills: string[] = ["Linked"];
        //String[] Fields = {"Labels"};
        dictionary.put("Status", status);
        dictionary.put("Sources", sources);
        dictionary.put("Languages", languages);
        dictionary.put("Linked Skill", linkedSkills);

                let __page1: any = this;
        __page1 = __page1.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page1 = __page1.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page1 = __page1.launchSkillStudio();
        __page1 = __page1.getPageClass(SkillUploadFromTemplatePage);
        __page1 = __page1.navigateHumbergenMenu(this.search_skills_nav_path, SkillLibraryFilterPage);
        __page1 = __page1.clickOnFilter();
        __page1 = __page1.filterParameters(dictionary);
        expect(__page1.verifyAppliedFilterParamLoc("Active")).toBeVisible({ timeout: 30000 });
        expect(__page1.verifyAppliedFilterParamLoc("Csx")).toBeVisible({ timeout: 30000 });
        expect(__page1.verifyAppliedFilterParamLoc("Custom")).toBeVisible({ timeout: 30000 });
        expect(__page1.verifyAppliedFilterParamLoc("English")).toBeVisible({ timeout: 30000 });
        expect(__page1.verifyAppliedFilterParamLoc("Linked")).toBeVisible({ timeout: 30000 });
        __page1 = __page1.logoutSkillsStudio(OrganizationOperationPage);
    }
}
