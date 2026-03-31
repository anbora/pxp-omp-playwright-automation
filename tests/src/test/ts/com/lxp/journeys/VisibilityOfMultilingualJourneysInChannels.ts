// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { expect } from "common/testing/playwright";
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
        let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(CreateChannelPage);
        __page1 = __page1.fillInChannelName(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_EN);
        __page1 = __page1.fillInChannelDescription(VisibilityOfMultilingualJourneysInChannels.CHANNEL_DESCRIPTION_EN);
        __page1 = __page1.clickAddLanguagesButton();
        __page1 = __page1.addLanguages(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page1 = __page1.clickSelectLanguageDropdown();
        __page1 = __page1.openAccordion(VisibilityOfMultilingualJourneysInChannels.ACCORDION_LANGUAGE);
        __page1 = __page1.fillInChannelNameInAccordion(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL);
        __page1 = __page1.fillInChannelDescriptionInAccordion(VisibilityOfMultilingualJourneysInChannels.CHANNEL_DESCRIPTION_PL);
        __page1 = __page1.changeDefaultLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page1 = __page1.clickAddLanguageInModal();
        __page1 = __page1.clickCreateChannelButton();
        expect(__page1.channelNotification).toContainText(VisibilityOfMultilingualJourneysInChannels.CHANNEL_CREATION_NOTIFICATION);
    }

    public shouldCreateMultilingualJourneyAndShareItToChannel(): void {
        let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(CreateJourneyPage);
        __page2 = __page2.fillInJourneyTitle(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN);
        __page2 = __page2.fillInJourneyDescription(VisibilityOfMultilingualJourneysInChannels.JOURNEY_DESCRIPTION_EN);
        __page2 = __page2.clickAddLanguagesButton();
        __page2 = __page2.addLanguages(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page2 = __page2.clickSelectLanguagesDropdown();
        __page2 = __page2.openAccordion(VisibilityOfMultilingualJourneysInChannels.ACCORDION_LANGUAGE);
        __page2 = __page2.fillInJourneyNameInAccordion(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL);
        __page2 = __page2.fillInJourneyDescriptionInAccordion(VisibilityOfMultilingualJourneysInChannels.JOURNEY_DESCRIPTION_PL);
        __page2 = __page2.changeDefaultLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page2 = __page2.clickAddLanguageInModal();
        __page2 = __page2.clickContinueButton();
        __page2 = __page2.enterSectionTitle(VisibilityOfMultilingualJourneysInChannels.SECTION_TITLE);
        __page2 = __page2.clickAddNewSmartCardButton();
        __page2 = __page2.goToTextSmartCardTab();
        __page2 = __page2.fillInTitle(VisibilityOfMultilingualJourneysInChannels.SMARTCARD_TITLE_EN);
        __page2 = __page2.clickCreateCardButtonInJourney();
        __page2 = __page2.clickPublishJourneyButtonAndGoToJourneyDetailsPage();
        expect(__page2.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN);
        __page2 = __page2.clickThreeDotsMenu();
        __page2 = __page2.clickPostToChannel();
        __page2 = __page2.selectSpecificChannel(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_EN);
        __page2 = __page2.clickPostButton();
        expect(__page2.journeyNotification).toContainText(VisibilityOfMultilingualJourneysInChannels.SHARE_TO_CHANNEL_NOTIFICATION);
    }

    public shouldDisplayJourneyInChannelInUserPreferredLanguage(): void {
        let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL);
        expect(__page3.cardTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN);
        expect(__page3.channelTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_EN);
        __page3 = __page3.clickJourneyTitle();
        expect(__page3.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN);
        expect(__page3.languageDropdown).toHaveValue(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_ENGLISH);
    }

    public shouldDisplayJourneyInChannelInDefaultLanguage(): void {
        let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page4 = __page4.goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL);
        expect(__page4.cardTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL);
        expect(__page4.channelTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL);
        __page4 = __page4.clickJourneyTitle();
        expect(__page4.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL);
        expect(__page4.languageDropdown).toHaveValue(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page4 = __page4.changeUserDefinedLanguageInPolish(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_ENGLISH);
    }

    public shouldDisplayJourneyInDefaultLanguageWhenUserPreferredLanguageDoesNotMatchCardLanguages(): void {
        let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user));
        __page5 = __page5.changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_SPANISH);
        __page5 = __page5.goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL);
        expect(__page5.cardTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL);
        expect(__page5.channelTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.CHANNEL_NAME_PL);
        __page5 = __page5.clickJourneyTitle();
        expect(__page5.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_PL);
        expect(__page5.languageDropdown).toHaveValue(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_POLISH);
        __page5 = __page5.changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualJourneysInChannels.LANG_CODE_ENGLISH);
    }

    public shouldDeleteJourney(): void {
        let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user));
        __page6 = __page6.goDirectlyTo(ContentMePage);
        __page6 = __page6.clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualJourneysInChannels.JOURNEY_NAME_EN);
        __page6 = __page6.clickDeleteCard();
        __page6 = __page6.confirmJourneyDeletion();
        expect(__page6.cardNotification).toContainText(VisibilityOfMultilingualJourneysInChannels.JOURNEY_DELETION_NOTIFICATION);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
