import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectWithUploadThumbnailScenario implements BaseScenario<CreateProjectPage, ProjectsMePage>{

    private projectTitle: string;
    private projectDesc: string;

    public run(entry: CreateProjectPage): ProjectsMePage {
        return entry
                .selectUploadImageProjectThumbnail()
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .clickPublishButton()
                .clickMayBeLaterButton();
    }
}
