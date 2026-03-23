import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { QuizCardModalAssertions } from "assertions/smartcards/QuizCardModalAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToQuizSmartCardTab()
                .fillInSingleLanguageTitle(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .fillInSingleLanguageQuizQuestion(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_QUESTION)
                .fillInFirstSingleLanguageQuizQption(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_OPTION_1)
                .fillInSecondSingleLanguageQuizQption(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_OPTION_2)
                .selectCorrectOption(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_OPTION_1)
                .check(QuizCardModalAssertions)
                    .assertThatArchiveContentCheckboxIsEnabled()
                .endAssertion()
                .clickArchiveContentCheckbox()
                .chooseSeventeenDayOfNextMonth(this.dateContainer)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateQuizCardWithAutomaticallyArchiveContentTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .editQuizSmartCard()
                .check(QuizCardModalAssertions)
                    .assertThatArchiveContentDateIsAdded(this.dateContainer.getValue())
                .endAssertion();
    }

    public verifyThatArchiveContentDateIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateQuizCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .editQuizSmartCard()
                .chooseEighteenDayOfNextMonth(this.dateContainer2)
                .clickUpdateQuizCardButton()
                .editQuizSmartCard()
                .check(QuizCardModalAssertions)
                    .assertThatArchiveContentDateIsAdded(this.dateContainer2.getValue())
                .endAssertion();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
