import { MentorProfileAssertions } from "assertions/careergrowth/mentorship/MentorProfileAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class MentorsCarouselWidgetTest extends BaseTest {

    public mentorsCarouselWidgetTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                    .assertThatFirstMentorCardIsLoaded()
                .endAssertion()
                .clickFirstMentorCardAvatar()
                .check(MentorProfileAssertions)
                    .assertMentorProfilePageLoadsAllFieldsForMentee("")
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickSeeAllButtonForMentorsCarouselWidget()
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorDiscoveryPageLoadsAllFields();
    }
}
