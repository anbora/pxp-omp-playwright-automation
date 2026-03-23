import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { ShareJobAssertions } from "assertions/careergrowth/share/ShareJobAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { NotificationPageAssertions } from "assertions/other/NotificationPageAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatMessageForEmptyRecentUpdatesWidgetContains(this.emptyNotificationMessageInLandingPage)
                .endAssertion()
                .goDirectlyTo(NotificationPage)
                .check(NotificationPageAssertions)
                    .assertThatNoNotificationLabelContains(this.emptyNotificationMessage);
    }

    public shouldNotifyUser(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .getFirstItemOnAllVacanciesList(this.jobTitleContainer)
                .clickShareOpportunityFromAllJobVacancies(ShareJobPage)
                .check(ShareJobAssertions)
                    .assertShareJobHeaderDisplays()
                .endAssertion()
                .selectUserToShare(this.user2.name)
                .enterShareMessage(this.message)
                .notifyIndividuals()
                .clickShare()
                .check(ShareJobAssertions)
                    .assertShareSuccessToasterDisplays()
                .endAssertion()
                .waitForNotificationToBeSend();
    }

    public shouldCheckNotificationInRecentUpdatesWidget(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .refreshCurrentPage(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatNotificationForRecentUpdatesWidgetContains(this.notificationMessage)
                .endAssertion()
                .clickSeeAllButtonForRecentUpdatesWidget()
                .check(NotificationPageAssertions)
                    .assertThatNotificationMessageContains(this.notificationMessage)
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickFirstNotificationInRecentUpdatesWidget(JobVacancyDetailsPage)
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.jobTitleContainer.getValue())
                .endAssertion()
                .goDirectlyTo(NotificationPage)
                .clickFirstNotificationInRecentUpdatesWidget(JobVacancyDetailsPage)
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.jobTitleContainer.getValue());
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
