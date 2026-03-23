import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { MyMentorshipAssertions } from "assertions/careergrowth/mentorship/MyMentorshipAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class RequestMentorshipRejectAsMentorTest extends BaseRestTest {

    private mentorSearchName: string = "Samuel Smith";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public RequestNewMentorshipViaDiscoveryPageAndValidateStatus(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorDiscoveryPageLoadsAllFields()
                .endAssertion()
                .typeSearchValue(this.mentorSearchName)
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorNameIsDisplayedInResults(this.mentorSearchName)
                    .assertRequestMentorshipButtonIsDisplayed(this.mentorSearchName)
                .endAssertion()
                .clickMentorCardRequestMentorshipButton(this.mentorSearchName)
                .check(MentorshipDiscoveryAssertions)
                    .assertRequestMentorshipModalIsDisplayed()
                .endAssertion()
                .submitMentorshipRequestWithMessage("sample message")
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorCardApplicationStatusIsDisplayed("Request Sent")
                .endAssertion()
                .goToLandingPage()
                .requestMentorshipHomePage()
                .check(LandingPageAssertions)
                    .assertMentorCardApplicationStatusIsDisplayed("Request Sent")
                .endAssertion();
    }

    public RejectMentorshipRequestAndValidateStatus(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Samuel Smith")))
                .goToMePageProfile()
                .goToMentorshipsTab()
                .clickMyMenteesTab()
                .check(MyMentorshipAssertions)
                    .assertMyMenteesTabIsDisplayed()
                    .assertAcceptRejectButtonDisplays(String.valueOf(this.user.name))
                .endAssertion()
                .clickAcceptRejectButton(String.valueOf(this.user.name), "Reject")
                .clickYesRejectButton()
                .selectAFilterOption("mentor-options-REJECTED")
                .check(MyMentorshipAssertions)
                    .assertMentorApplicationStatusIsDisplayed(String.valueOf(this.user.name),"Rejected")
                    .assertMentorCardIsDisplayed(String.valueOf(this.user.name))
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
