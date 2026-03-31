// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { CreateProjectWithUploadThumbnailScenario } from "scenarios/project/CreateProjectWithUploadThumbnailScenario";
import { expect } from "common/testing/playwright";

export class CheckDuplicateFlowTest extends BaseRestTest {

    private projectTitle: string = "ThumbnailTest" + UUID.randomUUID();
    private projectTitle2: string = "DuplicateTest" + UUID.randomUUID();
    private projectDesc: string = "Description randmon Test Desc";
    private actionName: string = "Duplicate";
    private actionName2: string = "View details";
    private actionName3: string = "Close";
    private urlContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithUploadThumbnail(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        expect(__page1.createProjectButton().first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickCreateProjectButton();
        expect(__page1.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page1.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new CreateProjectWithUploadThumbnailScenario(this.projectTitle, this.projectDesc));
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName2, ProjectsMePage);
        __page1 = __page1.copyCurrentURL(this.urlContainer);
    }

    public duplicateAProjectFromProjectDetailsPage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToProjectsPageViaCard();
        expect(__page2.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page2.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page2.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page2.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page2 = __page2.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        expect(__page2.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page2.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page2.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page2.projectPublishedDate).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickOnAProjectAction(this.actionName, CreateProjectPage);
        expect(__page2.createDuplicateProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.projectDescText(this.projectDesc)).toBeVisible({ timeout: 30000 });
        expect(__page2.projectTitleText(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page2.projectOwnersCountTxt).toBeVisible({ timeout: 30000 });
        expect(__page2.replaceImageTxt).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickPublishButton();
        expect(__page2.duplicateProjectTitleWarning).toBeVisible({ timeout: 30000 });
        __page2 = __page2.duplicateTitleWarningModalclickCancelButton();
        __page2 = __page2.fillInProjectTitle(this.projectTitle2);
        __page2 = __page2.clickPublishButton();
        __page2 = __page2.clickMayBeLaterButton();
        expect(__page2.ownedByMeHorizontalCardProjectTitle(this.projectTitle2)).toBeVisible({ timeout: 30000 });
    }

    public dataProviderForClosingProjects(): any[][] {
        return [
                        [this.projectTitle],
                        [this.projectTitle2]
                ];
    }

    public closeProject(title: string): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickPublishedTab();
        expect(__page3.projectTitleMePage(title)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardActionsDropDown(title);
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName3, ProjectDetailsPage);
        expect(__page3.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCloseButtonCloseProjectModal();
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickClosedTab();
        __page3 = __page3.refreshCurrentPage(ProjectsMePage);
        expect(__page3.ownedByMeHorizontalCardProjectTitle(title)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
