import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class LandingPagePermissionsTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }
    public LandingPagePermissionsTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .refreshUntilNewOpeningsWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatWelcomeStringAndSubTextInWelcomeWidgetIsVisible()
                    .assertThatAnnouncementsWidgetIsDisplayed()
                    .assertThatYourCompleteYourProfileWidgetIsDisplayed()
                    .assertThatInProgressWidgetIsDisplayed()
                    .assertThatRecentUpdatesWidgetIsNotDisplayed()
                    .assertThatLearningFeedWidgetIsNotDisplayed()
                    .assertThatYourNextCareerMilestoneWidgetIsNotDisplayed()
                    .assertThatNewOpeningsWidgetIsNotDisplayed()
                    .assertThatMentorsCarouselWidgetIsNotDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
