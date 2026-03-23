import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { ProjectCardModalAssertions } from "assertions/smartcards/ProjectCardModalAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateProjectCardWithAutomaticallyArchiveContentTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + CreateProjectCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX;
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

    public verifyArchiveContentDateOnProjectCard(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToProjectSmartCardTab()
                .fillInSingleLanguageTitle(CreateProjectCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .check(ProjectCardModalAssertions)
                    .assertThatArchiveContentCheckboxIsEnabled()
                .endAssertion()
                .clickArchiveContentCheckbox()
                .chooseFifteenDayOfCurrentMonth(this.dateContainer)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateProjectCardWithAutomaticallyArchiveContentTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateProjectCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .editProjectSmartCard()
                .check(ProjectCardModalAssertions)
                    .assertThatArchiveContentDateIsAdded(this.dateContainer.getValue())
                .endAssertion();
    }

    public verifyThatArchiveContentDateIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateProjectCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .editProjectSmartCard()
                .chooseEighteenDayOfNextMonth(this.dateContainer2)
                .clickUpdateProjectCardButton()
                .editProjectSmartCard()
                .check(ProjectCardModalAssertions)
                    .assertThatArchiveContentDateIsAdded(this.dateContainer2.getValue())
                .endAssertion();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
