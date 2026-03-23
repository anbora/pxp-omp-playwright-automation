import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { ShareProjectAssertions } from "assertions/careergrowth/share/ShareProjectAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { CreateProjectWithLocationAndShareScenario } from "scenarios/project/CreateProjectWithLocationAndShareScenario";

export class CreateProjectWithLocationScenarioAndShareTest extends BaseRestTest {

    private projectTitle: string = "LocationTest" + UUID.randomUUID();
    private projectDesc: string = "Location Test Desc";
    private locationTextToEnter: string = "Santa Monica HQ";
    private locationName: string = "Santa Monica HQ";
    private messageToShare: string = "Share Message" + UUID.randomUUID();
    private actionName: string = "View details";
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(true);
    }

    public createAProjectWithOneLocationAndVerifyDetails(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithLocationAndShareScenario(this.projectTitle, this.projectDesc, this.locationTextToEnter, this.locationName))
                .check(ShareProjectAssertions)
                    .assertShareProjectHeaderDisplays()
                .endAssertion()
                .selectUserToShare(this.user2.fullName)
                .enterShareMessage(this.messageToShare)
                .clickShare()
                .check(ShareProjectAssertions)
                    .assertShareSuccessToasterDisplays()
                .endAssertion()
                .goDirectlyTo(ProjectsMePage)
                .searchForProject(this.projectTitle)
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertProjectLocationDisplays(this.locationName);
    }

    public verifySharedWithMeShowsSharedProjectWithLocation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickSharedWithMeTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInSharedWithMe(this.projectTitle)
                    .assertSharedByUserIsExpected(this.projectTitle, this.user.fullName)
                .endAssertion()
                .clickSharedProjectViewMessage(this.projectTitle)
                .check(ProjectMePageAssertions)
                    .assertShareMessageIsDisplayed(this.messageToShare);
    }

    public closeProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction("Close", ProjectDetailsPage)
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
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
