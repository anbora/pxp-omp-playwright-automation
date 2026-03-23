import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { QuizCardModalAssertions } from "assertions/smartcards/QuizCardModalAssertions";
import { SmartCardStandAlonePageAssertions } from "assertions/smartcards/SmartCardStandAlonePageAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateMultiLingualQuizCardValidationTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly LANG_CODE_PL: string = "pl";
    private static readonly LANG_CODE_ES: string = "es";
    private static readonly LANGUAGE_EN: string = "English";
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_EN: string = "EN_" + "QUESTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_ES: string = "ES_" + "QUESTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_EN: string = "EN_" + "QUESTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_ES: string = "ES_" + "QUESTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "EN_" + "OPTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_ES: string = "ES_" + "OPTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "EN_" + "OPTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_ES: string = "ES_" + "OPTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "EN_" + "OPTION3_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_ES: string = "ES_" + "OPTION3_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_EN: string = "EN_" + "Q2_OPTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_ES: string = "ES_" + "Q2_OPTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_EN: string = "EN_" + "Q2_OPTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_ES: string = "ES_" + "Q2_OPTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_PL: string = "PL_" + "QUESTION_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_PL: string = "PL_" + "OPTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_PL: string = "PL_" + "OPTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_PL: string = "PL_" + "Q2_OPTION1_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_PL: string = "PL_" + "Q2_OPTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_PL: string = "PL_" + "OPTION3_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_PL: string = "PL_" + "QUESTION2_" + CreateMultiLingualQuizCardValidationTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly UPDATE_NOTIFICATION: string = "SmartCard updated successfully";
    private static readonly QUESTION_1_LABEL: string = "Question 1";
    private static readonly QUESTION_2_LABEL: string = "Question 2";
    private static readonly OPTION_1_LABEL: string = "Option 1";
    private static readonly OPTION_2_LABEL: string = "Option 2";
    private static readonly OPTION_3_LABEL: string = "Option 3";
    private static readonly VALIDATION_ERROR: string = "Field is required";
    private static readonly VALIDATION_ERROR_FOR_CORRECT_OPTION: string = "Please select the correct option";
    private user1: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

    this.user1 = this.createUser(false);

    }

    public verifyValidationForMultiLingualQuizCard(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToQuizSmartCardTab()
                .clickLanguageDropdown()
                .chooseLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL)
                .clickCreateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForQuestionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForCorrectOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR_FOR_CORRECT_OPTION)
                .endAssertion()
                .fillInMultilingualTitle(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN)
                .selectCorrectOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN)
                .clickCreateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForQuestionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                .endAssertion()
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_PL)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_PL)
                .openAccordion(CreateMultiLingualQuizCardValidationTest.LANGUAGE_EN)
                .clickAddOptionButton()
                .clickCreateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                .endAssertion()
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN)
                .clickCreateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                .endAssertion()
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_PL)
                .openAccordion(CreateMultiLingualQuizCardValidationTest.LANGUAGE_EN)
                .clickAddQuestionButton()
                .clickCreateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForQuestionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForCorrectOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR_FOR_CORRECT_OPTION)
                .endAssertion()
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN)
                .selectCorrectOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN)
                .clickCreateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForQuestionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                .endAssertion()
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_PL)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_PL)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_PL)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateMultiLingualQuizCardValidationTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId);
    }

    public verifyCorrectQuizStructureForDefaultLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN);
    }
    public verifyCorrectQuizStructureForSupportedLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .changeLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_PL)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_PL)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_PL)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_PL)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_PL)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_PL);
        }

    public verifyCorrectQuizStructureForUnSupportedLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .changeUserDefinedLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN)
                .endAssertion()
                .changeUserDefinedLanguageInSpanish(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN);
    }

    public verifyValidationWhenEditingMultilingualQuiz(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .editQuizSmartCard()
                .clickLanguageDropdown()
                .chooseLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES)
                .clickUpdateCardButtonWithValidationTriggered()
                .check(QuizCardModalAssertions)
                    .assertThatValidationErrorForQuestionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForQuestionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                    .assertThatValidationErrorForOptionIsDisplayed(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR)
                .endAssertion()
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_ES)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_ES)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_ES)
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_ES)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_ES)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_ES)
                .clickUpdateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateMultiLingualQuizCardValidationTest.UPDATE_NOTIFICATION);
    }

    public verifyCorrectQuizStructureWhenLanguageWasAdded(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN)
                .changeLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_ES)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_ES)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_ES)
                    .assertThatSmartCardQuestionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_ES)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_ES)
                    .assertThatSmartCardOptionIsPresent(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_ES)
                .endAssertion();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
