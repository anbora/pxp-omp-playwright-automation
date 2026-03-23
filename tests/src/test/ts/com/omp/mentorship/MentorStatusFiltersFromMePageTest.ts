import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { MyMentorshipAssertions } from "assertions/careergrowth/mentorship/MyMentorshipAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class MentorStatusFiltersFromMePageTest extends BaseTest {

    public verifyMentorStausFiltersFromMePageTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorDiscoveryPageLoadsAllFields()
                    .assertViewMyMentorProfileButtonisDisplayed()
                    .assertMyMentorshipsButtonIsDisplayed()
                .endAssertion()
                .goToMePageProfile()
                .goToMentorshipsTab()
                .clickMyMentorsTab()
                .selectAFilterOption("mentor-options-INPROGRESS")
                .check(MyMentorshipAssertions)
                    .assertThatMentorIsDisplayed("Deepa Kanathe")
                .endAssertion()
                .selectAFilterOption("mentor-options-REJECTED")
                .check(MyMentorshipAssertions)
                    .assertThatMentorIsDisplayed("Bobby Benjamin")
                .endAssertion()
                .selectAFilterOption("mentor-options-COMPLETED")
                .check(MyMentorshipAssertions)
                    .assertThatMentorIsDisplayed("Linda Hamilton")
                .endAssertion()
                .selectAFilterOption("mentor-options-APPLIED")
                .check(MyMentorshipAssertions)
                    .assertThatMentorIsDisplayed("Steven Smith")
                .endAssertion();

    }
}
