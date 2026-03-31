// @ts-nocheck
import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectWithDepartmentOrgFieldScenario implements BaseScenario<CreateProjectPage, ProjectsMePage>{

    private projectTitle: string;
    private projectDesc: string;
    private departmentOrgName: string;

    public run(entry: CreateProjectPage): ProjectsMePage {
        return entry
                .selectAProjectThumbnail()
                .searchAndSelectOrgDepartment(departmentOrgName)
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .enableApplicationRequired()
                .clickPublishButton()
                .clickMayBeLaterButton();
    }
}
