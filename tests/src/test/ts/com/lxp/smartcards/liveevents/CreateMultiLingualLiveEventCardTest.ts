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

export class CreateMultiLingualLiveEventCardTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly LANG_CODE_PL: string = "pl";
    private static readonly LANGUAGE_PL: string = "Polish (Polski)";
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + CreateMultiLingualLiveEventCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_TITLE_PL: string = "PL_" + CreateMultiLingualLiveEventCardTest.UNIQUE_SUFFIX;
    private static readonly MEETING_LINK: string = "http://" + CreateMultiLingualLiveEventCardTest.UNIQUE_SUFFIX + ".com";
    private static readonly TIMEZONE: string = "[UTC +01:00] Europe/Warsaw";
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
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
                .goToLiveEventSmartCardTab()
                .clickLanguageDropdown()
                .chooseLanguage(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL)
                .fillInMultilingualTitle(CreateMultiLingualLiveEventCardTest.LANG_CODE_EN, CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN)
                .openAccordion(CreateMultiLingualLiveEventCardTest.LANGUAGE_PL)
                .fillInMultilingualTitle(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL, CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL)
                .chooseFifteenthDayOfNextMonth()
                .selectTimezone(CreateMultiLingualLiveEventCardTest.TIMEZONE)
                .fillInMeetingLink(CreateMultiLingualLiveEventCardTest.MEETING_LINK)
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(CreateMultiLingualLiveEventCardTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId);
    }

        public verifyThatLanguageCanBeChangedOnSmartCardStandAlonePage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN)
                .endAssertion()
                .changeLanguage(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
        }

        public verifyThatLanguageOfCardChangesWhenUserPreferredLanguageIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .changeUserDefinedLanguage(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL)
                .goDirectlyTo(ContentMePage)
                .check(ContentMePageAssertions)
                    .assertThatCardTitleIsAsExpected(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL)
                .endAssertion()
                .goToCardStandAloneView(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatSmartCardTitleIsAsExpected(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
