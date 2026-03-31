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
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { CreateProjectWithOneOpeningScenario } from "scenarios/project/CreateProjectWithOneOpeningScenario";
import { expect } from "common/testing/playwright";

export class CheckNotifyWithdrawFromProjectTest extends BaseRestTest {

    private projectTitle: string = "NotifyTest" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private numOfOpeningsCount: string = "2";
    private projectAction2: string = "View details";
    private projectAction3: string = "Manage Project";
    private openingsCount: string = "0/1";
    private projectStatusText: string = "Applied";
    private withdrawTextMsg: string = "withdrawMsg" + UUID.randomUUID();
    private urlContainer: ResultContainer = new ResultContainer();
    private user1: UserModel;
    private user2: UserModel;
    private user3: UserModel;

    public initialize(): void {
      this.user1 = this.createUser(true);
        this.wait(10000);
      this.user2 = this.createUser(true);
        this.wait(10000);
      this.user3 = this.createUser(true);
    }

    public setProjectApplicationModalSettingsToOff(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab("Talent Marketplace");
        __page1 = __page1.openMenuForProjectOpportunityMarketplace();
        expect(__page1.requireApplicantMessage).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Require Applicant Message label is visible");
        expect(__page1.showManagerPermission).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Require Applicant Message label is visible");
        __page1 = __page1.toggleRequireApplicantMessageToOff();
        __page1 = __page1.toggleShowManagerPermissionToOff();
        __page1 = __page1.clickSaveButtonConfigTab();
    }

