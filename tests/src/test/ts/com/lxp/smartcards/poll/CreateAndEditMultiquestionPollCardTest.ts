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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToPollSmartCardTab()
                .fillInTitle(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                .fillInQuestion("1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)
                .fillInOption("1", "1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)
                .fillInOption("1", "2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)
                .clickAddOptionButton("1")
                .fillInOption("1", "3", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)
                .clickAddAnotherQuestionButton()
                .fillInQuestion("2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)
                .fillInOption("2", "1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)
                .fillInOption("2", "2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateAndEditMultiquestionPollCardTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                    .assertThatPollQuestionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)
                    .assertThatPollQuestionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN);
    }

    public verifyThatCreatedPollCanBeEdited(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                .editPollSmartCard()
                .clickAddOptionButton("2")
                .fillInOption("2", "3", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN)
                .clickAddAnotherQuestionButton()
                .fillInQuestion("3", CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_3_EN)
                .fillInOption("3", "1", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_1_EN)
                .fillInOption("3", "2", CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_2_EN)
                .clickUpdateCardButtonFromStandaloneView()
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatCardNotificationIs(CreateAndEditMultiquestionPollCardTest.UPDATE_NOTIFICATION)
                    .assertThatSmartCardTitleIsAsExpected(CreateAndEditMultiquestionPollCardTest.SMART_CARD_TITLE_EN)
                    .assertThatPollQuestionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_EN)
                    .assertThatPollQuestionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_2_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_2_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_2_3_EN)
                    .assertThatPollQuestionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_QUESTION_3_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_1_EN)
                    .assertThatPollCardOptionIsPresent(CreateAndEditMultiquestionPollCardTest.SMART_CARD_OPTION_3_2_EN);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
