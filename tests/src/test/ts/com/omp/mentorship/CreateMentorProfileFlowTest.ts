import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreateMentorProfileFlowTest extends BaseRestTest {

    private skillName: string = "java 8";
    private advancedSkillLevel: string = "Advanced";
    private description: string = "I want to become mentor in Java 8 am open.";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public CreateMentorProfileTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickBecomeAMentor()
                .addSkillsToSkillPassport(this.skillName, this.skillName,this.advancedSkillLevel)
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickBecomeAMentor()
                .addSkillsAndDescription(this.skillName, this.skillName, this.description)
                .clickOnCreateProfileButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertCreatedMentorProfileTextIsDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
