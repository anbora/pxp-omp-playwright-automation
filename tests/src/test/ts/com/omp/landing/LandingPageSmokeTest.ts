import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class LandingPageSmokeTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }
    public LandingPageSmokeTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .refreshUntilNewOpeningsWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatAnnouncementsWidgetIsDisplayed()
                    .assertThatYourCompleteYourProfileWidgetIsDisplayed()
                    .assertThatInProgressWidgetIsDisplayed()
                    .assertThatRecentUpdatesWidgetIsDisplayed()
                    .assertThatLearningFeedWidgetIsDisplayed()
                    .assertThatYourNextCareerMilestoneWidgetIsDisplayed()
                    .assertThatNewOpeningsWidgetIsDisplayed()
                    .assertThatMentorsCarouselWidgetIsDisplayed()
                    .assertThatAssignedLearningWidgetIsDisplayed()
                    .assertThatBookmarksWidgetIsDisplayed()
                   // .assertThatLeaderboardWidgetIsDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
