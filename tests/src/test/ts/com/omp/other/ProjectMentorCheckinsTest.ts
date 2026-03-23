import { MyMentorshipAssertions } from "assertions/careergrowth/mentorship/MyMentorshipAssertions";
import { ManageProjectAssertions } from "assertions/careergrowth/project/ManageProjectAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { LandingPage } from "pages/landing/LandingPage";

export class ProjectMentorCheckinsTest extends BaseTest {

    private userName: string = "gssouser";
    private userName2: string = "aalison";
    private userPassword: string = "popeye1234";
    private projectParticipant1: string = "Amy Alison";
    private projectParticipant2: string = "Michael Mendes";
    private mentorName: string = "GSSO USER";

    public loginAsProjectOwnerWithCheckinsAndValidateParticipantCheckIns(): void {
        this.getCsLoginPage(this.getConfig().getProficiencyURL())
                .loginToApplication_LandingPage(this.userName, this.userPassword)
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown("Demo Test - do not apply")
                .clickOwnedByMeProjectHorizontalCardDropDownAction("Manage Project", ManageProjectPage)
                .clickParticipantProgressTab()
                .check(ManageProjectAssertions)
                    .assertThatCheckInsColumnIsVisible()
                    .assertThatCreateNewCheckInsButtonIsVisibleForUser(this.projectParticipant2)
                    .assertThatManageCheckInsButtonIsVisibleForUser(this.projectParticipant1)
                    .assertThatExistingCheckInsIsLoadedForUser(this.projectParticipant1)
                .endAssertion()
                .clickCreateNewCheckInButtonForUser(this.projectParticipant2)
                .check(ManageProjectAssertions)
                    .assertThatCreateNewCheckInModalLoads()
                .endAssertion();
    }

    public loginAsMentorAndValidateMenteeCheckIns(): void {
        this.getCsLoginPage(this.getConfig().getProficiencyURL())
                .loginToApplication_LandingPage(this.userName, this.userPassword)
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToMentorshipsTab()
                .clickMyMenteesTab()
                .check(MyMentorshipAssertions)
                    .assertMyMenteesTabIsDisplayed()
                .endAssertion()
                .selectAFilterOption("mentor-options-APPROVED")
                .check(MyMentorshipAssertions)
                    .assertMentorApplicationStatusIsDisplayed(this.projectParticipant1, "Accepted")
                    .assertMentorCardIsDisplayed(this.projectParticipant1)
                    .assertMentorApplicationStatusIsDisplayed(this.projectParticipant2, "Accepted")
                    .assertMentorCardIsDisplayed(this.projectParticipant2)
                    .assertThatMenteeExistingCheckInsIsDisplayed(this.projectParticipant1)
                    .assertThatMenteeManageCheckInsIsDisplayed(this.projectParticipant1)
                    .assertThatMenteeCreateACheckInIsDisplayed(this.projectParticipant2)
                .endAssertion();
    }

    public loginAsMenteeAndValidateMentorCheckIns(): void {
        this.getCsLoginPage(this.getConfig().getProficiencyURL())
                .loginToApplication_LandingPage(this.userName2, this.userPassword)
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToMentorshipsTab()
                .clickMyMentorsTab()
                .check(MyMentorshipAssertions)
                    .assertMyMentorshipsPageLoads()
                .endAssertion()
                .selectAFilterOption("mentor-options-INPROGRESS")
                .check(MyMentorshipAssertions)
                    .assertMentorCardIsDisplayed(this.mentorName)
                    .assertMentorApplicationStatusIsDisplayed(this.mentorName, "Current Mentor")
                    .assertThatMenteeExistingCheckInsIsDisplayed(this.mentorName)
                    .assertThatMenteeManageCheckInsIsDisplayed(this.mentorName)
                .endAssertion()
//                .clickManageCheckInsButton(mentorName)
                .check(MyMentorshipAssertions)
                    .assertThatManageCheckInsModalIsDisplayed()
                    .assertThatCreateACheckInButtonIsDisplayedInManageCheckInsModal()
                .endAssertion();
    }
}
