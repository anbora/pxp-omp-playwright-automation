import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
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
import { CreateProjectWithAllAvailableFieldsScenario } from "scenarios/project/CreateProjectWithAllAvailableFieldsScenario";

//@Group(GroupNameEnum.OMP_REGRESSION) will be repurposed for a different test in the coming days
//@FunctionalArea(FunctionalAreaEnum.PROJECT)
export class CreateProjectWithAllAvailableFieldsTest extends BaseRestTest {

    private projectTitle: string = "AllFieldsTest" + UUID.randomUUID();
    private projectDesc: string = "AllFields Test Desc";
    private skillLevelNumeric: string = "0.25";
    private skillLevel: string = "Beginner";
    private skillName1: string = "learning styles";
    private actionName: string = "View details";
    private locationTextToEnter: string = "Mumbai";
    private locationName: string = "Mumbai, Maharashtra, India";
    private locationNameInDetailsView: string = "Mumbai, India";
    private timeZoneTextToEnter: string = "Pacific Time (US & Canada)";
    private timeZoneToSelect: string = "Pacific Time (US & Canada) (America/Los_Angeles)";
    private timeCommitment: string = "5 hours per week";
    private roleNameToTypeAndAssert: string = "Java developer";
    private roleNameToSelect: string = "Unusual job family -  Java developer";
    private languageToSearchAndSelect: string = "English";
    private openingsCount: string = "1 opening";
    private startDateEndDateText: string = "Flexible";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithAllAvailableFieldsAndValidateDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithAllAvailableFieldsScenario(this.projectTitle, this.projectDesc, this.timeZoneTextToEnter, this.timeZoneToSelect, this.timeCommitment, this.languageToSearchAndSelect, this.skillName1, this.roleNameToTypeAndAssert, this.roleNameToSelect, this.skillLevelNumeric))
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .goDirectlyTo(ProjectsMePage)
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitle)
                    .assertThatProjectDetailsPageFieldsLoadsSkills(this.skillLevel, this.skillName1)
                    .assertThatRelatedJobRolesLoads(this.roleNameToTypeAndAssert)
                    .assertThatDetailsPanelTextLoads(this.openingsCount, this.startDateEndDateText, this.timeCommitment, "Remote Possible", this.timeZoneTextToEnter)
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
                    .assertProjectIsDisplayed(this.projectTitle);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
