import { BaseScenario } from "common/BaseScenario";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ShareProjectPage } from "pages/careergrowth/share/ShareProjectPage";

export class CreateProjectWithLocationAndShareScenario implements BaseScenario<CreateProjectPage, ShareProjectPage>{

    private projectTitle: string;
    private projectDesc: string;
    private locationText: string;
    private locationName: string;

    public run(entry: CreateProjectPage): ShareProjectPage {
        return entry
                .selectAProjectThumbnail()
                .fillInProjectTitle(projectTitle)
                .fillInProjectDescription(projectDesc)
                .selectProjectLocation(locationText, locationName)
                .clickPublishButton()
                .clickShareButton();
    }
}
