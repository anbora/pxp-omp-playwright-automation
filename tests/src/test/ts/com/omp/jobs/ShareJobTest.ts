// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ShareJobPage } from "pages/careergrowth/share/ShareJobPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Assert, assertTrue } from "common/testing/runtime";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.jobTitle);
        __page1 = __page1.clickShare(ShareJobPage);
        return super.assertShareModalHeaderDisplays();
        __page1 = __page1.selectUserToShare(this.user2.name + " User");
        __page1 = __page1.enterShareMessage(this.message);
        __page1 = __page1.notifyIndividuals();
        __page1 = __page1.clickShare();
        return super.assertShareSuccessToasterDisplays();
        __page1 = __page1.waitForNotificationToBeSend();
    }

    public verifySharedWithMeShowsSharedJob(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        Assert.assertTrue(Integer.parseInt(__page2.notificationsCounter().textContent()) > 0);
        __page2 = __page2.clickNotificationsBell();
        expect(__page2.notificationMessage("shared a Job Vacancy with you!").first()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickNotificationsBell();
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickOpenJobsTab();
        __page2 = __page2.selectLeftMenuTab("Shared with me");
        __page2 = __page2.waitForJobToBeVisible();
        expect(__page2.sharedJobByTitle(this.jobTitle)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickViewMessage();
        expect(__page2.message).toContainText(this.message, { timeout: 30000 });
        __page2 = __page2.closeMessageModal();
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
