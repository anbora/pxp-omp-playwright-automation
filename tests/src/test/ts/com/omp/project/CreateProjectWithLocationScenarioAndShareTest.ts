// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { CreateProjectWithLocationAndShareScenario } from "scenarios/project/CreateProjectWithLocationAndShareScenario";
import { expect } from "common/testing/playwright";

export class CreateProjectWithLocationScenarioAndShareTest extends BaseRestTest {

    private projectTitle: string = "LocationTest" + UUID.randomUUID();
    private projectDesc: string = "Location Test Desc";
    private locationTextToEnter: string = "Santa Monica HQ";
    private locationName: string = "Santa Monica HQ";
    private messageToShare: string = "Share Message" + UUID.randomUUID();
    private actionName: string = "View details";
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(true);
    }

    public createAProjectWithOneLocationAndVerifyDetails(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        expect(__page1.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page1.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new CreateProjectWithLocationAndShareScenario(this.projectTitle, this.projectDesc, this.locationTextToEnter, this.locationName));
        return super.assertShareModalHeaderDisplays();
        __page1 = __page1.selectUserToShare(this.user2.fullName);
        __page1 = __page1.enterShareMessage(this.messageToShare);
        __page1 = __page1.clickShare();
        expect(__page1.shareSuccessToasterMessage).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(ProjectsMePage);
        __page1 = __page1.searchForProject(this.projectTitle);
        expect(__page1.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage);
        expect(__page1.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page1.projectLocationsText(this.locationName)).toBeVisible({ timeout: 30000 });
    }

    public verifySharedWithMeShowsSharedProjectWithLocation(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToProjectsTab();
        __page2 = __page2.clickSharedWithMeTab();
        expect(__page2.projectTitleSharedWithMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page2.projectSharedByUserName(this.projectTitle, this.user.fullName)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickSharedProjectViewMessage(this.projectTitle);
        expect(__page2.shareProjectViewMessageModalHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.shareProjectMessageText(this.messageToShare)).toBeVisible({ timeout: 30000 });
        __page2.shareProjectViewMessageCloseModal.click();
    }

    public closeProject(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickPublishedTab();
        expect(__page3.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardDropDownAction("Close", ProjectDetailsPage);
        expect(__page3.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCloseButtonCloseProjectModal();
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickClosedTab();
        __page3 = __page3.refreshCurrentPage(ProjectsMePage);
        expect(__page3.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
