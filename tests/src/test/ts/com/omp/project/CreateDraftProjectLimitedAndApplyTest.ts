// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CreateDraftProjectLimitedAndApplyTest extends BaseRestTest {

    private projectTitle: string = "LimtedTest" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private projectAction: string = "Edit";
    private projectAction2: string = "View details";
    private projectAction3: string = "Manage Project";
    private openingsCount: string = "0/1";
    private projectStatusText: string = "Applied";
    private defaultAction: string = "Participate";
    private defaultAction2: string = "Mark As Complete";
    private filterValue: string = "my-projects-filter-inprogress";
    private filterValue2: string = "my-projects-filter-rejected";
    private rejectTextMessage: string = "RejectMessage" + UUID.randomUUID();
    private user2Status: string = "Rejected";
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

    public createDraftProjectEditAndPublishWithLimitedOpening(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user1));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user1.name));
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.clickCreateButton();
        __page2 = __page2.clickCreateProjectButton();
        __page2 = __page2.fillInProjectDescription(this.projectDesc);
        __page2 = __page2.selectAProjectThumbnail();
        __page2 = __page2.clickPublishButton();
        expect(__page2.errormessageRequiredField.first()).toContainText("Please enter a title", { timeout: 30000 });
        __page2 = __page2.fillInProjectTitle(this.projectTitle);
        __page2 = __page2.clickDraftButton();
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToProjectsTab();
        __page2 = __page2.clickDraftTab();
        expect(__page2.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page2.ownedByMeHorizontalCardDefaultAction(this.projectTitle, this.projectAction)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page2 = __page2.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction, CreateProjectPage);
        __page2 = __page2.enableApplicationRequired();
        __page2 = __page2.clickPublishButton();
        __page2 = __page2.clickMayBeLaterButton();
        __page2 = __page2.clickDraftTab();
        expect(__page2.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).not.toBeVisible({ timeout: 5000 });
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

    public applyForAProjectWithLimitedOpeningsWithUser2(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginWithOnboardingScenario(this.user3));
        __page4 = __page4.run(new AddRoleAndFamilyToNewUserScenario(this.user3.name));
        __page4 = __page4.goToCareerGrowthPage();
        __page4 = __page4.goToProjectsPageViaTab();
        expect(__page4.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page4.filtersButton).toBeVisible({ timeout: 30000 });
        expect(__page4.sortByDropDown().first()).toBeVisible({ timeout: 30000 });
        expect(__page4.searchInputField).toBeVisible({ timeout: 30000 });
        expect(__page4.createAProjectButton).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickInFiltersButton();
        expect(__page4.allFiltersHeader).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickFilterCancelButton();
        __page4 = __page4.visitAURL(this.urlContainer.getValue(), ProjectDetailsPage);
        expect(__page4.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page4.applyButton).toBeVisible({ timeout: 30000 });
        expect(__page4.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page4.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page4.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page4.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page4.projectPublishedDate).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickApplyForAProject();
        expect(__page4.applyConfirmationModal).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickSubmitButtonApplyToLimitedOpeningProject();
        expect(__page4.applyToAProjectConfirmationModal).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickCloseButtonApplyToALimitedOpeningProjectConfModal();
        expect(__page4.projectDetailsApplicantStatusText(this.projectStatusText)).toBeVisible({ timeout: 30000 });
    }

    public approveAndRejectUserForAProjectWithLimitedOpenings(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user1));
        __page5 = __page5.goToMePageProfile();
        __page5 = __page5.goToProjectsTab();
        __page5 = __page5.clickPublishedTab();
        expect(__page5.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page5 = __page5.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        expect(__page5.appliedUserName(this.user2.fullName)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.copyCurrentURL(this.urlContainer);
        __page5 = __page5.clickApplicantAcceptButtonForSpecificUser(this.user2.fullName);
        expect(__page5.applicantAcceptedText).toBeVisible({ timeout: 30000 });
        expect(__page5.appliedUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickApplicantRejectButtonForSpecificUser(this.user3.fullName);
        expect(__page5.rejectApplicantConfirmationModal).toBeVisible({ timeout: 30000 });
        __page5 = __page5.rejectApplicantWithMessage(this.rejectTextMessage);
        expect(__page5.applicantRejectedConfirmationToaster).toBeVisible({ timeout: 30000 });
        expect(__page5.applicantRejectedText).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickViewMessageDropDownButton();
        expect(__page5.viewMessageText(this.rejectTextMessage)).toBeVisible({ timeout: 30000 });
    }

    public user1StartsTheProject(): void {
                let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user2));
        __page6 = __page6.goToMePageProfile();
        __page6 = __page6.goToProjectsTab();
        __page6 = __page6.clickMyProjectsTab();
        expect(__page6.projectHorizontalCardTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page6.projectHorizontalCardDefaultAction(this.projectTitle, this.defaultAction)).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickDefaultActionInProjectCard(this.projectTitle, this.defaultAction);
        expect(__page6.appliedConfirmationModal).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickCloseButtonAppliedToAProjectConfModal();
        __page6 = __page6.clickMyProjectsFilterDropDown();
        __page6 = __page6.selectMyProjectsFilterValue(this.filterValue);
        __page6 = __page6.clickMyProjectFilterApplyButton();
        expect(__page6.projectHorizontalCardTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page6.projectHorizontalCardDefaultAction(this.projectTitle, this.defaultAction2)).toBeVisible({ timeout: 30000 });
    }

    public user2VerifiesRejectedStatusAndMessage(): void {
                let __page7: any = this;
        __page7 = __page7.getOmpLoginPage();
        __page7 = __page7.run(new LoginScenario(this.user3));
        __page7 = __page7.goToMePageProfile();
        __page7 = __page7.goToProjectsTab();
        __page7 = __page7.clickMyProjectsTab();
        expect(__page7.projectHorizontalCardTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page7.projectHorizontalCardStatus(this.projectTitle, this.user2Status)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickMyProjectsViewMessage(this.projectTitle);
        expect(__page7.myProjectsViewMessageModalHeader(this.user1.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page7.myProjectsViewRejectionMessageText(this.rejectTextMessage)).toBeVisible({ timeout: 30000 });
        __page7.shareProjectViewMessageCloseModal.click();
        __page7 = __page7.clickMyProjectsFilterDropDown();
        __page7 = __page7.selectMyProjectsFilterValue(this.filterValue2);
        __page7 = __page7.clickMyProjectFilterApplyButton();
        expect(__page7.projectHorizontalCardTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public projectOwnerMarksCompleteUserAndClosesProject(): void {
                let __page8: any = this;
        __page8 = __page8.getOmpLoginPage();
        __page8 = __page8.run(new LoginScenario(this.user1));
        __page8 = __page8.goToMePageProfile();
        __page8 = __page8.goToProjectsTab();
        __page8 = __page8.clickPublishedTab();
        expect(__page8.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page8 = __page8.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        __page8 = __page8.clickParticipantProgressTab();
        expect(__page8.appliedUserName(this.user2.fullName)).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickMarkAsCompleteButton();
        expect(__page8.participantCompletedCount("1")).toBeVisible({ timeout: 30000 });
        expect(__page8.applicantStatusText("Completed")).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickOnAActionManageProjects("Close");
        expect(__page8.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page8 = __page8.clickCloseButtonCloseProjectModal();
        __page8 = __page8.goDirectlyTo(LandingPage);
        __page8 = __page8.goToMePageProfile();
        __page8 = __page8.goToProjectsTab();
        __page8 = __page8.clickClosedTab();
        __page8 = __page8.refreshCurrentPage(ProjectsMePage);
        expect(__page8.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public validateErrorPageInManageProjectPageWhenNotOwner(): void {
                let __page9: any = this;
        __page9 = __page9.getOmpLoginPage();
        __page9 = __page9.run(new LoginScenario(this.user2));
        __page9 = __page9.visitAURL(this.urlContainer.getValue(), HomePage);
        expect(__page9.errorMessage).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
