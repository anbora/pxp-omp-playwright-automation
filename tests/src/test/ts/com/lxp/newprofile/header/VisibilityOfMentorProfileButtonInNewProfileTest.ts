import { NewProfilePageAssertions } from "assertions/newprofile/NewProfilePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class VisibilityOfMentorProfileButtonInNewProfileTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private readonly skillName: string = "java";
    private readonly description: string = "Become a mentor" + VisibilityOfMentorProfileButtonInNewProfileTest.RANDOM_SUFFIX;;

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldDisplayMentorProfile(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .clickAddYourSkillsButton()
                .clickAddSkillTag()
                .selectSkillLevel()
                .clickSaveButton()
                .goDirectlyTo(WelcomePage_New)
                .goToMenthorshipPageViaTab()
                .clickBecomeAMentor()
                .clickOnCreateProfileButton()
                .addSkillsAndDescription(this.skillName, this.skillName, this.description)
                .clickOnCreateProfileButton()
                .clickOnCloseMentorProfileButton()
                .goDirectlyTo(NewProfilePage)
                .clickPublicProfileButton()
                .check(NewProfilePageAssertions)
                    .assertThatMentorProfileButtonIsDisplayed();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
