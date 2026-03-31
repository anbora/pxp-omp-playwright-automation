// @ts-nocheck

import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { NotificationPage } from "pages/other/NotificationPage";
import { SignOutPage } from "pages/other/SignOutPage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class ShowUnlimitedNumberOfReAttemptsToLearnerTest extends SmartCardRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + ShowUnlimitedNumberOfReAttemptsToLearnerTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly SHARE_NOTIFICATION: string = "You have shared this SmartCard with";
    private static readonly UNLIMITED: string = "Unlimited";
    private user1: UserModel;
    private user2: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(false);
      this.user2 = this.createUser(false);
    }

    public verifyThatProjectSmartCardCanBeCreatedWithShowNumberOfReattemptsChecked(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToProjectSmartCardTab();
        __page1 = __page1.fillInSingleLanguageTitle(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.clickShowNumberOfReattemptsToLearnerCheckbox();
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(ShowUnlimitedNumberOfReAttemptsToLearnerTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that ShowUnlimitedNumberOfReAttemptsToLearnerTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
        expect(__page1.maximumReattemptsLabel).toBeVisible();
        __page1.logger.info("Successfully verified that passing grade label is visible");
        expect(__page1.secondPositionMetadataValue).toContainText(ShowUnlimitedNumberOfReAttemptsToLearnerTest.UNLIMITED);
        __page1.logger.info("Successfully verified that field value is as expected");
    }

    public verifyThatNumberOfReattemptsIsShownWhenSharedWithAnotherUser(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SMART_CARD_TITLE_EN);
        __page2 = __page2.clickShareContentButton();
        __page2 = __page2.searchForUserToShareContentWith(this.user2.fullName);
        __page2 = __page2.selectUserToShareContentWith(this.user2.fullName);
        __page2 = __page2.clickShareButton();
        expect(__page2.smartCardNotification).toContainText(ShowUnlimitedNumberOfReAttemptsToLearnerTest.SHARE_NOTIFICATION);
        __page2.logger.info("Successfully verified that ShowUnlimitedNumberOfReAttemptsToLearnerTest.SHARE_NOTIFICATION text is as expected");
        __page2 = __page2.goDirectlyTo(SignOutPage);

                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user2));
        __page3 = __page3.goDirectlyTo(NotificationPage);
        __page3 = __page3.clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage);
        expect(__page3.maximumReattemptsLabel).toBeVisible();
        __page3.logger.info("Successfully verified that passing grade label is visible");
        expect(__page3.secondPositionMetadataValue).toContainText(ShowUnlimitedNumberOfReAttemptsToLearnerTest.UNLIMITED);
        __page3.logger.info("Successfully verified that field value is as expected");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
