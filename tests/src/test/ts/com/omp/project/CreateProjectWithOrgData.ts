import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { CreateProjectWithDepartmentOrgFieldScenario } from "scenarios/project/CreateProjectWithDepartmentOrgFieldScenario";

export class CreateProjectWithOrgData extends BaseRestTest {

    private projectTitle: string = "OrgUnitTest" + UUID.randomUUID();
    private projectTitleSearchResult: string = "AutomationTest Project";
    private projectDesc: string = "OrgUnit Test Desc";
    private orgUnitTypeName: string = "Department";
    private orgUnitValue: string = "Automation Dept";
    private actionName: string = "View details";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithOrgData(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithDepartmentOrgFieldScenario(this.projectTitle, this.projectDesc, this.orgUnitValue))
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .goDirectlyTo(ProjectsMePage)
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitle)
                    .assertOrgUnitTypeAndValueIsDisplayed(this.orgUnitTypeName, this.orgUnitValue)
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoads()
                .endAssertion()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertFilterPageLoads()
                    .assertOrgHeaderAndDepartmentFilterIsDisplayed()
                .endAssertion()
                .searchAndSelectOrgDepartmentFilterValue(this.orgUnitValue)
                .refreshUntilProjectReturnsInSearchResults(this.projectTitleSearchResult)
                .check(ProjectDiscoveryAssertions)
                    .assertProjectIsDisplayedInSearchResults(this.projectTitleSearchResult)
                    .assertProjectOrgNameIsDisplayedInProjectCard(this.projectTitleSearchResult, this.orgUnitValue)
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage)
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
                    .assertProjectIsDisplayed(this.projectTitle);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
