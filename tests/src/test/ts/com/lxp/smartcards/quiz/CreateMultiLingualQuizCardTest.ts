import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { SmartCardStandAlonePageAssertions } from "assertions/smartcards/SmartCardStandAlonePageAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToQuizSmartCardTab()
                .clickLanguageDropdown()
                .chooseLanguage(CreateMultiLingualQuizCardTest.LANG_CODE_PL)
                .fillInMultilingualTitle(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN)
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_EN)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.OPTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_1_EN)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_EN, CreateMultiLingualQuizCardTest.OPTION_2_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_2_EN)
                .selectCorrectOption(CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_1_EN)
                .openAccordion(CreateMultiLingualQuizCardTest.LANGUAGE_PL)
                .fillInMultilingualQuizQuestion(CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.OPTION_1_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_1_PL)
                .fillInMultilingualQuizOption(CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.QUESTION_1_LABEL, CreateMultiLingualQuizCardTest.LANG_CODE_PL, CreateMultiLingualQuizCardTest.OPTION_2_LABEL, CreateMultiLingualQuizCardTest.SMART_CARD_OPTION_2_PL)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateMultiLingualQuizCardTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId);
    }

    public verifyThatLanguageCanBeChangedOnSmartCardStandAlonePage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardTest.SMART_CARD_TITLE_EN)
                .endAssertion()
                .changeLanguage(CreateMultiLingualQuizCardTest.LANG_CODE_PL)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
    }

    public verifyThatLanguageOfCardChangesWhenUserPreferredLanguageIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .changeUserDefinedLanguage(CreateMultiLingualQuizCardTest.LANG_CODE_PL)
                .goDirectlyTo(ContentMePage)
                .check(ContentMePageAssertions)
                    .assertThatCardTitleIsAsExpected(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL)
                .endAssertion()
                .goToCardStandAloneView(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualQuizCardTest.SMART_CARD_QUESTION_1_PL);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