    public createProjectWith1OpeningAndPublish(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user1));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user1.name));
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.clickCreateButton();
        expect(__page2.createProjectButton().first()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickCreateProjectButton();
        expect(__page2.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page2.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page2.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page2 = __page2.run(new CreateProjectWithOneOpeningScenario(this.projectTitle, this.projectDesc));
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
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user2));
        __page3 = __page3.run(new AddRoleAndFamilyToNewUserScenario(this.user2.name));
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
        __page3 = __page3.clickSubmitButtonApplyToLimitedOpeningProject();
        expect(__page3.applyToAProjectConfirmationModal).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCloseButtonApplyToALimitedOpeningProjectConfModal();
        expect(__page3.projectDetailsApplicantStatusText(this.projectStatusText)).toBeVisible({ timeout: 30000 });
    }

    public approveAUserForAProjectWithLimitedOpenings(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user1));
        __page4 = __page4.goToMePageProfile();
        __page4 = __page4.goToProjectsTab();
        __page4 = __page4.clickPublishedTab();
        expect(__page4.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page4 = __page4.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        expect(__page4.appliedUserName(this.user2.fullName)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickApplicantApproveButton();
        expect(__page4.applicantAcceptedText).toBeVisible({ timeout: 30000 });
    }

    public validateNotifyMeAndSubscribeToAFullCapacityProject(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginWithOnboardingScenario(this.user3));
        __page5 = __page5.run(new AddRoleAndFamilyToNewUserScenario(this.user3.name));
        __page5 = __page5.goToCareerGrowthPage();
        __page5 = __page5.goToProjectsPageViaTab();
        expect(__page5.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page5.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page5.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page5.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page5.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickInFiltersButton();
        expect(__page5.allFiltersHeader).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickFilterCancelButton();
        __page5 = __page5.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        expect(__page5.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page5.applyButton).toBeVisible({ timeout: 30000 });
        expect(__page5.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page5.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page5.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page5.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page5.projectPublishedDate).toBeVisible({ timeout: 30000 });
        expect(__page5.capacityFullText).toBeVisible({ timeout: 30000 });
        expect(__page5.applyButtonDisabled).toBeVisible({ timeout: 30000 });
        expect(__page5.notifyMeButton).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickNotifyMeButton();
        expect(__page5.subscribedText).toBeVisible({ timeout: 30000 });
        expect(__page5.projectDetailsApplicantStatusText("Notification on")).toBeVisible({ timeout: 30000 });
    }

    public checkInterestedListAndAddOpeningsForFullCapacityProject(): void {
                let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user1));
        __page6 = __page6.goToMePageProfile();
        __page6 = __page6.goToProjectsTab();
        __page6 = __page6.clickPublishedTab();
        expect(__page6.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page6 = __page6.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        expect(__page6.subscribedUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page6.addOpeningsButton).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickAddOpeningsButton();
        expect(__page6.editProjectHeader).toBeVisible({ timeout: 30000 });
        __page6 = __page6.enterNumberOfOpeningsCount(this.numOfOpeningsCount);
        __page6 = __page6.clickSaveButton();
        expect(__page6.addOpeningsButton).not.toBeVisible({ timeout: 5000 });
        expect(__page6.subscribedUserName(this.user3.fullName)).not.toBeVisible({ timeout: 5000 });
        __page6.getPage().waitForLoadState();
        expect(__page6.openingsAvailableCount("1")).toBeVisible({ timeout: 30000 });
    }

    public validateNotifyMeIsNotDisplayedAndApplyForTheProject(): void {
                let __page7: any = this;
        __page7 = __page7.getOmpLoginPage();
        __page7 = __page7.run(new LoginScenario(this.user3));
        __page7 = __page7.goToCareerGrowthPage();
        __page7 = __page7.goToProjectsPageViaTab();
        expect(__page7.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page7.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page7.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page7.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page7.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickInFiltersButton();
        expect(__page7.allFiltersHeader).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickFilterCancelButton();
        __page7 = __page7.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        expect(__page7.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page7.applyButton).toBeVisible({ timeout: 30000 });
        expect(__page7.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page7.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page7.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page7.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page7.projectPublishedDate).toBeVisible({ timeout: 30000 });
        expect(__page7.capacityFullText).not.toBeVisible({ timeout: 5000 });
        expect(__page7.notifyMeButton).not.toBeVisible({ timeout: 5000 });
        __page7 = __page7.clickApplyForAProject();
        expect(__page7.applyConfirmationModal).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickSubmitButtonApplyToLimitedOpeningProject();
        expect(__page7.applyToAProjectConfirmationModal).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickCloseButtonApplyToALimitedOpeningProjectConfModal();
        expect(__page7.projectDetailsApplicantStatusText(this.projectStatusText)).toBeVisible({ timeout: 30000 });
    }

    public endUserWithdrawsFromTheProject(): void {
                let __page8: any = this;
        __page8 = __page8.getOmpLoginPage();
        __page8 = __page8.run(new LoginScenario(this.user2));
        __page8 = __page8.goToCareerGrowthPage();
        __page8 = __page8.goToProjectsPageViaTab();
        expect(__page8.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page8.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page8.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page8.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page8.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickInFiltersButton();
        expect(__page8.allFiltersHeader).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickFilterCancelButton();
        __page8 = __page8.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        __page8 = __page8.clickOnAProjectAction("Withdraw", ProjectDetailsPage);
        expect(__page8.withdrawConfirmationModal).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickWithdrawYesButtonWithMsg(this.withdrawTextMsg);
        expect(__page8.withdrawConfirmationToaster("The Project has been withdrawn")).toBeVisible({ timeout: 30000 });
        __page8 = __page8.goDirectlyTo(LandingPage);
        __page8 = __page8.goToMePageProfile();
        __page8 = __page8.goToProjectsTab();
        __page8 = __page8.clickMyProjectsTab();
        __page8 = __page8.clickMyProjectsFilterDropDown();
        __page8 = __page8.selectMyProjectsFilterValue("my-projects-filter-withdrawn");
        __page8 = __page8.clickMyProjectFilterApplyButton();
        expect(__page8.projectHorizontalCardTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page8.projectHorizontalCardStatus(this.projectTitle, "Withdrawn")).toBeVisible({ timeout: 30000 });
    }

    public projectOwnerChecksUsersInManageProjectAndClosesProject(): void {
                let __page9: any = this;
        __page9 = __page9.getOmpLoginPage();
        __page9 = __page9.run(new LoginScenario(this.user1));
        __page9 = __page9.goToMePageProfile();
        __page9 = __page9.goToProjectsTab();
        __page9 = __page9.clickPublishedTab();
        expect(__page9.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page9 = __page9.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page9 = __page9.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        expect(__page9.appliedUserName(this.user2.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page9.applicantWithdrawnStatusText).toBeVisible({ timeout: 30000 });
        expect(__page9.appliedUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        __page9.getPage().waitForLoadState();
        expect(__page9.openingsAvailableCount("2")).toBeVisible({ timeout: 30000 });
        __page9 = __page9.clickViewMessageDropDownButton();
        expect(__page9.viewMessageText(this.withdrawTextMsg)).toBeVisible({ timeout: 30000 });
        __page9 = __page9.clickParticipantProgressTab();
        expect(__page9.participantCompletedCount("0")).toBeVisible({ timeout: 30000 });
        expect(__page9.applicantStatusText("Withdrawn")).toBeVisible({ timeout: 30000 });
        __page9 = __page9.clickOnAActionManageProjects("Close");
        expect(__page9.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page9 = __page9.clickCloseButtonCloseProjectModal();
        __page9 = __page9.goDirectlyTo(LandingPage);
        __page9 = __page9.goToMePageProfile();
        __page9 = __page9.goToProjectsTab();
        __page9 = __page9.clickClosedTab();
        __page9 = __page9.refreshCurrentPage(ProjectsMePage);
        expect(__page9.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
