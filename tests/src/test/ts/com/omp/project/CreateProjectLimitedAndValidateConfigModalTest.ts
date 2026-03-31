// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { expect } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreateProjectLimitedAndValidateConfigModalTest extends BaseRestTest {

    private projectTitle: string = "Config" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private projectAction: string = "View Project details";
    private projectAction2: string = "View details";
    private projectAction3: string = "Manage Project";
    private openingsCount: string = "0/1";
    private projectStatusText: string = "Applied";
    private projectAction1: string = "Close";
    private applyTextMessage: string = "ApplyMessage" + UUID.randomUUID();
    private urlContainer: ResultContainer = new ResultContainer();
    private user2: UserModel;
    private user3: UserModel;

    public initialize(): void {
      this.user2 = this.createUser(true);
        this.wait(10000);
      this.user3 = this.createUser(true);
    }

    public setProjectApplicationModalSettingsToOn(): void {
        let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab("Talent Marketplace");
        __page1 = __page1.openMenuForProjectOpportunityMarketplace();
        expect(__page1.requireApplicantMessage).toBeVisible({ timeout: 30000 });
        expect(__page1.showManagerPermission).toBeVisible({ timeout: 30000 });
        __page1 = __page1.toggleRequireApplicantMessageToOn();
        __page1 = __page1.toggleShowManagerPermissionToOn();
        __page1 = __page1.clickSaveButtonConfigTab();
    }

    public createProjectAndPublishWithLimitedOpening(): void {
        let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user2.name));
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.clickCreateButton();
        __page2 = __page2.clickCreateProjectButton();
        __page2 = __page2.fillInProjectTitle(this.projectTitle);
        __page2 = __page2.fillInProjectDescription(this.projectDesc);
        __page2 = __page2.selectAProjectThumbnail();
        __page2 = __page2.enableApplicationRequired();
        __page2 = __page2.clickPublishButton();
        __page2 = __page2.clickMayBeLaterButton();
        __page2 = __page2.clickPublishedTab();
        expect(__page2.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page2.projectOpeningsCountField(this.projectTitle, this.openingsCount)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page2 = __page2.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction2, ProjectsMePage);
        __page2 = __page2.copyCurrentURL(this.urlContainer);
    }

    public applyForAProjectWithLimitedOpenings(): void {
        let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user3));
        __page3 = __page3.run(new AddRoleAndFamilyToNewUserScenario(this.user3.name));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToProjectsPageViaTab();
        expect(__page3.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page3.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page3.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page3.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page3.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickInFiltersButton();
        expect(__page3.allFiltersHeader).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickFilterCancelButton();
        __page3 = __page3.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        expect(__page3.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page3.applyButton).toBeVisible({ timeout: 30000 });
        expect(__page3.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page3.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page3.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page3.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page3.projectPublishedDate).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickApplyForAProject();
        expect(__page3.applyConfirmationModal).toBeVisible({ timeout: 30000 });
        expect(__page3.applyToALimitedOpeningProjectManagerConsentChkBox).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickSubmitButtonWithMsgAndConsentYesToProject(this.applyTextMessage);
        expect(__page3.applyToAProjectConfirmationModal).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCloseButtonApplyToALimitedOpeningProjectConfModal();
        expect(__page3.projectDetailsApplicantStatusText(this.projectStatusText)).toBeVisible({ timeout: 30000 });
    }

    public checkUserIsDisplayedInManageProjectAndCloseProject(): void {
        let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user2));
        __page4 = __page4.goToMePageProfile();
        __page4 = __page4.goToProjectsTab();
        __page4 = __page4.clickPublishedTab();
        expect(__page4.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page4 = __page4.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        expect(__page4.appliedUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickOnAActionManageProjects(this.projectAction);
        __page4 = __page4.clickOnAProjectAction(this.projectAction1, ProjectDetailsPage);
        expect(__page4.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickCloseButtonCloseProjectModal();
        __page4 = __page4.goToMePageProfile();
        __page4 = __page4.goToProjectsTab();
        __page4 = __page4.clickClosedTab();
        __page4 = __page4.waitForProjectCardToBeVisible();
        expect(__page4.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public setProjectApplicationModalSettingsToOff(): void {
        let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page5 = __page5.goToAdminPanel();
        __page5 = __page5.selectMainTab("Talent Marketplace");
        __page5 = __page5.openMenuForProjectOpportunityMarketplace();
        expect(__page5.requireApplicantMessage).toBeVisible({ timeout: 30000 });
        expect(__page5.showManagerPermission).toBeVisible({ timeout: 30000 });
        __page5 = __page5.toggleRequireApplicantMessageToOff();
        __page5 = __page5.toggleShowManagerPermissionToOff();
        __page5 = __page5.clickSaveButtonConfigTab();
    }

    public afterClass(): void {
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
