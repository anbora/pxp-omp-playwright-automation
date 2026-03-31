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

export class CreateMultiLingualQuizCardTest extends SmartCardRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly LANG_CODE_PL: string = "pl";
    private static readonly LANGUAGE_PL: string = "Polish (Polski)";
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_EN: string = "EN_" + "QUESTION_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "EN_" + "OPTION1_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "EN_" + "OPTION2_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_1_PL: string = "PL_" + "QUESTION_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_PL: string = "PL_" + "OPTION1_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_PL: string = "PL_" + "OPTION2_" + CreateMultiLingualQuizCardTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly QUESTION_1_LABEL: string = "Question 1";
    private static readonly OPTION_1_LABEL: string = "Option 1";
    private static readonly OPTION_2_LABEL: string = "Option 2";
    private user1: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

    this.user1 = this.createUser(false);

    }

    public verifyThatMultiLingualSmartCardCanBeCreated(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToQuizSmartCardTab();
        __page1 = __page1.clickLanguageDropdown();
        __page1 = __page1.chooseLanguage(CreateMultiLingualQuizCardTest.LANG_CODE_PL);
        __page1 = __page1.fillInMultilingualTitle(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.OPTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.OPTION_2_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_2_EN);
        __page1 = __page1.selectCorrectOption(CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_1_EN);
        __page1 = __page1.openAccordion(CreateMultiLingualQuizCardTest.LANGUAGE_PL);
        __page1 = __page1.fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.OPTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_1_PL);
        __page1 = __page1.fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.OPTION_2_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_2_PL);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(CreateMultiLingualQuizCardTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that CreateMultiLingualQuizCardTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
    }

    public verifyThatLanguageCanBeChangedOnSmartCardStandAlonePage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN);
        expect(__page2.CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN).toContainText(CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN);
        __page2.logger.info("Successfully verified that smart card title is as expected");
        __page2 = __page2.changeLanguage(CreateMultiLingualQuizCardTest.LANG_CODE_PL);
        expect(__page2.CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL).toContainText(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
        __page2.logger.info("Successfully verified that smart card title is as expected");
    }

    public verifyThatLanguageOfCardChangesWhenUserPreferredLanguageIsChanged(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user1));
        __page3 = __page3.changeUserDefinedLanguage(CreateMultiLingualQuizCardTest.LANG_CODE_PL);
        __page3 = __page3.goDirectlyTo(ContentMePage);
        expect(__page3.cardTile).toContainText(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
        __page3.logger.info("Successfully verified that CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL is as expected");
        __page3 = __page3.goToCardStandAloneView(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
        expect(__page3.CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL).toContainText(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
        __page3.logger.info("Successfully verified that smart card title is as expected");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
