import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class SkillsPassportVisibilitySanityTest extends BaseRestTest {

    private skill: string = "skill";
    private refinery: string = "refinery";
    private beginner: string = "Beginner";
    private skills: string = "Skills";
    private publicType: string = "Public";
    private privateType: string = "Private";
    private userLastName: string = " User";

    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser();
//        this.waitForResponse(15000);
      this.user2 = this.createUser();
    }

    public shouldCheckIfSkillsPassportChangesAccordingToSettings(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickAddMoreSkillsButton()
                .selectSkillType()
                .selectSkillFromInput(this.refinery, this.refinery)
                .selectSkillLevel(this.beginner)
                .clickSaveButton()
                .openVisibilityModal(this.skills)
                .setVisibility(this.publicType)
                .saveChanges()
                .viewPublicProfile()
                .check(MePageAssertions)
                    .assertThatSkillPassportTabIsDisplayed()
                .endAssertion()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(this.refinery);
    }

    public shouldVerifyPublicVisibilityForOtherUser(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .useKeywordSearch(this.user.name)
                .visitPeopleTab()
                .goToUserProfile(this.user.name + this.userLastName)
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(this.refinery);
    }

    public shouldSetVisibilityToPrivate(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .openVisibilityModal(this.skills)
                .setVisibility(this.privateType)
                .saveChanges()
                .viewPublicProfile()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsNotVisible(this.refinery);
    }

    public shouldVerifyPrivateVisibilityForOtherUser(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .useKeywordSearch(this.user.name)
                .visitPeopleTab()
                .goToUserProfile(this.user.name + this.userLastName)
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsNotVisible(this.refinery);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
