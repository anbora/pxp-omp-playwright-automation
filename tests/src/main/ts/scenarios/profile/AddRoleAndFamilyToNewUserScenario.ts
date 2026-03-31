// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseScenario } from "common/BaseScenario";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";

export class AddRoleAndFamilyToNewUserScenario implements BaseScenario<BasePage, ProfileDetailsPage>{

    private static readonly shortRoleName: string = "Java developer";
    private static readonly fullRoleName: string = "Unusual job family -  Java developer";
    private userName: string;
    private static readonly location: string = "TestingQA";

    public run(entry: BasePage): ProfileDetailsPage {
        return entry
                .goToEditProfileFromUserDropDown(userName)
                .clickEditProfileButton()
                .clickAddLocation(location)
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(shortRoleName, fullRoleName)
                .clickSelectButton()
                .clickSaveButton();
    }
}
