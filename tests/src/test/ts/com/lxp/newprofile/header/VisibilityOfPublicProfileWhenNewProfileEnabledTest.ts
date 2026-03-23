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

export class VisibilityOfPublicProfileWhenNewProfileEnabledTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldDisplayPublicProfileOfSelfIfPrivateToYouEnabled(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .check(NewProfilePageAssertions)
                    .assertThatViewPublicProfileButtonIsDisplayed()
                .endAssertion()
                .clickPublicProfileButton()
                .check(NewProfilePageAssertions)
                    .assertThatUsernameIsVisible(this.user)
                    .assertThatContactInfoButtonIsNotDisplayed()
                    .assertThatShowMoreDetailButtonIsNotDisplayed()
                .endAssertion()
                .clickExitPublicProfileButton()
                .check(NewProfilePageAssertions)
                    .assertThatContactInfoButtonIsDisplayed()
                    .assertThatFollowersButtonIsDisplayed()
                    .assertThatFollowingButtonIsDisplayed()
                    .assertThatShowMoreDetailButtonIsDisplayed()
                    .assertThatAddProfileSectionButtonIsDisplayed()
                    .assertThatViewPublicProfileButtonIsDisplayed()
                    .assertThatShowOrganizationButtonIsDisplayed()
                    .assertThatPencilIconIsDisplayed();
    }

    public shouldDisplayPublicProfileOfSelfIfPrivateToYouDisabled(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .check(NewProfilePageAssertions)
                    .assertThatViewPublicProfileButtonIsDisplayed()
                .endAssertion()
                .clickContactInfoButton()
                .clickPrivateToYouSwitch()
                .closeContactInfoModal()
                .check(NewProfilePageAssertions)
                    .assertThatPrivateToYouSwitchForContactInfoModalIsDisabled()
                .endAssertion()
                .clickShowMoreDetailButton()
                .clickPrivateToYouSwitch()
                .closeShowMoreDetailModal()
                .clickPublicProfileButton()
                .check(NewProfilePageAssertions)
                    .assertThatUsernameIsVisible(this.user)
                    .assertThatContactInfoButtonIsDisplayed()
                    .assertThatShowMoreDetailButtonIsDisplayed();

    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
