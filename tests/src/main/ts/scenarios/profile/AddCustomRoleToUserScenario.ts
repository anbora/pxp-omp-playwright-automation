// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseScenario } from "common/BaseScenario";
import { UserModel } from "models/user/UserModel";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";

export class AddCustomRoleToUserScenario implements BaseScenario<BasePage, ProfileDetailsPage>{

    private user: UserModel;
    private shortRoleName: string;
    private fullRoleName: string;

    public run(entry: BasePage): ProfileDetailsPage {
        return entry
                .goToEditProfileFromUserDropDown(user.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(shortRoleName, fullRoleName)
                .clickSelectButton()
                .clickSaveButton();
    }
}
