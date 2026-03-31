// @ts-nocheck

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
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToQuizSmartCardTab();
        __page1 = __page1.clickLanguageDropdown();
        __page1 = __page1.chooseLanguage(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL);
        __page1 = __page1.fillInMultilingualTitle(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_EN);
        __page1 = __page1.clickAddOptionButton();
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_3_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_EN);
        __page1 = __page1.selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_EN);
        __page1 = __page1.clickAddQuestionButton();
        __page1 = __page1.fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_2_EN);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_EN, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_2_EN);
        __page1 = __page1.selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_EN);
        __page1 = __page1.clickCreateCardButtonWithValidationTriggered();
        __page1 = __page1.fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_PL);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_3_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_PL);
        __page1 = __page1.fillInMultilingualQuizQuestion(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_QUESTION_2_PL);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_1_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.QUESTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.LANG_CODE_PL, SubmitAnswerForMultilingualQuizTest.OPTION_2_LABEL, SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_2_PL);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(SubmitAnswerForMultilingualQuizTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that SubmitAnswerForMultilingualQuizTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
    }

    public verifyThatEditButtonIsShownToCardCreator(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN);
        __page2 = __page2.clickThreeDotsCardMenu();
        expect(__page2.editSmartCard).toBeVisible();
        __page2.logger.info("Successfully verified that edit smart card option is present");
    }

    public verifyThatCardCanBeSharedWithAnotherUser(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user1));
        __page3 = __page3.goDirectlyTo(ContentMePage);
        __page3 = __page3.goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN);
        __page3 = __page3.clickShareContentButton();
        __page3 = __page3.searchForUserToShareContentWith(this.user2.fullName);
        __page3 = __page3.selectUserToShareContentWith(this.user2.fullName);
        __page3 = __page3.clickShareButton();
        expect(__page3.smartCardNotification).toContainText(SubmitAnswerForMultilingualQuizTest.SHARE_NOTIFICATION);
        __page3.logger.info("Successfully verified that SubmitAnswerForMultilingualQuizTest.SHARE_NOTIFICATION text is as expected");
    }

    public verifyThatCardCanBeAnsweredByUser(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginWithOnboardingScenario(this.user2));
        __page4 = __page4.goDirectlyTo(NotificationPage);
        __page4 = __page4.clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage);
        __page4 = __page4.selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_3_EN);
        __page4 = __page4.selectCorrectOption(SubmitAnswerForMultilingualQuizTest.SMART_CARD_OPTION_2_1_EN);
        __page4 = __page4.submitCardAnswers();
        expect(__page4.submittedSmartCardButton).toBeDisabled();
        __page4.logger.info("Successfully verified that submit button is disabled");
        expect(__page4.markAsCompletedButton).toContainText(SubmitAnswerForMultilingualQuizTest.COMPLETED);
        __page4.logger.info("Successfully verified that smart card SubmitAnswerForMultilingualQuizTest.COMPLETED is as expected");
    }

    public verifyThatEditButtonIsNotShownToCardCreatorWhenAnswerWasSubmitted(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user1));
        __page5 = __page5.goDirectlyTo(ContentMePage);
        __page5 = __page5.goToCardStandAloneView(SubmitAnswerForMultilingualQuizTest.SMART_CARD_TITLE_EN);
        __page5 = __page5.clickThreeDotsCardMenu();
        expect(__page5.editSmartCard).not.toBeVisible();
        __page5.logger.info("Successfully verified that edit smart card option is not present");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
