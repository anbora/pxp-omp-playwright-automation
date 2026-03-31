// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { CreateProjectWithUploadThumbnailScenario } from "scenarios/project/CreateProjectWithUploadThumbnailScenario";
import { expect } from "common/testing/playwright";

export class CreateProjectUnlimitedAndApplyTest extends BaseRestTest {

    private projectTitle: string = "UnlimitedTest" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private projectStatusText: string = "In Progress";
    private projectAction: string = "View details";
    private projectAction2: string = "Bookmark";
    private projectAction3: string = "Manage Project";
    private defaultAction: string = "Unbookmark";
    private urlContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(true);
    }

    public createProjectWithUnlimitedOpeningsBookmarkAndUnbookmarkTheProject(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        __page1 = __page1.run(new CreateProjectWithUploadThumbnailScenario(this.projectTitle, this.projectDesc));
        __page1 = __page1.clickPublishedTab();
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction2, ProjectsMePage);
        expect(__page1.successToastMessage).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickBookmarkedTab();
        expect(__page1.projectHorizontalCardTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickDefaultActionInProjectCard(this.projectTitle, this.defaultAction);
        expect(__page1.projectHorizontalCardTitle(this.projectTitle)).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.clickPublishedTab();
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction, ProjectsMePage);
        __page1 = __page1.copyCurrentURL(this.urlContainer);
    }

    public applyForAProjectUnlimitedOpenings(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToProjectsPageViaTab();
        __page2 = __page2.clickInFiltersButton();
        expect(__page2.allFiltersHeader).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickFilterCancelButton();
        __page2 = __page2.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        __page2 = __page2.clickGetStartedForAProject();
        expect(__page2.appliedConfirmationModal).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickCloseButtonAppliedToAProjectConfModal();
        expect(__page2.projectDetailsApplicantStatusText(this.projectStatusText)).toBeVisible({ timeout: 30000 });
    }

    public markCompleteUserAndCloseTheCreatedProject(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickPublishedTab();
        expect(__page3.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        __page3 = __page3.clickMarkAsCompleteButton();
        expect(__page3.participantCompletedCount("1")).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickOnAActionManageProjects("Close");
        expect(__page3.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCloseButtonCloseProjectModal();
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickClosedTab();
        expect(__page3.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
