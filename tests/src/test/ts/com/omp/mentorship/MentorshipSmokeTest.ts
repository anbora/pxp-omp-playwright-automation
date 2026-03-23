import { MentorProfileAssertions } from "assertions/careergrowth/mentorship/MentorProfileAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { MyMentorshipAssertions } from "assertions/careergrowth/mentorship/MyMentorshipAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class MentorshipSmokeTest extends BaseTest {

    private mentorSearchName: string = "Bobby Benjamin";
    private mentorSearchAction1: string = "View Mentor Profile";

    public searchForMentorAndValidateMentorProfileAndMyMentorshipPage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorDiscoveryPageLoadsAllFields()
                    .assertViewMyMentorProfileButtonisDisplayed()
                    .assertMyMentorshipsButtonIsDisplayed()
                .endAssertion()
                .clickInFiltersButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertFilterModalLoadsAllFields()
                .endAssertion()
                .clickCancelButtonFiltersModal()
                .typeSearchValue(this.mentorSearchName)
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorNameIsDisplayedInResults(this.mentorSearchName)
                .endAssertion()
                .clickMentorCardDropdownAction(this.mentorSearchName, this.mentorSearchAction1)
                .check(MentorProfileAssertions)
                    .assertMentorProfilePageLoadsAllFieldsForMentee(this.mentorSearchName)
                .endAssertion()
                .goToMePageProfile()
                .goToMentorshipsTab()
                .check(MyMentorshipAssertions)
                    .assertMyMenteesTabIsDisplayed()
                .endAssertion()
                .clickMyMentorsTab()
                .check(MyMentorshipAssertions)
                    .assertMyMentorsTabIsDisplayed();
    }
}
