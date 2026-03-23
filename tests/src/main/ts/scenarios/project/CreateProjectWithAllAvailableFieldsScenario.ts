import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectWithAllAvailableFieldsScenario implements BaseScenario<CreateProjectPage, ProjectsMePage>{

    private projectTitle: string;
    private projectDesc: string;
  //  private String locationText;
  //  private String locationName;
    private timeZoneText: string;
    private timeZoneName: string;
    private timeCommitment: string;
    private languageToSearchAndSelect: string;
    private skillName: string;
    private roleNameToTypeAndAssert: string;
    private roleNameToSelect: string;
    private skillLevel: string;

    public run(entry: CreateProjectPage): ProjectsMePage {
        return entry
                .selectAProjectThumbnail()
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .enableApplicationRequired()
               // .selectProjectLocation(locationText, locationName)
                .searchAndSelectATimeZone(timeZoneText, timeZoneName)
                .toggleRemoteWorkPossibleChkBox()
                .fillInTimeCommitment(timeCommitment)
                .searchAndSelectASkillAndSkillLevel(skillName, skillName)
                .searchAndSelectARole(roleNameToTypeAndAssert,roleNameToSelect)
                .selectASkillLevel(skillLevel)
                .searchAndSelectLanguage(languageToSearchAndSelect)
                .clickPublishButton()
                .clickMayBeLaterButton();
    }
}
