// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { randomAlphabetic } from "common/testing/javaCompat";
import { UserModel } from "models/user/UserModel";
import { ChannelDetailsPage } from "pages/channels/ChannelDetailsPage";
import { CreateChannelPage } from "pages/channels/CreateChannelPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { CreatePathwayPage } from "pages/pathways/CreatePathwayPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class VisibilityOfMultilingualPathwaysInChannels extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = randomAlphabetic(10);
    private static readonly CHANNEL_NAME_EN: string = "EN-channel-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_NAME_PL: string = "PL-channel-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_DESCRIPTION_EN: string = "EN-Channel description " + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_DESCRIPTION_PL: string = "PL-Channel description " + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly CHANNEL_CREATION_NOTIFICATION: string = "Channel saved successfully";
    private static readonly PATHWAY_DELETION_NOTIFICATION: string = "Pathway deleted. It will never show again";
    private static readonly PATHWAY_NAME_EN: string = "EN-pathway-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly PATHWAY_DESCRIPTION_EN: string = "EN-description-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly SMARTCARD_TITLE_EN: string = "EN-smartcard-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly PATHWAY_NAME_PL: string = "PL-pathway-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly PATHWAY_DESCRIPTION_PL: string = "PL-description-" + VisibilityOfMultilingualPathwaysInChannels.UNIQUE_SUFFIX;
    private static readonly SHARE_TO_CHANNEL_NOTIFICATION: string = "Content has been posted to the selected channel(s)";
    private static readonly LANG_CODE_POLISH: string = "pl";
    private static readonly LANG_CODE_SPANISH: string = "es";
    private static readonly LANG_CODE_ENGLISH: string = "en";
    private static readonly ACCORDION_LANGUAGE: string = "Polish (Polski)";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCreateMultilingualChannel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(CreateChannelPage);
        __page1 = __page1.fillInChannelName(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN);
        __page1 = __page1.fillInChannelDescription(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_DESCRIPTION_EN);
        __page1 = __page1.clickAddLanguagesButton();
        __page1 = __page1.addLanguages(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH);
        __page1 = __page1.clickSelectLanguageDropdown();
        __page1 = __page1.openAccordion(VisibilityOfMultilingualPathwaysInChannels.ACCORDION_LANGUAGE);
        __page1 = __page1.fillInChannelNameInAccordion(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL);
        __page1 = __page1.fillInChannelDescriptionInAccordion(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_DESCRIPTION_PL);
        __page1 = __page1.changeDefaultLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH);
        __page1 = __page1.clickAddLanguageInModal();
        __page1 = __page1.clickCreateChannelButton();
        expect(__page1.getChannelNotification()).toContainText(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_CREATION_NOTIFICATION);
        __page1.logger.info("Successfully verified that channel VisibilityOfMultilingualPathwaysInChannels.CHANNEL_CREATION_NOTIFICATION text is as expected");
    }

    public shouldCreateMultilingualPathwayAndShareItToChannel(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(CreatePathwayPage);
        __page2 = __page2.fillInPathwayTitle(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN);
        __page2 = __page2.fillInPathwayDescription(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DESCRIPTION_EN);
        __page2 = __page2.clickAddLanguagesButton();
        __page2 = __page2.addLanguages(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH);
        __page2 = __page2.clickSelectLanguagesDropdown();
        __page2 = __page2.openAccordion(VisibilityOfMultilingualPathwaysInChannels.ACCORDION_LANGUAGE);
        __page2 = __page2.fillInPathwayNameInAccordion(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL);
        __page2 = __page2.fillInPathwayDescriptionInAccordion(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DESCRIPTION_PL);
        __page2 = __page2.changeDefaultLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH);
        __page2 = __page2.clickAddLanguageInModal();
        __page2 = __page2.clickContinueButton();
        __page2 = __page2.clickAddNewSmartCardButton();
        __page2 = __page2.goToTextSmartCardTab();
        __page2 = __page2.fillInTitle(VisibilityOfMultilingualPathwaysInChannels.SMARTCARD_TITLE_EN);
        __page2 = __page2.clickCreateCardButtonInPathway();
        __page2 = __page2.clickPublishPathwayButtonAndGoToPathwayDetailsPage();
        expect(__page2.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN);
        __page2.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN is as expected");
        __page2 = __page2.clickThreeDotsMenu(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN);
        __page2 = __page2.clickPostToChannel();
        __page2 = __page2.selectSpecificChannel(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN);
        __page2 = __page2.clickPostButton();
        expect(__page2.getJourneyNotification()).toContainText(VisibilityOfMultilingualPathwaysInChannels.SHARE_TO_CHANNEL_NOTIFICATION);
        __page2.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwaysInChannels.SHARE_TO_CHANNEL_NOTIFICATION text is as expected");
    }

      public shouldDisplayPathwayInChannelInUserPreferredLanguage(): void {
                    let __page3: any = this;
          __page3 = __page3.getOmpLoginPage();
          __page3 = __page3.run(new LoginScenario(this.user));
          __page3 = __page3.goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL);
          expect(__page3.getCardTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN);
          __page3.logger.info("Successfully verified that card VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN is as expected");
          expect(__page3.getChannelTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN);
          __page3.logger.info("Successfully verified that channel VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN is as expected");
          __page3 = __page3.clickPathwayTitle();
          expect(__page3.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN);
          __page3.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN is as expected");
          let selectedLanguage: string = __page3.getLanguageDropdown().inputValue();
          Assert.assertTrue(selectedLanguage.equals(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_ENGLISH));
      }

    public shouldDisplayPathwayInChannelInDefaultLanguage(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.changeUserDefinedLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH);
        __page4 = __page4.goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL);
        expect(__page4.getCardTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL);
        __page4.logger.info("Successfully verified that card VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL is as expected");
        expect(__page4.getChannelTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL);
        __page4.logger.info("Successfully verified that channel VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL is as expected");
        __page4 = __page4.clickPathwayTitle();
        expect(__page4.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL);
        __page4.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL is as expected");
        let selectedLanguage: string = __page4.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH));
        __page4 = __page4.changeUserDefinedLanguageInPolish(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_ENGLISH);
    }

      public shouldDisplayPathwayInDefaultLanguageWhenUserPreferredLanguageDoesNotMatchCardLanguages(): void {
                    let __page5: any = this;
          __page5 = __page5.getOmpLoginPage();
          __page5 = __page5.run(new LoginScenario(this.user));
          __page5 = __page5.changeUserDefinedLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_SPANISH);
          __page5 = __page5.goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL);
          expect(__page5.getCardTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL);
          __page5.logger.info("Successfully verified that card VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL is as expected");
          expect(__page5.getChannelTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL);
          __page5.logger.info("Successfully verified that channel VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL is as expected");
          __page5 = __page5.clickPathwayTitle();
          expect(__page5.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL);
          __page5.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL is as expected");
          let selectedLanguage: string = __page5.getLanguageDropdown().inputValue();
          Assert.assertTrue(selectedLanguage.equals(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH));
          __page5 = __page5.changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_ENGLISH);
      }

    public shouldDeletePathway(): void {
                let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user));
        __page6 = __page6.goDirectlyTo(ContentMePage);
        __page6 = __page6.clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN);
        __page6 = __page6.clickDeleteCard();
        __page6 = __page6.confirmPathwayDeletion();
        expect(__page6.cardNotification).toContainText(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DELETION_NOTIFICATION);
        __page6.logger.info("Successfully verified that VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DELETION_NOTIFICATION text is as expected");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }

}
