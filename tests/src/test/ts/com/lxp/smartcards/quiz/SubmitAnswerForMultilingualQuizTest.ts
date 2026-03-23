import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { SmartCardStandAlonePageAssertions } from "assertions/smartcards/SmartCardStandAlonePageAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { NotificationPage } from "pages/other/NotificationPage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SubmitAnswerForMultilingualQuizTest extends SmartCardRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly LANG_CODE_PL: string = "pl";
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_EN: string = "EN_" + "QUESTION1_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_EN: string = "EN_" + "QUESTION2_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "EN_" + "OPTION1_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "EN_" + "OPTION2_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "EN_" + "OPTION3_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_EN: string = "EN_" + "Q2_OPTION1_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_EN: string = "EN_" + "Q2_OPTION2_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_PL: string = "PL_" + "QUESTION_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_PL: string = "PL_" + "OPTION1_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_PL: string = "PL_" + "OPTION2_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_PL: string = "PL_" + "Q2_OPTION1_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_PL: string = "PL_" + "Q2_OPTION2_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_PL: string = "PL_" + "OPTION3_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_PL: string = "PL_" + "QUESTION2_" + SubmitAnswerForMultilingualQuizTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly SHARE_NOTIFICATION: string = "You have shared this SmartCard with";
    private static readonly QUESTION_1_LABEL: string = "Question 1";
    private static readonly QUESTION_2_LABEL: string = "Question 2";
    private static readonly OPTION_1_LABEL: string = "Option 1";
    private static readonly OPTION_2_LABEL: string = "Option 2";
    private static readonly OPTION_3_LABEL: string = "Option 3";
    private static readonly COMPLETED: string = "Completed";
    private user1: UserModel;
    private user2: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(false);
      this.user2 = this.createUser(false);
    }

    public verifyThatMultiLingualQuizCardCanBeCreated(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToQuizSmartCardTab()
                .clickLanguageDropdown()
                .chooseLanguage(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL)
                .fillInMultilingualTitle(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN)
                .fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_1_EN)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_1_EN)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_EN)
                .clickAddOptionButton()
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_3_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_EN)
                .selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_EN)
                .clickAddQuestionButton()
                .fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_2_EN)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_EN)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_2_EN)
                .selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_EN)
                .clickCreateCardButtonWithValidationTriggered()
                .fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_1_PL)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_1_PL)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_PL)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_3_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_PL)
                .fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_2_PL)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_PL)
                .fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_2_PL)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                .assertThatCardNotificationIs(SubmitAnswerForMultilingualQuizTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId);
    }

    public verifyThatEditButtonIsShownToCardCreator(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN)
                .clickThreeDotsCardMenu()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatEditSmartCardButtonIsVisible();
    }

    public verifyThatCardCanBeSharedWithAnotherUser(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN)
                .clickShareContentButton()
                .searchForUserToShareContentWith(this.user2.fullName)
                .selectUserToShareContentWith(this.user2.fullName)
                .clickShareButton()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardNotificationIs(SubmitAnswerForMultilingualQuizTest.SHARE_NOTIFICATION);
    }

    public verifyThatCardCanBeAnsweredByUser(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goDirectlyTo(NotificationPage)
                .clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage)
                .selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_EN)
                .selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_EN)
                .submitCardAnswers()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSubmittedButtonIsDisabled()
                    .assertThatCorrectStatusIsDisplayed(SubmitAnswerForMultilingualQuizTest.COMPLETED);
    }

    public verifyThatEditButtonIsNotShownToCardCreatorWhenAnswerWasSubmitted(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN)
                .clickThreeDotsCardMenu()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatEditSmartCardButtonIsNotVisible();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
