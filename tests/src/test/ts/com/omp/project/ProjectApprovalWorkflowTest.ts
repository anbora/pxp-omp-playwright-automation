import { OpportunityMarketplaceProjectAssertions } from "assertions/admin/OpportunityMarketplaceProjectAssertions";
import { CreateProjectAssertions, ManageProjectAssertions, ProjectDetailsAssertions, ProjectDiscoveryAssertions, ProjectMePageAssertions } from "assertions/careergrowth/project";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToAdminPanel()
                .selectMainTab("Talent Marketplace")
                .openMenuForProjectOpportunityMarketplace()
                .clickStandardFieldsButton()
                .check(OpportunityMarketplaceProjectAssertions)
                .assertThatAdminProjectConfigPageLoads()
                .endAssertion()
                .toggleTimezonesFieldShowHideToOn()
                .toggleTimeCommitmentRequiredToOff()
                .clickSaveButtonStandardFieldTab();
    }

    public setProjectApplicationModalSettingsToOff(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToAdminPanel()
                .selectMainTab("Talent Marketplace")
                .openMenuForProjectOpportunityMarketplace()
                .check(OpportunityMarketplaceProjectAssertions)
                    .assertThatRequireApplicantMessageLabelIsVisible()
                    .assertThatShowManagerPermissionLabelIsVisible()
                .endAssertion()
                .toggleRequireApplicantMessageToOff()
                .toggleShowManagerPermissionToOff()
                .clickSaveButtonConfigTab();
    }

    public createProjectAndPublishWithLimitedOpening(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .goDirectlyTo(LandingPage)
                .clickCreateButton()
                .check(LandingPageAssertions)
                    .assertThatCreateProjectButtonIsDisplayed()
                .endAssertion()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithDepartmentOrgFieldScenario(this.projectTitle, this.projectDesc, this.orgUnitValue))
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                    .assertOpeningsCountMatches(this.projectTitle, this.openingsCount)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction2, ProjectsMePage)
                .copyCurrentURL(this.urlContainer);
    }

    public applyForAProjectWithLimitedOpenings(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user3))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user3.name))
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoads()
                .endAssertion()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertFilterPageLoads()
                .endAssertion()
                .clickFilterCancelButton()
                .visitAURL(this.urlContainer.getValue(), ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoads(this.projectTitle)
                .endAssertion()
                .clickApplyForAProject()
                .check(ProjectDetailsAssertions)
                    .applyForALimitedOpeningProjectModalDisplays()
                .endAssertion()
                .clickSubmitButtonApplyToLimitedOpeningProject()
                .check(ProjectDetailsAssertions)
                    .appliedToALimitedOpeningProjectModalDisplays()
                .endAssertion()
                .clickCloseButtonApplyToALimitedOpeningProjectConfModal()
                .check(ProjectDetailsAssertions)
                    .assertProjectStatusTextDisplays(this.projectStatusText);
    }

    public approveAUserForAProjectWithLimitedOpenings(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage)
                .check(ManageProjectAssertions)
                    .assertUserNameDisplaysInAppliedList(this.user3.fullName)
                    .assertApplicantStatusTextDisplays(this.applicantStatusText1)
                .endAssertion()
                .clickApplicantApproveButton()
                .check(ManageProjectAssertions)
                    .assertApplicantStatusTextDisplays(this.applicantStatusText2)
                .endAssertion()
                .clickApplicantSeeDetailsButton()
                .check(ManageProjectAssertions)
                    .assertThatApprovalStatusModalIsDisplayed()
                    .assertThatProjectOwnerStatusIsDisplayed(this.applicantStatusText3)
                    .assertThatProjectOwnerNameIsDisplayed(this.user2.fullName)
                    .assertThatProjectApproverStatusIsDisplayed(this.applicantStatusText2,this.applicantStatusText2)
                .endAssertion()
                .clickApprovalStatusModalCloseButton();
    }

    public approveUserWithApprover1(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Bobby Benjamin")))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickApprovalRequestsTab()
                .check(ProjectMePageAssertions)
                    .assertApprovalRequestsTabDisplays()
                    .assertAppliedUserDetailsBeforeApproval(this.user3.fullName, this.projectTitle)
                .endAssertion()
                .clickActionEndUser(this.user3.fullName, "Approve")
                .check(ProjectMePageAssertions)
                    .assertAppliedUserDetails(this.user3.fullName, this.projectTitle, this.applicantStatusText1)
                .endAssertion()
                .clickAppliedUserSeeDetailsButton(this.user3.fullName)
                .check(ProjectMePageAssertions)
                    .assertStatusDetailsModalDisplays()
                    .assertUserApprovalStatus(this.applicantStatusText3, this.applicantStatusText2)
                .endAssertion()
                .clickApprovalModalCloseButton();
    }

    public approveUserWithApprover2(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Smokey Bear")))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickApprovalRequestsTab()
                .check(ProjectMePageAssertions)
                    .assertApprovalRequestsTabDisplays()
                    .assertAppliedUserDetailsBeforeApproval(this.user3.fullName, this.projectTitle)
                .endAssertion()
                .clickActionEndUser(this.user3.fullName, "Approve")
                .clickApprovalRequestsFilterAndSelectAValue("Pending approval", this.selectFilterValue)
                .check(ProjectMePageAssertions)
                    .assertApprovalRequestsTabDisplays()
                    .assertAppliedUserDetails(this.user3.fullName, this.projectTitle, this.applicantStatusText4)
                .endAssertion()
                .clickAppliedUserSeeDetailsButton_ApprovedFilter(this.user3.fullName)
                .check(ProjectMePageAssertions)
                    .assertStatusDetailsModalDisplays()
                    .assertUserApprovalStatus(this.applicantStatusText3, this.applicantStatusText3)
                .endAssertion()
                .clickApprovalModalCloseButton();
    }

    /*@AfterClass Will add it back once we fix the issue with deleted users throwing error in approval requests tab
    public afterClass(): void {
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }*/
}
