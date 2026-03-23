import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .check(LandingPageAssertions)
                    .assertThatCreateProjectButtonIsDisplayed()
                .endAssertion()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithUploadThumbnailScenario(this.projectTitle, this.projectDesc))
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName2, ProjectsMePage)
                .copyCurrentURL(this.urlContainer);
    }

    public duplicateAProjectFromProjectDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToProjectsPageViaCard()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoads()
                .endAssertion()
                .visitAURL(this.urlContainer.getValue(), ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitle)
                .endAssertion()
                .clickOnAProjectAction(this.actionName, CreateProjectPage)
                .check(CreateProjectAssertions)
                    .assertThatDuplicateProjectHeaderIsDisplayed()
                    .assertThatProjectDescIsCopiedOver(this.projectDesc)
                    .assertThatProjectTitleIsCopiedOver(this.projectTitle)
                    .assertOwnerFieldIsCopiedOver()
                    .assertThatThumbnailIsCopiedOver()
                .endAssertion()
                .clickPublishButton()
                .check(CreateProjectAssertions)
                    .assertDuplicateProjectTitleWarningIsDisplayed()
                .endAssertion()
                .duplicateTitleWarningModalclickCancelButton()
                .fillInProjectTitle(this.projectTitle2)
                .clickPublishButton()
                .clickMayBeLaterButton()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle2);
    }

    public dataProviderForClosingProjects(): any[][] {
        return [
                        [this.projectTitle],
                        [this.projectTitle2]
                ];
    }

    public closeProject(title: string): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(title)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(title)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName3, ProjectDetailsPage)
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
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(title);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
