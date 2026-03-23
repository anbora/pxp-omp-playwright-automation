import { NewProfileOrganizationTreeModalPageAssertions } from "assertions/newprofile/NewProfileOrganizationTreeModalPageAssertions";
import { NewProfilePageAssertions } from "assertions/newprofile/NewProfilePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class VisibilityOfProfileHeaderInNewProfileTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldDisplayProfileHeaderInformation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .check(NewProfilePageAssertions)
                    .assertThatContactInfoButtonIsDisplayed()
                    .assertThatFollowersButtonIsDisplayed()
                    .assertThatFollowingButtonIsDisplayed()
                    .assertThatShowMoreDetailButtonIsDisplayed()
                    .assertThatAddProfileSectionButtonIsDisplayed()
                    .assertThatViewPublicProfileButtonIsDisplayed()
                    .assertThatShowOrganizationButtonIsDisplayed()
                    .assertThatPencilIconIsDisplayed()
                .endAssertion()
                .clickShowOrganizationButton()
                .check(NewProfileOrganizationTreeModalPageAssertions)
                    .assertThatShowOrganizationTreeContainsUsersName(this.user.fullName);
    }

    public shouldDisablePrivateToYouSwitchForContactInfoModal(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .clickContactInfoButton()
                .clickPrivateToYouSwitch()
                .closeContactInfoModal()
                .check(NewProfilePageAssertions)
                    .assertThatPrivateToYouSwitchForContactInfoModalIsDisabled();
    }

    public shouldEnablePrivateToYouSwitchForContactInfoModal(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .clickContactInfoButton()
                .clickPrivateToYouSwitch()
                .closeContactInfoModal()
                .check(NewProfilePageAssertions)
                    .assertThatPrivateToYouSwitchForContactInfoModalIsEnabled();
    }

    public shouldDisablePrivateToYouSwitchForSeeMoreDetailModal(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .clickShowMoreDetailButton()
                .clickPrivateToYouSwitch()
                .closeShowMoreDetailModal()
                .check(NewProfilePageAssertions)
                    .assertThatPrivateToYouSwitchForShowMoreDetailModalIsDisabled();
    }

    public shouldEnablePrivateToYouSwitchForSeeMoreDetailModal(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .clickShowMoreDetailButton()
                .clickPrivateToYouSwitch()
                .closeShowMoreDetailModal()
                .check(NewProfilePageAssertions)
                    .assertThatPrivateToYouSwitchForShowMoreDetailModalIsEnabled();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
