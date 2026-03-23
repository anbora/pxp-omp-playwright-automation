import { DiscoverAssertions } from "assertions/discover/DiscoverAssertions";
import { SmartCardDetailsAssertions } from "assertions/insights/SmartCardDetailsAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { LearningQueueAssertions } from "assertions/me/LearningQueueAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class LearningWidgetTest extends BaseRestTest {

    private readonly cardName: string = UUID.randomUUID().toString();
    private readonly cardLevel: string = "Beginner";
    private readonly cardType: string = "Text";
    private readonly emptyContentMessage: string = "View in progress learning here to pick up where you left off";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public emptyContinueLearningWidget(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatAllTabForContinueLearningWidgetIsNotVisible()
                    .assertThatDueDateTabForContinueLearningWidgetIsNotVisible()
                    .assertThatIconForEmptyContinueLearningWidgetIsVisible()
                    .assertThatMessageForEmptyContinueLearningWidgetContains(this.emptyContentMessage)
                .endAssertion()
                .clickExploreContentButtonForContinueLearningWidget()
                .check(DiscoverAssertions)
                    .assertThatDiscoverTabHasActiveClass();
    }

    public continueLearningWidgetWithSmartCard(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToTextSmartCardTab()
                .fillInTitle(this.cardName)
                .selectLevel(this.cardLevel)
                .clickCreateCardButton()
                .clickBookmarkForSmartCard(this.cardName)
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatCardNameInContinueLearningWidgetIsVisible(this.cardName)
                    .assertThatCardImageInContinueLearningWidgetIsVisible(this.cardName)
                    .assertThatCardTypeInContinueLearningIsVisible(this.cardName, this.cardType)
                .endAssertion()
                .clickSeeAllButtonForContinueLearningWidget()
                .clickBookmarkedTab()
                .check(LearningQueueAssertions)
                    .assertThatLearningTitleContains(this.cardName)
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickSmartCardNameForContinueLearningWidget(this.cardName)
                .check(SmartCardDetailsAssertions)
                    .assertThatCardNameContains(this.cardName)
                    .assertThatCardTypeContains(this.cardType)
                    .assertThatCardLevelContains(this.cardLevel);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
