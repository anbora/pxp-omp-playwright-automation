import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
                .fillInProjectTitle(this.projectTitle)
                .fillInProjectDescription(this.projectDesc)
                .selectAProjectThumbnail()
                .clickPublishButton()
                .clickMayBeLaterButton()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickPublishedTab()
                .clickProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitle)
                .endAssertion()
                .clickOnAProjectAction(this.actionName2, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .closeProjectModalDisplays()
                .endAssertion()
                .clickCloseButtonCloseProjectModal()
                .check(ProjectDetailsAssertions)
                    .assertToasterTextDisplays(this.toasterText)
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToProjectsTab()
                .clickClosedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .goToCareerGrowthPage()
                .goToProjectsPageViaCard()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoadsWithoutSuggest()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
