import { NewProfileSkillsPageAssertions } from "assertions/newprofile/skills/NewProfileSkillsPageAssertions";
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";

export class CSXSkillsTest extends GroupsRestService {

    private readonly userName: string = "npatil";
    private readonly userPassword: string = "popeye1234";
    private readonly criticalSkillsSection: string = "Critical skills";
    private readonly yourSkillProficiency: string = "Your skill proficiency";
    private readonly yourSkills: string = "Your skills";
    private readonly suggestedSkills: string = "Suggested skills";

    public verifyLoadedCSXSkills(): void {
        this.getCsLoginPage(this.getConfig().getProficiencyURL())
                .loginToApplication(this.userName, this.userPassword)
                .goDirectlyTo(NewProfilePage)
                .openSkillTab()
                .check(NewProfileSkillsPageAssertions)
                    .assertThatSectionIsVisible(this.criticalSkillsSection)
                    .assertThatSectionIsVisible(this.yourSkillProficiency)
                    .assertThatSectionIsVisible(this.yourSkills)
                    .assertThatSectionIsVisible(this.suggestedSkills)
                .endAssertion();
    }
}
