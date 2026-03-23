import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectWithSkillsScenario implements BaseScenario<CreateProjectPage, ProjectsMePage>{

    private projectTitle: string;
    private projectDesc: string;
    private searchSkillName: string;
    private searchSkillName2: string;
    private searchSkillName3: string;
    private skillLevelValue1: string;
    private skillLevelValue2: string;
    private skillLevelValue3: string;

    public run(entry: CreateProjectPage): ProjectsMePage {
        return entry
                .selectAProjectThumbnail()
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .searchAndSelectASkillAndSkillLevel(searchSkillName,searchSkillName)
                .clickOnTimeCommitmentField()
                .selectASkillLevel(skillLevelValue1)
                .searchAndSelectASkillAndSkillLevel(searchSkillName2,searchSkillName2)
                .clickOnTimeCommitmentField()
                .selectASkillLevel(skillLevelValue2)
                .searchAndSelectASkillAndSkillLevel(searchSkillName3,searchSkillName3)
                .clickOnTimeCommitmentField()
                .selectASkillLevel(skillLevelValue3)
                .clickPublishButton()
                .clickMayBeLaterButton();
    }
}
