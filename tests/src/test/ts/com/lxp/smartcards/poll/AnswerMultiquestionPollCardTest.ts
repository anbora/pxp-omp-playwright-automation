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

export class AnswerMultiquestionPollCardTest extends SmartCardRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_POLL" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_EN: string = "EN_POLL" + "AnswerMultiquestionPollCardTest.QUESTION_1" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "EN_" + "OPTION1_Q1" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "EN_" + "OPTION2_Q1" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "EN_" + "OPTION3_Q1" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_EN: string = "EN_" + "AnswerMultiquestionPollCardTest.QUESTION_2" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_EN: string = "EN_" + "OPTION1_Q2" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_EN: string = "EN_" + "OPTION2_Q2" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_3_EN: string = "EN_" + "OPTION3_Q2" + AnswerMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly QUESTION_1: string = "1";
    private static readonly QUESTION_2: string = "2";
    private static readonly OPTION_1: string = "1";
    private static readonly OPTION_2: string = "2";
    private static readonly OPTION_3: string = "3";
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly ONE_VOTE: string = "1 Vote";
    private static readonly SHARE_NOTIFICATION: string = "You have shared this SmartCard with";
    private user1: UserModel;
    private user2: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(true);
      this.user2 = this.createUser(false);
    }

    public verifyThatMultiquestionPollCanBeCreated(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToPollSmartCardTab()
                .fillInTitle(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                .fillInQuestion(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)
                .fillInOption(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.OPTION_1, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)
                .fillInOption(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.OPTION_2, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)
                .clickAddOptionButton(AnswerMultiquestionPollCardTest.QUESTION_1)
                .fillInOption(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.OPTION_3, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)
                .clickAddAnotherQuestionButton()
                .fillInQuestion(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)
                .fillInOption(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.OPTION_1, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)
                .fillInOption(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.OPTION_2, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)
                .clickAddOptionButton(AnswerMultiquestionPollCardTest.QUESTION_2)
                .fillInOption(AnswerMultiquestionPollCardTest.QUESTION_2,AnswerMultiquestionPollCardTest.OPTION_3, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                .assertThatCardNotificationIs(AnswerMultiquestionPollCardTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                    .assertThatPollQuestionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)
                    .assertThatPollCardOptionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)
                    .assertThatPollCardOptionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)
                    .assertThatPollCardOptionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)
                    .assertThatPollQuestionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)
                    .assertThatPollCardOptionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)
                    .assertThatPollCardOptionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)
                    .assertThatPollCardOptionIsPresent(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN);
    }

    public verifyThatPollCardCanBeAnsweredWhenSharedWithAnotherUser(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                .clickShareContentButton()
                .searchForUserToShareContentWith(this.user2.fullName)
                .selectUserToShareContentWith(this.user2.fullName)
                .clickShareButton()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardNotificationIs(AnswerMultiquestionPollCardTest.SHARE_NOTIFICATION)
                .endAssertion()
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goDirectlyTo(NotificationPage)
                .clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatVoteButtonIsDisabled()
                .endAssertion()
                .answerPoll(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatVoteButtonIsDisabled()
                .endAssertion()
                .answerPoll(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatVoteButtonIsEnabled()
                .endAssertion()
                .clickVotePoll()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatPollOptionHasBeenChosen(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN, AnswerMultiquestionPollCardTest.ONE_VOTE)
                    .assertThatPollOptionHasBeenChosen(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN, AnswerMultiquestionPollCardTest.ONE_VOTE);

    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
