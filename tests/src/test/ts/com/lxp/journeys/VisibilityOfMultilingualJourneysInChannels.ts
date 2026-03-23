import { ChannelDetailsPageAssertions } from "assertions/channels/ChannelDetailsPageAssertions";
import { JourneyDetailsPageAssertions } from "assertions/journeys/JourneyDetailsPageAssertions";
import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { randomAlphabetic } from "common/testing/javaCompat";
import { UserModel } from "models/user/UserModel";
import { ChannelDetailsPage } from "pages/channels/ChannelDetailsPage";
import { CreateChannelPage } from "pages/channels/CreateChannelPage";
import { CreateJourneyPage } from "pages/journeys/CreateJourneyPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class VisibilityOfMultilingualJourneysInChannels extends BaseRestTest {
    private static readonly UNIQUE_SUFFIX: string = randomAlphabetic(10);
    private static readonly CHANNEL_NAME_EN: string = "EN-channel-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_NAME_PL: string = "PL-channel-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_DESCRIPTION_EN: string = "EN-Channel description " + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_DESCRIPTION_PL: string = "PL-Channel description " + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_CREATION_NOTIFICATION: string = "Channel saved successfully";
    private static readonly JOURNEY_DELETION_NOTIFICATION: string = "Journey deleted. It will never show again";
    private static readonly JOURNEY_NAME_EN: string = "EN-journey-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly JOURNEY_DESCRIPTION_EN: string = "EN-description-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly SMARTCARD_TITLE_EN: string = "EN-smartcard-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly JOURNEY_NAME_PL: string = "PL-journey-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly JOURNEY_DESCRIPTION_PL: string = "PL-description-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly SECTION_TITLE: string = "Section-title-" + VisibilityOfMultilingualJourneysInChannels.UNIQUE_SUFFIX;
    private static readonly SHARE_TO_CHANNEL_NOTIFICATION: string = "Content has been posted to the selected channel(s)";
    private static readonly ACCORDION_LANGUAGE: string = "Polish (Polski)";
    private static readonly LANG_CODE_POLISH: string = "pl";
    private static readonly LANG_CODE_SPANISH: string = "es";
    private static readonly LANG_CODE_ENGLISH: string = "en";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCreateMultilingualChannel(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(CreateChannelPage)
                .fillInChannelName(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_EN)
                .fillInChannelDescription(VisibilityOfMultilingualJourneysInChannels.CHANNEL_DESCRIPTION_EN)
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .clickSelectLanguageDropdown()
                .openAccordion(VisibilityOfMultilingualJourneysInChannels.ACCORDION_LANGUAGE)
                .fillInChannelNameInAccordion(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL)
                .fillInChannelDescriptionInAccordion(VisibilityOfMultilingualJourneysInChannels.CHANNEL_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickCreateChannelButton()
                .check(ChannelDetailsPageAssertions)
                    .assertThatChannelNotificationIs(VisibilityOfMultilingualJourneysInChannels.CHANNEL_CREATION_NOTIFICATION);
    }

    public shouldCreateMultilingualJourneyAndShareItToChannel(): void {
        this.getOmpLoginPage()
           .run(new LoginScenario(this.user))
                .goDirectlyTo(CreateJourneyPage)
                .fillInJourneyTitle(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN)
                .fillInJourneyDescription(VisibilityOfMultilingualJourneysInChannels.JOURNEY_DESCRIPTION_EN)
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .clickSelectLanguagesDropdown()
                .openAccordion(VisibilityOfMultilingualJourneysInChannels.ACCORDION_LANGUAGE)
                .fillInJourneyNameInAccordion(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL)
                .fillInJourneyDescriptionInAccordion(VisibilityOfMultilingualJourneysInChannels.JOURNEY_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickContinueButton()
                .enterSectionTitle(VisibilityOfMultilingualJourneysInChannels.SECTION_TITLE)
                .clickAddNewSmartCardButton()
                .goToTextSmartCardTab()
                .fillInTitle(VisibilityOfMultilingualJourneysInChannels.SMARTCARD_TITLE_EN)
                .clickCreateCardButtonInJourney()
                .clickPublishJourneyButtonAndGoToJourneyDetailsPage()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN)
                .endAssertion()
                .clickThreeDotsMenu()
                .clickPostToChannel()
                .selectSpecificChannel(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_EN)
                .clickPostButton()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyNotificationIs(VisibilityOfMultilingualJourneysInChannels.SHARE_TO_CHANNEL_NOTIFICATION);
    }

    public shouldDisplayJourneyInChannelInUserPreferredLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL)
                .check(ChannelDetailsPageAssertions)
                    .assertThatCardTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN)
                    .assertThatChannelTitleIs(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_EN)
                .endAssertion()
                .clickJourneyTitle()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_ENGLISH);

    }

    public shouldDisplayJourneyInChannelInDefaultLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL)
                .check(ChannelDetailsPageAssertions)
                    .assertThatCardTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL)
                    .assertThatChannelTitleIs(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL)
                .endAssertion()
                .clickJourneyTitle()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInPolish(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_ENGLISH);

    }

    public shouldDisplayJourneyInDefaultLanguageWhenUserPreferredLanguageDoesNotMatchCardLanguages(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_SPANISH)
                .goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL)
                .check(ChannelDetailsPageAssertions)
                    .assertThatCardTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL)
                    .assertThatChannelTitleIs(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL)
                .endAssertion()
                .clickJourneyTitle()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_ENGLISH);
    }

    public shouldDeleteJourney(): void {
            this.getOmpLoginPage()
                    .run(new LoginScenario(this.user))
                    .goDirectlyTo(ContentMePage)
                    .clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN)
                    .clickDeleteCard()
                    .confirmJourneyDeletion()
                    .check(ContentMePageAssertions)
                        .assertThatCardNotificationIs(VisibilityOfMultilingualJourneysInChannels.JOURNEY_DELETION_NOTIFICATION);
        }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
