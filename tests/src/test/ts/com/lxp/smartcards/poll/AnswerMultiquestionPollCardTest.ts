// @ts-nocheck

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
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToPollSmartCardTab();
        __page1 = __page1.fillInTitle(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.fillInQuestion(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN);
        __page1 = __page1.fillInOption(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.OPTION_1, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.fillInOption(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.OPTION_2, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN);
        __page1 = __page1.clickAddOptionButton(AnswerMultiquestionPollCardTest.QUESTION_1);
        __page1 = __page1.fillInOption(AnswerMultiquestionPollCardTest.QUESTION_1, AnswerMultiquestionPollCardTest.OPTION_3, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN);
        __page1 = __page1.clickAddAnotherQuestionButton();
        __page1 = __page1.fillInQuestion(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN);
        __page1 = __page1.fillInOption(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.OPTION_1, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN);
        __page1 = __page1.fillInOption(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.OPTION_2, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN);
        __page1 = __page1.clickAddOptionButton(AnswerMultiquestionPollCardTest.QUESTION_2);
        __page1 = __page1.fillInOption(AnswerMultiquestionPollCardTest.QUESTION_2, AnswerMultiquestionPollCardTest.OPTION_3, AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(AnswerMultiquestionPollCardTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that AnswerMultiquestionPollCardTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
        expect(__page1.AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN).toContainText(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page1.logger.info("Successfully verified that smart card title is as expected");
        expect(__page1.pollCardQuestion(AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN is present");
        expect(__page1.pollCardOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN is present");
        expect(__page1.pollCardOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN is present");
        expect(__page1.pollCardOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN is present");
        expect(__page1.pollCardQuestion(AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll AnswerMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN is present");
        expect(__page1.pollCardOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN is present");
        expect(__page1.pollCardOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN is present");
        expect(__page1.pollCardOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN is present");
    }

    public verifyThatPollCardCanBeAnsweredWhenSharedWithAnotherUser(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(AnswerMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page2 = __page2.clickShareContentButton();
        __page2 = __page2.searchForUserToShareContentWith(this.user2.fullName);
        __page2 = __page2.selectUserToShareContentWith(this.user2.fullName);
        __page2 = __page2.clickShareButton();
        expect(__page2.smartCardNotification).toContainText(AnswerMultiquestionPollCardTest.SHARE_NOTIFICATION);
        __page2.logger.info("Successfully verified that AnswerMultiquestionPollCardTest.SHARE_NOTIFICATION text is as expected");
        __page2 = __page2.goDirectlyTo(SignOutPage);

                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user2));
        __page3 = __page3.goDirectlyTo(NotificationPage);
        __page3 = __page3.clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage);
        expect(__page3.voteButton).toBeDisabled();
        __page3.logger.info("Successfully verified that vote button is disabled");
        __page3 = __page3.answerPoll(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN);
        expect(__page3.voteButton).toBeDisabled();
        __page3.logger.info("Successfully verified that vote button is disabled");
        __page3 = __page3.answerPoll(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN);
        expect(__page3.voteButton).toBeEnabled();
        __page3.logger.info("Successfully verified that vote button is enabled");
        __page3 = __page3.clickVotePoll();
        expect(__page3.answeredPollOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)).toContainText(AnswerMultiquestionPollCardTest.ONE_VOTE);
        __page3.logger.info("Successfully verified that poll has been answered");
        expect(__page3.answeredPollOption(AnswerMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)).toContainText(AnswerMultiquestionPollCardTest.ONE_VOTE);
        __page3.logger.info("Successfully verified that poll has been answered");

    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
