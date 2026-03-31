// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class ProjectSmokeTest extends BaseRestTest {

    private projectTitle: string = "SmokeTest" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private projectAction: string = "View details";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createProjectCheckProjectDetailsAndProjectDiscoveryPage(): void {
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
        __page1 = __page1.fillInProjectTitle(this.projectTitle);
        __page1 = __page1.fillInProjectDescription(this.projectDesc);
        __page1 = __page1.selectAProjectThumbnail();
        __page1 = __page1.clickPublishButton();
        __page1 = __page1.clickMayBeLaterButton();
        __page1 = __page1.clickPublishedTab();
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickPublishedTab();
        __page1 = __page1.clickProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction, ProjectDetailsPage);
        expect(__page1.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page1.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page1.projectPublishedDate).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOnAProjectAction(this.actionName2, ProjectDetailsPage);
        expect(__page1.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickCloseButtonCloseProjectModal();
        expect(__page1.confirmationToaster(this.toasterText)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToProjectsTab();
        __page1 = __page1.clickClosedTab();
        expect(__page1.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToProjectsPageViaCard();
        expect(__page1.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page1.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page1.createAProjectButton).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
