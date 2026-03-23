import { OpportunityMarketplaceProjectAssertions } from "assertions/admin/OpportunityMarketplaceProjectAssertions";
import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ManageProjectAssertions } from "assertions/careergrowth/project/ManageProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
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
import { CreateProjectWithOneOpeningScenario } from "scenarios/project/CreateProjectWithOneOpeningScenario";

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

    public createProjectWith1OpeningAndPublish(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user1.name))
                .goDirectlyTo(LandingPage)
                .clickCreateButton()
                .check(LandingPageAssertions)
                    .assertThatCreateProjectButtonIsDisplayed()
                .endAssertion()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithOneOpeningScenario(this.projectTitle, this.projectDesc))
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
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoadsWithoutSuggest()
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
                .run(new LoginScenario(this.user1))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage)
                .check(ManageProjectAssertions)
                    .assertUserNameDisplaysInAppliedList(this.user2.fullName)
                .endAssertion()
                .clickApplicantApproveButton()
                .check(ManageProjectAssertions)
                    .assertApplicantAcceptedTextDisplays();
    }

    public validateNotifyMeAndSubscribeToAFullCapacityProject(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user3))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user3.name))
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoadsWithoutSuggest()
                .endAssertion()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertFilterPageLoads()
                .endAssertion()
                .clickFilterCancelButton()
                .visitAURL(this.urlContainer.getValue(), ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoads(this.projectTitle)
                    .assertCapacityFullTextIsDisplayed()
                    .assertApplyButtonIsDisabled()
                    .assertNotifyMeButtonIsDisplayed()
                .endAssertion()
                .clickNotifyMeButton()
                .check(ProjectDetailsAssertions)
                    .assertSubscribedTextIsDisplayed()
                    .assertProjectStatusTextDisplays("Notification on");
    }

    public checkInterestedListAndAddOpeningsForFullCapacityProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage)
                .check(ManageProjectAssertions)
                    .assertUserIsDisplayedInSubscribedUserList(this.user3.fullName)
                    .assertAddOpeningsButtonIsDisplayed()
                .endAssertion()
                .clickAddOpeningsButton()
                .check(CreateProjectAssertions)
                    .assertThatEditProjectHeaderIsDisplayed()
                .endAssertion()
                .enterNumberOfOpeningsCount(this.numOfOpeningsCount)
                .clickSaveButton()
                .check(ManageProjectAssertions)
                    .assertAddOpeningsButtonIsNotDisplayed()
                    .assertUserIsNotDisplayedInSubscribedUserList(this.user3.fullName)
                    .assertOpeningsAvailableCount("1");
    }

    public validateNotifyMeIsNotDisplayedAndApplyForTheProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user3))
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoadsWithoutSuggest()
                .endAssertion()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertFilterPageLoads()
                .endAssertion()
                .clickFilterCancelButton()
                .visitAURL(this.urlContainer.getValue(), ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoads(this.projectTitle)
                    .assertCapacityFullTextIsNotDisplayed()
                    .assertNotifyMeButtonIsNotDisplayed()
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

    public endUserWithdrawsFromTheProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                .assertProjectsDiscoveryPageLoadsWithoutSuggest()
                .endAssertion()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                .assertFilterPageLoads()
                .endAssertion()
                .clickFilterCancelButton()
                .visitAURL(this.urlContainer.getValue(), ProjectDetailsPage)
                .clickOnAProjectAction("Withdraw", ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertWithdrawConfirmationModalDisplays()
                .endAssertion()
                .clickWithdrawYesButtonWithMsg(this.withdrawTextMsg)
                .check(ProjectDetailsAssertions)
                    .assertWithdrawToasterTextDisplays("The Project has been withdrawn")
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToProjectsTab()
                .clickMyProjectsTab()
                .clickMyProjectsFilterDropDown()
                .selectMyProjectsFilterValue("my-projects-filter-withdrawn")
                .clickMyProjectFilterApplyButton()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInMyProjectsHorizontalCard(this.projectTitle)
                    .assertProjectStatusIsDisplayedInProjectCard(this.projectTitle, "Withdrawn");
    }

    public projectOwnerChecksUsersInManageProjectAndClosesProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage)
                .check(ManageProjectAssertions)
                    .assertUserNameDisplaysInAppliedList(this.user2.fullName)
                    .assertApplicantWithdrawnStatusTextDisplays()
                    .assertUserNameDisplaysInAppliedList(this.user3.fullName)
                    .assertOpeningsAvailableCount("2")
                .endAssertion()
                .clickViewMessageDropDownButton()
                .check(ManageProjectAssertions)
                    .assertWithdrawCommentTextIsDisplayed(this.withdrawTextMsg)
                .endAssertion()
                .clickParticipantProgressTab()
                .check(ManageProjectAssertions)
                    .assertParticipantCompletedCount("0")
                    .assertParticipantProjectStatusTextDisplays("Withdrawn")
                .endAssertion()
                .clickOnAActionManageProjects("Close")
                .check(ProjectDetailsAssertions)
                    .closeProjectModalDisplays()
                .endAssertion()
                .clickCloseButtonCloseProjectModal()
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToProjectsTab()
                .clickClosedTab()
                .refreshCurrentPage(ProjectsMePage)
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
