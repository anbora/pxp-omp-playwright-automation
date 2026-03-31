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

export class ShowPassingGradeForLearnersScaleAFTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + ShowPassingGradeForLearnersScaleAFTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly UPDATE_NOTIFICATION: string = "SmartCard updated successfully";
    private static readonly SHARE_NOTIFICATION: string = "You have shared this SmartCard with";
    private static readonly PASSING_GRADE: string = "C";
    private user1: UserModel;
    private user2: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(false);
      this.user2 = this.createUser(false);
    }

    public verifyThatProjectSmartCardCanBeCreated(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToProjectSmartCardTab();
        __page1 = __page1.fillInSingleLanguageTitle(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN);
        expect(__page1.showPassingGradeCheckbox).toBeDisabled();
        __page1.logger.info("Successfully verified that show passing grade to learners checkbox is disabled");
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(ShowPassingGradeForLearnersScaleAFTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that ShowPassingGradeForLearnersScaleAFTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
        expect(__page1.passingGradeLabel).not.toBeVisible();
        __page1.logger.info("Successfully verified that passing grade label is not visible");
    }

    public verifyThatShowPassingGradeToLearnersCanBeCheckedForAFGradingScale(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(ContentMePage);
        __page2 = __page2.goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN);
        __page2 = __page2.editProjectSmartCard();
        __page2 = __page2.selectPassingGrade(ShowPassingGradeForLearnersScaleAFTest.PASSING_GRADE);
        expect(__page2.showPassingGradeCheckbox).toBeEnabled();
        __page2.logger.info("Successfully verified that show passing grade to learners checkbox is enabled");
        __page2 = __page2.clickShowPassingGradeCheckbox();
        __page2 = __page2.clickUpdateCardButton();
        expect(__page2.cardNotification).toContainText(ShowPassingGradeForLearnersScaleAFTest.UPDATE_NOTIFICATION);
        __page2.logger.info("Successfully verified that ShowPassingGradeForLearnersScaleAFTest.UPDATE_NOTIFICATION text is as expected");
    }

    public verifyThatPassingGradeIsShownToCardAuthor(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user1));
        __page3 = __page3.goDirectlyTo(ContentMePage);
        __page3 = __page3.goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN);
        expect(__page3.passingGradeLabel).toBeVisible();
        __page3.logger.info("Successfully verified that passing grade label is visible");
        expect(__page3.secondPositionMetadataValue).toContainText(ShowPassingGradeForLearnersScaleAFTest.PASSING_GRADE);
        __page3.logger.info("Successfully verified that field value is as expected");
    }

     public verifyThatPassingGradeIsShownWhenSharedWithAnotherUser(): void {
                        let __page4: any = this;
            __page4 = __page4.getOmpLoginPage();
            __page4 = __page4.run(new LoginScenario(this.user1));
            __page4 = __page4.goDirectlyTo(ContentMePage);
            __page4 = __page4.goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN);
            __page4 = __page4.clickShareContentButton();
            __page4 = __page4.searchForUserToShareContentWith(this.user2.fullName);
            __page4 = __page4.selectUserToShareContentWith(this.user2.fullName);
            __page4 = __page4.clickShareButton();
            expect(__page4.smartCardNotification).toContainText(ShowPassingGradeForLearnersScaleAFTest.SHARE_NOTIFICATION);
            __page4.logger.info("Successfully verified that ShowPassingGradeForLearnersScaleAFTest.SHARE_NOTIFICATION text is as expected");
            __page4 = __page4.goDirectlyTo(SignOutPage);

                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginWithOnboardingScenario(this.user2));
        __page5 = __page5.goDirectlyTo(NotificationPage);
        __page5 = __page5.clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage);
        expect(__page5.passingGradeLabel).toBeVisible();
        __page5.logger.info("Successfully verified that passing grade label is visible");
        expect(__page5.secondPositionMetadataValue).toContainText(ShowPassingGradeForLearnersScaleAFTest.PASSING_GRADE);
        __page5.logger.info("Successfully verified that field value is as expected");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
