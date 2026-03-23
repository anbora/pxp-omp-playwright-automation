import { ManageProjectAssertions } from "assertions/careergrowth/project/ManageProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickCreateProjectButton()
                .run(new CreateProjectWithUploadThumbnailScenario(this.projectTitle, this.projectDesc))
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction2, ProjectsMePage)
                .check(ProjectMePageAssertions)
                    .assertSuccessToastIsDisplayed()
                .endAssertion()
                .clickBookmarkedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInMyProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickDefaultActionInProjectCard(this.projectTitle, this.defaultAction)
                .check(ProjectMePageAssertions)
                    .assertProjectIsNotDisplayedInMyProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickPublishedTab()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction, ProjectsMePage)
                .copyCurrentURL(this.urlContainer);
    }

    public applyForAProjectUnlimitedOpenings(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertFilterPageLoads()
                .endAssertion()
                .clickFilterCancelButton()
                .visitAURL(this.urlContainer.getValue(), ProjectDetailsPage)
                .clickGetStartedForAProject()
                .check(ProjectDetailsAssertions)
                    .appliedConfirmationModalDisplays()
                .endAssertion()
                .clickCloseButtonAppliedToAProjectConfModal()
                .check(ProjectDetailsAssertions)
                    .assertProjectStatusTextDisplays(this.projectStatusText);
    }

    public markCompleteUserAndCloseTheCreatedProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage)
                .clickMarkAsCompleteButton()
                .check(ManageProjectAssertions)
                    .assertParticipantCompletedCount("1")
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
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle);
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
