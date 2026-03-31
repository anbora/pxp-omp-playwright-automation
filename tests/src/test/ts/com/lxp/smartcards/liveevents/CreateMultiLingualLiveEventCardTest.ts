// @ts-nocheck

import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToLiveEventSmartCardTab();
        __page1 = __page1.clickLanguageDropdown();
        __page1 = __page1.chooseLanguage(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL);
        __page1 = __page1.fillInMultilingualTitle(CreateMultiLingualLiveEventCardTest.LANG_CODE_EN, CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.openAccordion(CreateMultiLingualLiveEventCardTest.LANGUAGE_PL);
        __page1 = __page1.fillInMultilingualTitle(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL, CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
        __page1 = __page1.chooseFifteenthDayOfNextMonth();
        __page1 = __page1.selectTimezone(CreateMultiLingualLiveEventCardTest.TIMEZONE);
        __page1 = __page1.fillInMeetingLink(CreateMultiLingualLiveEventCardTest.MEETING_LINK);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(CreateMultiLingualLiveEventCardTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that CreateMultiLingualLiveEventCardTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
    }

        public verifyThatLanguageCanBeChangedOnSmartCardStandAlonePage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN);
        expect(__page2.CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN).toContainText(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_EN);
        __page2.logger.info("Successfully verified that smart card title is as expected");
        __page2 = __page2.changeLanguage(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL);
        expect(__page2.CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL).toContainText(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
        __page2.logger.info("Successfully verified that smart card title is as expected");
        }

        public verifyThatLanguageOfCardChangesWhenUserPreferredLanguageIsChanged(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user1));
        __page3 = __page3.changeUserDefinedLanguage(CreateMultiLingualLiveEventCardTest.LANG_CODE_PL);
        __page3 = __page3.goDirectlyTo(ContentMePage);
        expect(__page3.cardTile).toContainText(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
        __page3.logger.info("Successfully verified that CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL is as expected");
        __page3 = __page3.goToCardStandAloneView(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
        expect(__page3.CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL).toContainText(CreateMultiLingualLiveEventCardTest.SMART_CARD_TITLE_PL);
        __page3.logger.info("Successfully verified that smart card title is as expected");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
