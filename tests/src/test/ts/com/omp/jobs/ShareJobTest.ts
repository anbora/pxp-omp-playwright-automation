import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { ShareJobAssertions } from "assertions/careergrowth/share/ShareJobAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ShareJobPage } from "pages/careergrowth/share/ShareJobPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ShareJobTest extends BaseRestTest {

    private jobTitle: string = UUID.randomUUID().toString();
    private message: string = this.jobTitle + " especially for you..";
    private jobId: string;
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.jobId = this.createJob(this.jobTitle);
      this.user = this.createUser();
//        this.waitForResponse(15000);
      this.user2 = this.createUser();
    }

    public shareChosenJobWithAUser(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.jobTitle)
                .clickShare(ShareJobPage)
                .check(ShareJobAssertions)
                    .assertShareJobHeaderDisplays()
                .endAssertion()
                .selectUserToShare(this.user2.name + " User")
                .enterShareMessage(this.message)
                .notifyIndividuals()
                .clickShare()
                .check(ShareJobAssertions)
                    .assertShareSuccessToasterDisplays()
                .endAssertion()
                .waitForNotificationToBeSend();
    }

    public verifySharedWithMeShowsSharedJob(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .check(LandingPageAssertions)
                    .assertThereIsAtLeastOneNewNotification()
                .endAssertion()
                .clickNotificationsBell()
                .check(LandingPageAssertions)
                    .assertNotificationHasArrived("shared a Job Vacancy with you!")
                .endAssertion()
                .clickNotificationsBell()
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab("Shared with me")
                .waitForJobToBeVisible()
                .check(MyOpportunitiesAssertions)
                    .assertThatSharedjobIsPresent(this.jobTitle)
                .endAssertion()
                .clickViewMessage()
                .check(MyOpportunitiesAssertions)
                    .assertMessageText(this.message)
                .endAssertion()
                .closeMessageModal();
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
