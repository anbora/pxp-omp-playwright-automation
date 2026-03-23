import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { LiveEventCardModalAssertions } from "assertions/smartcards/LiveEventCardModalAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateLiveEventCardWithAutomaticallyArchiveContentTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + CreateLiveEventCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX;
    private static readonly MEETING_LINK: string = "http://" + CreateLiveEventCardWithAutomaticallyArchiveContentTest.UNIQUE_SUFFIX + ".com";
    private static readonly TIMEZONE: string = "Europe/Warsaw";
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

    public verifyArchiveContentDateOnLiveEventCard(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToLiveEventSmartCardTab()
                .fillInSingleLanguageTitle(CreateLiveEventCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .chooseFifteenthDayOfNextMonth()
                .selectTimezone(CreateLiveEventCardWithAutomaticallyArchiveContentTest.TIMEZONE)
                .fillInMeetingLink(CreateLiveEventCardWithAutomaticallyArchiveContentTest.MEETING_LINK)
                .check(LiveEventCardModalAssertions)
                    .assertThatArchiveContentCheckboxIsEnabled()
                .endAssertion()
                .clickArchiveContentCheckbox()
                .chooseSeventeenDayOfNextMonth(this.dateContainer)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateLiveEventCardWithAutomaticallyArchiveContentTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateLiveEventCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .editLiveEventSmartCard()
                .check(LiveEventCardModalAssertions)
                    .assertThatArchiveContentDateIsAdded(this.dateContainer.getValue())
                .endAssertion();
        }

     public verifyThatArchiveContentDateIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateLiveEventCardWithAutomaticallyArchiveContentTest.SMART_CARD_TITLE_EN)
                .editLiveEventSmartCard()
                .chooseEighteenDayOfNextMonth(this.dateContainer2)
                .clickUpdateLiveCardButton()
                .editLiveEventSmartCard()
                .check(LiveEventCardModalAssertions)
                    .assertThatArchiveContentDateIsAdded(this.dateContainer2.getValue())
                .endAssertion();
     }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }

}
