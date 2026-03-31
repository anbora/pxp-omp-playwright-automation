// @ts-nocheck

import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToQuizSmartCardTab();
        __page1 = __page1.clickLanguageDropdown();
        __page1 = __page1.chooseLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL);
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        expect(__page1.multilingualQuestionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page1.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page1.correctOptionValidation(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR_FOR_CORRECT_OPTION);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        __page1 = __page1.fillInMultilingualTitle(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN);
        __page1 = __page1.selectCorrectOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        expect(__page1.multilingualQuestionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page1.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        __page1 = __page1.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_PL);
        __page1 = __page1.openAccordion(CreateMultiLingualQuizCardValidationTest.LANGUAGE_EN);
        __page1 = __page1.clickAddOptionButton();
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        expect(__page1.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN);
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        expect(__page1.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_PL);
        __page1 = __page1.openAccordion(CreateMultiLingualQuizCardValidationTest.LANGUAGE_EN);
        __page1 = __page1.clickAddQuestionButton();
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        expect(__page1.multilingualQuestionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page1.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page1.correctOptionValidation(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR_FOR_CORRECT_OPTION);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        __page1 = __page1.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN);
        __page1 = __page1.selectCorrectOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN);
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        expect(__page1.multilingualQuestionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page1.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page1.logger.info("Successfully verified that correct validation error is displayed");
        __page1 = __page1.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_PL);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_PL);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(CreateMultiLingualQuizCardValidationTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that CreateMultiLingualQuizCardValidationTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
    }

    public verifyCorrectQuizStructureForDefaultLanguage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        expect(__page2.CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN).toContainText(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page2.logger.info("Successfully verified that smart card title is as expected");
        expect(__page2.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN is present");
        expect(__page2.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN is present");
        expect(__page2.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN is present");
        expect(__page2.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN is present");
        expect(__page2.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN is present");
        expect(__page2.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN is present");
        expect(__page2.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN is present");
    }
    public verifyCorrectQuizStructureForSupportedLanguage(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user1));
        __page3 = __page3.goDirectlyTo(ContentMePage);
        __page3 = __page3.goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page3 = __page3.changeLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_PL);
        expect(__page3.CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL).toContainText(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL);
        __page3.logger.info("Successfully verified that smart card title is as expected");
        expect(__page3.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_PL is present");
        expect(__page3.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_PL is present");
        expect(__page3.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_PL is present");
        expect(__page3.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_PL is present");
        expect(__page3.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_PL is present");
        expect(__page3.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_PL is present");
        expect(__page3.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_PL)).toBeVisible();
        __page3.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_PL is present");
        }

    public verifyCorrectQuizStructureForUnSupportedLanguage(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user1));
        __page4 = __page4.goDirectlyTo(ContentMePage);
        __page4 = __page4.goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page4 = __page4.changeUserDefinedLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES);
        expect(__page4.CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN).toContainText(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page4.logger.info("Successfully verified that smart card title is as expected");
        expect(__page4.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_EN is present");
        expect(__page4.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_EN is present");
        expect(__page4.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_EN is present");
        expect(__page4.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_EN is present");
        expect(__page4.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_EN is present");
        expect(__page4.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_EN is present");
        expect(__page4.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN)).toBeVisible();
        __page4.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_EN is present");
        __page4 = __page4.changeUserDefinedLanguageInSpanish(CreateMultiLingualQuizCardValidationTest.LANG_CODE_EN);
    }

    public verifyValidationWhenEditingMultilingualQuiz(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user1));
        __page5 = __page5.goDirectlyTo(ContentMePage);
        __page5 = __page5.goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page5 = __page5.editQuizSmartCard();
        __page5 = __page5.clickLanguageDropdown();
        __page5 = __page5.chooseLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES);
        __page5 = __page5.clickUpdateCardButtonWithValidationTriggered();
        expect(__page5.multilingualQuestionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page5.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page5.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page5.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page5.multilingualQuestionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page5.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        expect(__page5.multiLingualOptionValidationError(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL)).toContainText(CreateMultiLingualQuizCardValidationTest.VALIDATION_ERROR);
        __page5.logger.info("Successfully verified that correct validation error is displayed");
        __page5 = __page5.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES);
        __page5 = __page5.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_ES);
        __page5 = __page5.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_ES);
        __page5 = __page5.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_3_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_ES);
        __page5 = __page5.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_ES);
        __page5 = __page5.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_1_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_ES);
        __page5 = __page5.fillInMultilingualQuizOption(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.QUESTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES, CreateMultiLingualQuizCardValidationTest.OPTION_2_LABEL, CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_ES);
        __page5 = __page5.clickUpdateCardButton();
        expect(__page5.cardNotification).toContainText(CreateMultiLingualQuizCardValidationTest.UPDATE_NOTIFICATION);
        __page5.logger.info("Successfully verified that CreateMultiLingualQuizCardValidationTest.UPDATE_NOTIFICATION text is as expected");
    }

    public verifyCorrectQuizStructureWhenLanguageWasAdded(): void {
                let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user1));
        __page6 = __page6.goDirectlyTo(ContentMePage);
        __page6 = __page6.goToCardStandAloneView(CreateMultiLingualQuizCardValidationTest.SMART_CARD_TITLE_EN);
        __page6 = __page6.changeLanguage(CreateMultiLingualQuizCardValidationTest.LANG_CODE_ES);
        expect(__page6.CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES).toContainText(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES);
        __page6.logger.info("Successfully verified that smart card title is as expected");
        expect(__page6.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_1_ES is present");
        expect(__page6.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_1_ES is present");
        expect(__page6.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_ES is present");
        expect(__page6.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_3_ES is present");
        expect(__page6.smartCardQuestion(CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_QUESTION_2_ES is present");
        expect(__page6.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_1_ES is present");
        expect(__page6.smartCardOption(CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_ES)).toBeVisible();
        __page6.logger.info("Successfully verified that smart card CreateMultiLingualQuizCardValidationTest.SMART_CARD_OPTION_2_2_ES is present");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
