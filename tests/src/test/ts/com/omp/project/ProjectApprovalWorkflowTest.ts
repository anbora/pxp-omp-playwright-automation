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
import { CreateProjectWithDepartmentOrgFieldScenario } from "scenarios/project/CreateProjectWithDepartmentOrgFieldScenario";

export class ProjectApprovalWorkflowTest extends BaseRestTest {

    private projectTitle: string = "ProjApproval" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private projectAction2: string = "View details";
    private projectAction3: string = "Manage Project";
    private orgUnitValue: string = "Automation Dept";
    private openingsCount: string = "0/1";
    private projectStatusText: string = "Applied";
    private applicantStatusText1: string = "Pending";
    private applicantStatusText2: string = "Pending approval";
    private applicantStatusText3: string = "Accepted";
    private applicantStatusText4: string = "Approved";
    private selectFilterValue: string = "approval-filter-approved";
    private projectAction1: string = "Close";
    private urlContainer: ResultContainer = new ResultContainer();
    private user2: UserModel;
    private user3: UserModel;

    public initialize(): void {
      this.user2 = this.createUser(true);
        this.wait(10000);
      this.user3 = this.createUser(true);
    }

    public resetDurationAndTimezoneToDefaultAndSave(): void {
        let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab("Talent Marketplace");
        __page1 = __page1.openMenuForProjectOpportunityMarketplace();
        __page1 = __page1.clickStandardFieldsButton();
        expect(__page1.projectConfigShowHideColumHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectConfigRequiredColumHeader).toBeVisible({ timeout: 30000 });
        __page1 = __page1.toggleTimezonesFieldShowHideToOn();
        __page1 = __page1.toggleTimeCommitmentRequiredToOff();
        __page1 = __page1.clickSaveButtonStandardFieldTab();
    }

    public setProjectApplicationModalSettingsToOff(): void {
        let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab("Talent Marketplace");
        __page2 = __page2.openMenuForProjectOpportunityMarketplace();
        expect(__page2.requireApplicantMessage).toBeVisible({ timeout: 30000 });
        expect(__page2.showManagerPermission).toBeVisible({ timeout: 30000 });
        __page2 = __page2.toggleRequireApplicantMessageToOff();
        __page2 = __page2.toggleShowManagerPermissionToOff();
        __page2 = __page2.clickSaveButtonConfigTab();
    }

    public createProjectAndPublishWithLimitedOpening(): void {
        let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginWithOnboardingScenario(this.user2));
        __page3 = __page3.run(new AddRoleAndFamilyToNewUserScenario(this.user2.name));
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.clickCreateButton();
        expect(__page3.createProjectButton().first()).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCreateProjectButton();
        expect(__page3.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page3.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page3.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page3.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page3 = __page3.run(new CreateProjectWithDepartmentOrgFieldScenario(this.projectTitle, this.projectDesc, this.orgUnitValue));
        __page3 = __page3.clickPublishedTab();
        expect(__page3.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page3.projectOpeningsCountField(this.projectTitle, this.openingsCount)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction2, ProjectsMePage);
        __page3 = __page3.copyCurrentURL(this.urlContainer);
    }

    public applyForAProjectWithLimitedOpenings(): void {
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

    public approveAUserForAProjectWithLimitedOpenings(): void {
        let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user2));
        __page5 = __page5.goToMePageProfile();
        __page5 = __page5.goToProjectsTab();
        __page5 = __page5.clickPublishedTab();
        expect(__page5.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page5 = __page5.clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage);
        expect(__page5.appliedUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page5.applicantStatusText_alternative(this.applicantStatusText1)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickApplicantApproveButton();
        expect(__page5.applicantStatusText_alternative(this.applicantStatusText2)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickApplicantSeeDetailsButton();
        expect(__page5.approvalModalHeaderText).toBeVisible({ timeout: 30000 });
        expect(__page5.projectOwnerApprovalStatusText(this.applicantStatusText3)).toBeVisible({ timeout: 30000 });
        expect(__page5.projectOwnerNameText(this.user2.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page5.projectApprover1ApprovalStatusText(this.applicantStatusText2)).toBeVisible({ timeout: 30000 });
        expect(__page5.projectApprover2ApprovalStatusText(this.applicantStatusText2)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.clickApprovalStatusModalCloseButton();
    }

    public approveUserWithApprover1(): void {
        let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.getUserByName("Bobby Benjamin")));
        __page6 = __page6.goToMePageProfile();
        __page6 = __page6.goToProjectsTab();
        __page6 = __page6.clickApprovalRequestsTab();
        expect(__page6.approvalRequestsHeader).toBeVisible({ timeout: 30000 });
        expect(__page6.appliedUserUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page6.appliedUserProjectName(this.user3.fullName, this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickActionEndUser(this.user3.fullName, "Approve");
        expect(__page6.appliedUserUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page6.appliedUserProjectName(this.user3.fullName, this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page6.appliedUserStatusText(this.user3.fullName, this.applicantStatusText1)).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickAppliedUserSeeDetailsButton(this.user3.fullName);
        expect(__page6.statusDetailsHeader).toBeVisible({ timeout: 30000 });
        expect(__page6.projectApprover1ApprovalStatusText(this.applicantStatusText3)).toBeVisible({ timeout: 30000 });
        expect(__page6.projectApprover2ApprovalStatusText(this.applicantStatusText2)).toBeVisible({ timeout: 30000 });
        __page6 = __page6.clickApprovalModalCloseButton();
    }

    public approveUserWithApprover2(): void {
        let __page7: any = this;
        __page7 = __page7.getOmpLoginPage();
        __page7 = __page7.run(new LoginScenario(this.getUserByName("Smokey Bear")));
        __page7 = __page7.goToMePageProfile();
        __page7 = __page7.goToProjectsTab();
        __page7 = __page7.clickApprovalRequestsTab();
        expect(__page7.approvalRequestsHeader).toBeVisible({ timeout: 30000 });
        expect(__page7.appliedUserUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page7.appliedUserProjectName(this.user3.fullName, this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickActionEndUser(this.user3.fullName, "Approve");
        __page7 = __page7.clickApprovalRequestsFilterAndSelectAValue("Pending approval", this.selectFilterValue);
        expect(__page7.approvalRequestsHeader).toBeVisible({ timeout: 30000 });
        expect(__page7.appliedUserUserName(this.user3.fullName)).toBeVisible({ timeout: 30000 });
        expect(__page7.appliedUserProjectName(this.user3.fullName, this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page7.appliedUserStatusText(this.user3.fullName, this.applicantStatusText4)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickAppliedUserSeeDetailsButton_ApprovedFilter(this.user3.fullName);
        expect(__page7.statusDetailsHeader).toBeVisible({ timeout: 30000 });
        expect(__page7.projectApprover1ApprovalStatusText(this.applicantStatusText3)).toBeVisible({ timeout: 30000 });
        expect(__page7.projectApprover2ApprovalStatusText(this.applicantStatusText3)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.clickApprovalModalCloseButton();
    }

    /*@AfterClass Will add it back once we fix the issue with deleted users throwing error in approval requests tab
    public afterClass(): void {
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }*/
}
