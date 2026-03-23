import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { SmartCardDetailsAssertions } from "assertions/insights/SmartCardDetailsAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { SmartCardDetailsPage } from "pages/insights/SmartCardDetailsPage";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class LearningFeedWidgetTest extends BaseRestTest {

    private myAssignmentsCardTitleContainer: ResultContainer = new ResultContainer();

    public todaysInsightsTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .refreshUntilLearningFeedWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatLearningFeedWidgetIsDisplayed()
                    .assertThatTodaysInsightsTabIsDisplayed()
                .endAssertion()
                .clickTodaysInsightsTab()
                .check(LandingPageAssertions)
                    .assertThatTodaysInsightsTabIsActivated()
                .endAssertion();
    }

    public teamLearningTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .refreshUntilLearningFeedWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatLearningFeedWidgetIsDisplayed()
                    .assertThatTeamLearningTabIsDisplayed()
                .endAssertion()
                .clickTeamLearningTab()
                .check(LandingPageAssertions)
                    .assertThatTeamLearningTabIsActivated()
                    .assertThatLearningFeedNoCardsIconIsDisplayed()
                .endAssertion();
    }

    public myAssignmentsTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .refreshUntilLearningFeedWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatLearningFeedWidgetIsDisplayed()
                    .assertThatMyAssignmentsTabIsDisplayed()
                .endAssertion()
                .clickMyAssignmentsTab()
                .check(LandingPageAssertions)
                    .assertThatMyAssignmentsTabIsActivated()
                .endAssertion()
                .getFirstCardOnMyAssignmentsList(this.myAssignmentsCardTitleContainer)
                .clickMyAssignmentsCardWithTitle(this.myAssignmentsCardTitleContainer.getValue())
                .check(SmartCardDetailsAssertions)
                    .assertThatCardNameContains(this.myAssignmentsCardTitleContainer.getValue())
                .endAssertion();
    }

    public featuredTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .refreshUntilLearningFeedWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatLearningFeedWidgetIsDisplayed()
                    .assertThatFeaturedTabIsDisplayed()
                .endAssertion()
                .clickFeaturedTab()
                .check(LandingPageAssertions)
                    .assertThatFeaturedTabIsActivated()
                .endAssertion();
    }
}
