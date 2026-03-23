import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectWithSuggestedSkillsScenario implements BaseScenario<CreateProjectPage, ProjectsMePage>{

    private projectTitle: string;
    private projectDesc: string;
    private suggestedSkillName: string;

    public run(entry: CreateProjectPage): ProjectsMePage {
        return entry
                .selectAProjectThumbnail()
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .selectSkillFromSuggestedSkillsModal(suggestedSkillName)
                .clickPublishButton()
                .clickMayBeLaterButton();
    }
}
