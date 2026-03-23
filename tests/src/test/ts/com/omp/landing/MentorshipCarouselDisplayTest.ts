import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class MentorshipCarouselDisplayTest extends BaseTest {

    private opportunityMarketplace: string = "Talent Marketplace";

    public checkMentorshipCarouselDisplayedOnHomePageWhenMentorshipAndOmpIsEnabled(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Vibha Parashar")))
                .checkMentorshipOnLandingPage()
                .clickStartEditingEmptyLandingPage()
                .configureLandingPageAddWidget("Recommended Mentorships")
                .clickSaveAndExitButton()
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForGeneralOpportunityMarketplace()
                .disableTalentMarketPlace()
                .goDirectlyTo(LandingPage)
                .goToHomePage()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsNotDisplayed()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForGeneralOpportunityMarketplace()
                .disableTalentMarketPlace()
                .goDirectlyTo(LandingPage)
                .goToHomePage()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForMentorshipOpportunityMarketplace()
                .disableMentorship()
                .goDirectlyTo(LandingPage)
                .goToHomePage()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsNotDisplayed()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForMentorshipOpportunityMarketplace()
                .disableMentorship()
                .goDirectlyTo(LandingPage)
                .goToHomePage()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                .endAssertion()
                .clickConfigureHomePageButton()
                .clickDeleteRowButtonMentorship()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatMentorsCarouselWidgetIsNotDisplayed()
                .endAssertion();
    }
}
