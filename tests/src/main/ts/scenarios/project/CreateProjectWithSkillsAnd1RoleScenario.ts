// @ts-nocheck
import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectWithSkillsAnd1RoleScenario implements BaseScenario<CreateProjectPage, ProjectsMePage>{

    private projectTitle: string;
    private projectDesc: string;
    private searchSkillName: string;
    private skillLevel1: string;
    private searchSkillName2: string;
    private skillLevel2: string;
    private searchSkillName3: string;
    private skillLevel3: string;
    private roleNameToTypeAndAssert: string;
    private roleNameToSelect: string;

    public run(entry: CreateProjectPage): ProjectsMePage {
        return entry
                .selectAProjectThumbnail()
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .searchAndSelectASkillAndSkillLevel(searchSkillName, searchSkillName)
                .selectASkillLevel(skillLevel1)
                .searchAndSelectASkillAndSkillLevel(searchSkillName2, searchSkillName2)
                .selectASkillLevel(skillLevel2)
                .searchAndSelectASkillAndSkillLevel(searchSkillName3, searchSkillName3)
                .selectASkillLevel(skillLevel3)
                .searchAndSelectARole(roleNameToTypeAndAssert,roleNameToSelect)
                .clickPublishButton()
                .clickMayBeLaterButton();
    }
}
