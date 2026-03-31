// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class MePageProjectBasicTest extends BaseRestTest {

    private user: UserModel;
    private projectTitle: string = "LimtedTest" + UUID.randomUUID();
    private projectDesc: string = "Description Random";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public basicProjectTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        __page1 = __page1.fillInProjectTitle(this.projectTitle);
        __page1 = __page1.fillInProjectDescription(this.projectDesc);
        __page1 = __page1.selectAProjectThumbnail();
        __page1 = __page1.clickDraftButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToProjectsTab();
        __page1 = __page1.clickDraftTab();
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickEditButton();
        __page1 = __page1.clickPublishButton();
        __page1 = __page1.clickMaybeLaterButton();
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickThreeDotMenuButton();
        __page1 = __page1.clickBookmarkButton();
        __page1 = __page1.clickShareProjectDropdownButton();
        __page1 = __page1.clickSelectIndividualShareProject();
        __page1 = __page1.clickShareProject();
        __page1 = __page1.clickBookmarkedTab();
        expect(__page1.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickUnBookmarkButton();
        expect(__page1.bookmarkedProjectsEmpty.first()).toContainText("Your bookmarked Projects will be showcased here. Start exploring Projects.", { timeout: 30000 });
        __page1 = __page1.clickThreeDotMenuButton();
        __page1 = __page1.clickCloseProjectThreeDotMenuButton();
        __page1 = __page1.clickAreYouSureCloseProjectButton();
        __page1 = __page1.clickClosedTab();
        expect(__page1.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickPublishedTab();
        expect(__page1.bookmarkedProjectsEmpty.first()).toContainText("Projects published or owned by you will be showcased here. Get started by creating a Project.", { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
