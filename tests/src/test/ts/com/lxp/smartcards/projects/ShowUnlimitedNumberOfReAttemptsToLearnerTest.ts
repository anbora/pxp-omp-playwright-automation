import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { SmartCardStandAlonePageAssertions } from "assertions/smartcards/SmartCardStandAlonePageAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { NotificationPage } from "pages/other/NotificationPage";
import { SignOutPage } from "pages/other/SignOutPage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ShowUnlimitedNumberOfReAttemptsToLearnerTest extends SmartCardRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + ShowUnlimitedNumberOfReAttemptsToLearnerTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly SHARE_NOTIFICATION: string = "You have shared this SmartCard with";
    private static readonly UNLIMITED: string = "Unlimited";
    private user1: UserModel;
    private user2: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(false);
      this.user2 = this.createUser(false);
    }

    public verifyThatProjectSmartCardCanBeCreatedWithShowNumberOfReattemptsChecked(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToProjectSmartCardTab()
                .fillInSingleLanguageTitle(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SMART_CARD_TITLE_EN)

                .clickShowNumberOfReattemptsToLearnerCheckbox()
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(ShowUnlimitedNumberOfReAttemptsToLearnerTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatMaximumReattemptsLabelIsPresent()
                    .assertThatSecondPositionFieldValueIsAsExpected(ShowUnlimitedNumberOfReAttemptsToLearnerTest.UNLIMITED);
    }

    public verifyThatNumberOfReattemptsIsShownWhenSharedWithAnotherUser(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SMART_CARD_TITLE_EN)
                .clickShareContentButton()
                .searchForUserToShareContentWith(this.user2.fullName)
                .selectUserToShareContentWith(this.user2.fullName)
                .clickShareButton()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardNotificationIs(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SHARE_NOTIFICATION)
                .endAssertion()
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goDirectlyTo(NotificationPage)
                .clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatMaximumReattemptsLabelIsPresent()
                    .assertThatSecondPositionFieldValueIsAsExpected(ShowUnlimitedNumberOfReAttemptsToLearnerTest.UNLIMITED);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
