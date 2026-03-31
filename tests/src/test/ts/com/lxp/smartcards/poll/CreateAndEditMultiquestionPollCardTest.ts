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

export class CreateAndEditMultiquestionPollCardTest extends SmartCardRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_POLL" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_EN: string = "EN_POLL" + "QUESTION_1" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "EN_" + "OPTION1_Q1" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "EN_" + "OPTION2_Q1" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "EN_" + "OPTION3_Q1" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_2_EN: string = "EN_" + "QUESTION_2" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_3_EN: string = "EN_" + "QUESTION_3" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_1_EN: string = "EN_" + "OPTION1_Q2" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_2_EN: string = "EN_" + "OPTION2_Q2" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_3_EN: string = "EN_" + "OPTION3_Q2" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_1_EN: string = "EN_" + "OPTION1_Q3" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_2_EN: string = "EN_" + "OPTION2_Q3" + CreateAndEditMultiquestionPollCardTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly UPDATE_NOTIFICATION: string = "SmartCard updated successfully";
    private user1: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

    this.user1 = this.createUser(false);

    }

    public verifyThatMultiquestionPollCanBeCreated(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToPollSmartCardTab();
        __page1 = __page1.fillInTitle(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.fillInQuestion("1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN);
        __page1 = __page1.fillInOption("1", "1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.fillInOption("1", "2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN);
        __page1 = __page1.clickAddOptionButton("1");
        __page1 = __page1.fillInOption("1", "3", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN);
        __page1 = __page1.clickAddAnotherQuestionButton();
        __page1 = __page1.fillInQuestion("2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN);
        __page1 = __page1.fillInOption("2", "1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN);
        __page1 = __page1.fillInOption("2", "2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(CreateAndEditMultiquestionPollCardTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that CreateAndEditMultiquestionPollCardTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
        expect(__page1.CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN).toContainText(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page1.logger.info("Successfully verified that smart card title is as expected");
        expect(__page1.pollCardQuestion(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN is present");
        expect(__page1.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN is present");
        expect(__page1.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN is present");
        expect(__page1.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN is present");
        expect(__page1.pollCardQuestion(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN is present");
        expect(__page1.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN is present");
        expect(__page1.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)).toBeVisible();
        __page1.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN is present");
    }

    public verifyThatCreatedPollCanBeEdited(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page2 = __page2.editPollSmartCard();
        __page2 = __page2.clickAddOptionButton("2");
        __page2 = __page2.fillInOption("2", "3", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN);
        __page2 = __page2.clickAddAnotherQuestionButton();
        __page2 = __page2.fillInQuestion("3", CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_3_EN);
        __page2 = __page2.fillInOption("3", "1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_1_EN);
        __page2 = __page2.fillInOption("3", "2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_2_EN);
        __page2 = __page2.clickUpdateCardButtonFromStandaloneView();
        expect(__page2.cardNotification).toContainText(CreateAndEditMultiquestionPollCardTest.UPDATE_NOTIFICATION);
        __page2.logger.info("Successfully verified that CreateAndEditMultiquestionPollCardTest.UPDATE_NOTIFICATION text is as expected");
        expect(__page2.CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN).toContainText(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN);
        __page2.logger.info("Successfully verified that smart card title is as expected");
        expect(__page2.pollCardQuestion(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN is present");
        expect(__page2.pollCardQuestion(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN is present");
        expect(__page2.pollCardQuestion(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_3_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_3_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_1_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_1_EN is present");
        expect(__page2.pollCardOption(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_2_EN)).toBeVisible();
        __page2.logger.info("Successfully verified that poll card CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_2_EN is present");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
