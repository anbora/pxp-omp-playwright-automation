import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { SkillLibraryFilterAssertions } from "skillstudio/assertions/SkillLibraryFilterAssertions";
import { OrganizationOperationPage } from "skillstudio/pages/OrganizationOperationPage";
import { SkillLibraryFilterPage } from "skillstudio/pages/SkillLibraryFilterPage";
import { SkillUploadFromTemplatePage } from "skillstudio/pages/SkillUploadFromTemplatePage";

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

        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.search_skills_nav_path, SkillLibraryFilterPage)
                .clickOnFilter()
                .filterParameters(dictionary)
                .check(SkillLibraryFilterAssertions)
                .verificationAppliedFilteredParams("Active")
                .verificationAppliedFilteredParams("Csx")
                .verificationAppliedFilteredParams("Custom")
                .verificationAppliedFilteredParams("English")
                .verificationAppliedFilteredParams("Linked")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }
}
