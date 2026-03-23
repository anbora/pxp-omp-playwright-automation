import { OpportunityMarketplaceProjectAssertions } from "assertions/admin/OpportunityMarketplaceProjectAssertions";
import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ManageProjectAssertions } from "assertions/careergrowth/project/ManageProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { HomePageAssertions } from "assertions/other/HomePageAssertions";
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

    public createDraftProjectEditAndPublishWithLimitedOpening(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user1.name))
                .goDirectlyTo(LandingPage)
                .clickCreateButton()
                .clickCreateProjectButton()
                .fillInProjectDescription(this.projectDesc)
                .selectAProjectThumbnail()
                .clickPublishButton()
                .check(CreateProjectAssertions)
                    .assertThatRequiredFieldPromptIsDisplayed("Please enter a title")
                .endAssertion()
                .fillInProjectTitle(this.projectTitle)
                .clickDraftButton()
                .goToMePageProfile()
                .goToProjectsTab()
                .clickDraftTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                    .assertProjectDefaultActionIsDisplayedInOwnedByMeCard(this.projectTitle, this.projectAction)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction, CreateProjectPage)
                .enableApplicationRequired()
                .clickPublishButton()
                .clickMayBeLaterButton()
                .clickDraftTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsNotDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
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

    public applyForAProjectWithLimitedOpeningsWithUser2(): void {
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

    public approveAndRejectUserForAProjectWithLimitedOpenings(): void {
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
                //.clickViewMessageDropDownButton()
                //.check(ManageProjectAssertions)
                  //  .assertWithdrawCommentTextIsDisplayed(applyTextMessage)
                //.endAssertion()
                .copyCurrentURL(this.urlContainer)
                .clickApplicantAcceptButtonForSpecificUser(this.user2.fullName)
                .check(ManageProjectAssertions)
                    .assertApplicantAcceptedTextDisplays()
                    .assertUserNameDisplaysInAppliedList(this.user3.fullName)
                .endAssertion()
                .clickApplicantRejectButtonForSpecificUser(this.user3.fullName)
                .check(ManageProjectAssertions)
                    .assertRejectApplicantConfirmationModalIsDisplayed()
                .endAssertion()
                .rejectApplicantWithMessage(this.rejectTextMessage)
                .check(ManageProjectAssertions)
                    .assertApplicantRejectToasterIsDisplayed()
                    .assertApplicantRejectedTextDisplays()
                .endAssertion()
                .clickViewMessageDropDownButton()
                .check(ManageProjectAssertions)
                    .assertWithdrawCommentTextIsDisplayed(this.rejectTextMessage)
                .endAssertion();
    }

    public user1StartsTheProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickMyProjectsTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInMyProjectsHorizontalCard(this.projectTitle)
                    .assertProjectDefaultActionIsDisplayedInProjectCard(this.projectTitle, this.defaultAction)
                .endAssertion()
                .clickDefaultActionInProjectCard(this.projectTitle, this.defaultAction)
                .check(ProjectMePageAssertions)
                    .appliedConfirmationModalDisplays()
                .endAssertion()
                .clickCloseButtonAppliedToAProjectConfModal()
                .clickMyProjectsFilterDropDown()
                .selectMyProjectsFilterValue(this.filterValue)
                .clickMyProjectFilterApplyButton()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInMyProjectsHorizontalCard(this.projectTitle)
                    .assertProjectDefaultActionIsDisplayedInProjectCard(this.projectTitle, this.defaultAction2);
    }

    public user2VerifiesRejectedStatusAndMessage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user3))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickMyProjectsTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInMyProjectsHorizontalCard(this.projectTitle)
                    .assertProjectStatusIsDisplayedInProjectCard(this.projectTitle, this.user2Status)
                .endAssertion()
                .clickMyProjectsViewMessage(this.projectTitle)
                .check(ProjectMePageAssertions)
                    .assertMyProjectsRejectMessageIsDisplayed(this.rejectTextMessage, this.user1.fullName)
                .endAssertion()
                .clickMyProjectsFilterDropDown()
                .selectMyProjectsFilterValue(this.filterValue2)
                .clickMyProjectFilterApplyButton()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInMyProjectsHorizontalCard(this.projectTitle);
    }

    public projectOwnerMarksCompleteUserAndClosesProject(): void {
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
                .clickParticipantProgressTab()
                .check(ManageProjectAssertions)
                    .assertUserNameDisplaysInAppliedList(this.user2.fullName)
                .endAssertion()
                .clickMarkAsCompleteButton()
                .check(ManageProjectAssertions)
                    .assertParticipantCompletedCount("1")
                    .assertParticipantProjectStatusTextDisplays("Completed")
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

    public validateErrorPageInManageProjectPageWhenNotOwner(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .visitAURL(this.urlContainer.getValue(), HomePage)
                .check(HomePageAssertions)
                    .assertThatErrorPageIsDisplayed();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
