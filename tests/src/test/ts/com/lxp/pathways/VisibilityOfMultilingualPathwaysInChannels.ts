import { ChannelDetailsPageAssertions } from "assertions/channels/ChannelDetailsPageAssertions";
import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { PathwayDetailsPageAssertions } from "assertions/pathways/PathwayDetailsPageAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(CreateChannelPage)
                .fillInChannelName(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN)
                .fillInChannelDescription(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_DESCRIPTION_EN)
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                .clickSelectLanguageDropdown()
                .openAccordion(VisibilityOfMultilingualPathwaysInChannels.ACCORDION_LANGUAGE)
                .fillInChannelNameInAccordion(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL)
                .fillInChannelDescriptionInAccordion(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickCreateChannelButton()
                .check(ChannelDetailsPageAssertions)
                    .assertThatChannelNotificationIs(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_CREATION_NOTIFICATION);
    }

    public shouldCreateMultilingualPathwayAndShareItToChannel(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(CreatePathwayPage)
                .fillInPathwayTitle(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN)
                .fillInPathwayDescription(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DESCRIPTION_EN)
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                .clickSelectLanguagesDropdown()
                .openAccordion(VisibilityOfMultilingualPathwaysInChannels.ACCORDION_LANGUAGE)
                .fillInPathwayNameInAccordion(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL)
                .fillInPathwayDescriptionInAccordion(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickContinueButton()
                .clickAddNewSmartCardButton()
                .goToTextSmartCardTab()
                .fillInTitle(VisibilityOfMultilingualPathwaysInChannels.SMARTCARD_TITLE_EN)
                .clickCreateCardButtonInPathway()
                .clickPublishPathwayButtonAndGoToPathwayDetailsPage()
                .check(PathwayDetailsPageAssertions)
                    .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN)
                .endAssertion()
                .clickThreeDotsMenu(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN)
                .clickPostToChannel()
                .selectSpecificChannel(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN)
                .clickPostButton()
                .check(PathwayDetailsPageAssertions)
                    .assertThatPathwayNotificationIs(VisibilityOfMultilingualPathwaysInChannels.SHARE_TO_CHANNEL_NOTIFICATION);
    }

      public shouldDisplayPathwayInChannelInUserPreferredLanguage(): void {
          this.getOmpLoginPage()
                  .run(new LoginScenario(this.user))
                  .goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL)
                  .check(ChannelDetailsPageAssertions)
                      .assertThatCardTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN)
                      .assertThatChannelTitleIs(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_EN)
                  .endAssertion()
                  .clickPathwayTitle()
                  .check(PathwayDetailsPageAssertions)
                        .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN)
                        .assertThatSelectedLanguageIs(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_ENGLISH);
      }

    public shouldDisplayPathwayInChannelInDefaultLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                .goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL)
                .check(ChannelDetailsPageAssertions)
                    .assertThatCardTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL)
                    .assertThatChannelTitleIs(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL)
                .endAssertion()
                .clickPathwayTitle()
                .check(PathwayDetailsPageAssertions)
                    .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInPolish(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_ENGLISH);
    }

      public shouldDisplayPathwayInDefaultLanguageWhenUserPreferredLanguageDoesNotMatchCardLanguages(): void {
          this.getOmpLoginPage()
                  .run(new LoginScenario(this.user))
                  .changeUserDefinedLanguage(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_SPANISH)
                  .goDirectlyTo(ChannelDetailsPage, VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL)
                  .check(ChannelDetailsPageAssertions)
                      .assertThatCardTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL)
                      .assertThatChannelTitleIs(VisibilityOfMultilingualPathwaysInChannels.CHANNEL_NAME_PL)
                  .endAssertion()
                  .clickPathwayTitle()
                  .check(PathwayDetailsPageAssertions)
                        .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_PL)
                        .assertThatSelectedLanguageIs(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_POLISH)
                  .endAssertion()
                  .changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualPathwaysInChannels.LANG_CODE_ENGLISH);
      }

    public shouldDeletePathway(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(ContentMePage)
                .clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_NAME_EN)
                .clickDeleteCard()
                .confirmPathwayDeletion()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(VisibilityOfMultilingualPathwaysInChannels.PATHWAY_DELETION_NOTIFICATION);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }

}
