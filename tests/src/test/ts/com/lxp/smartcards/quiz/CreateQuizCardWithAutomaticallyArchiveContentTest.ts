// @ts-nocheck

import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class CreateQuizCardWithAutomaticallyArchiveContentTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + CreateQuizCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION: string = "EN_" + "QUESTION_" + CreateQuizCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1: string = "EN_" + "OPTION1_" + CreateQuizCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2: string = "EN_" + "OPTION2_" + CreateQuizCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private user1: UserModel;
    private dateContainer: ResultContainer;
    private dateContainer2: ResultContainer;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(false);
      this.dateContainer = new ResultContainer();
      this.dateContainer2 = new ResultContainer();
    }

    public verifyArchiveContentDateOnQuizCard(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToQuizSmartCardTab();
        __page1 = __page1.fillInSingleLanguageTitle(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.fillInSingleLanguageQuizQuestion(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_QUESTION);
        __page1 = __page1.fillInFirstSingleLanguageQuizQption(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_OPTION_1);
        __page1 = __page1.fillInSecondSingleLanguageQuizQption(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_OPTION_2);
        __page1 = __page1.selectCorrectOption(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_OPTION_1);
        expect(__page1.archiveContentCheckbox).toBeEnabled();
        __page1.logger.info("Successfully verified that archive this content checkbox is enabled");
        __page1 = __page1.clickArchiveContentCheckbox();
        __page1 = __page1.chooseSeventeenDayOfNextMonth(this.dateContainer);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(CreateQuizCardWithAutomaticallyArchiveContentTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that CreateQuizCardWithAutomaticallyArchiveContentTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.editQuizSmartCard();
        expect(__page1.getArchiveDate()).toContainText(this.dateContainer.getValue());
        __page1.logger.info("Successfully verified that automatically archive this.dateContainer.getValue() is added");
    }

    public verifyThatArchiveContentDateIsChanged(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN);
        __page2 = __page2.editQuizSmartCard();
        __page2 = __page2.chooseEighteenDayOfNextMonth(this.dateContainer2);
        __page2 = __page2.clickUpdateQuizCardButton();
        __page2 = __page2.editQuizSmartCard();
        expect(__page2.getArchiveDate()).toContainText(this.dateContainer2.getValue());
        __page2.logger.info("Successfully verified that automatically archive this.dateContainer2.getValue() is added");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
