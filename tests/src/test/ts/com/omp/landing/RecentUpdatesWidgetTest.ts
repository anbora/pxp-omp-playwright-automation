// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { ShareJobPage } from "pages/careergrowth/share/ShareJobPage";
import { LandingPage } from "pages/landing/LandingPage";
import { NotificationPage } from "pages/other/NotificationPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class RecentUpdatesWidgetTest extends BaseRestTest {

    private readonly message: string = "Job shared especially for you..";
    private readonly notificationMessage: string = "shared a Job Vacancy with you!";
    private readonly emptyNotificationMessage: string = "There are no new notifications.";
    private readonly emptyNotificationMessageInLandingPage: string = "You're up to date with everything";
    private readonly jobTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser();
        this.waitForResponse(15000);
      this.user2 = this.createUser();
    }

    public shouldCheckThatEmptyRecentUpdatesWidgetIsVisible(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.messageForEmptyRecentUpdatesWidget).toContainText(this.emptyNotificationMessageInLandingPage, { timeout: 30000 });
        __page1 = __page1.goDirectlyTo(NotificationPage);
        expect(__page1.noNotificationLabel).toContainText(this.emptyNotificationMessage, { timeout: 30000 });
    }

    public shouldNotifyUser(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.getFirstItemOnAllVacanciesList(this.jobTitleContainer);
        __page2 = __page2.clickShareOpportunityFromAllJobVacancies(ShareJobPage);
        return super.assertShareModalHeaderDisplays();
        __page2 = __page2.selectUserToShare(this.user2.name);
        __page2 = __page2.enterShareMessage(this.message);
        __page2 = __page2.notifyIndividuals();
        __page2 = __page2.clickShare();
        return super.assertShareSuccessToasterDisplays();
        __page2 = __page2.waitForNotificationToBeSend();
    }

    public shouldCheckNotificationInRecentUpdatesWidget(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user2));
        __page3 = __page3.refreshCurrentPage(LandingPage);
        expect(__page3.notificationMessageRecentUpdatesWidget.first()).toContainText(this.notificationMessage, { timeout: 30000 });
        __page3 = __page3.clickSeeAllButtonForRecentUpdatesWidget();
        expect(__page3.notificationMessage).toContainText(this.notificationMessage, { timeout: 30000 });
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.clickFirstNotificationInRecentUpdatesWidget(JobVacancyDetailsPage);
        expect(__page3.jobTitle).toContainText(this.jobTitleContainer.getValue(), { timeout: 30000 });
        __page3 = __page3.goDirectlyTo(NotificationPage);
        __page3 = __page3.clickFirstNotificationInRecentUpdatesWidget(JobVacancyDetailsPage);
        expect(__page3.jobTitle).toContainText(this.jobTitleContainer.getValue(), { timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
