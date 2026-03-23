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
import { CreateProjectWithSkillsScenario } from "scenarios/project/CreateProjectWithSkillsScenario";

export class CreateProjectWithSkillsTest extends BaseRestTest {

    private projectTitle: string = "SkillsTest" + UUID.randomUUID();
    private projectDesc: string = "SkillsTest Test Desc";
    private skillLevel1: string = "Beginner";
    private skillLevel1Numeric: string = "0.25";
    private skillName2: string = "clearing";
    private skillLevel2: string = "Intermediate";
    private skillLevel2Numeric: string = "0.5";
    private skillLevel3: string = "Advanced";
    private skillLevel3Numeric: string = "0.75";
    private skillName1: string = "learning styles";
    private skillName3: string = "management";
    private actionName: string = "View details";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithSkillsAtEachLevelAndValidateDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToHomePage()
                .clickCreateButton()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithSkillsScenario(this.projectTitle, this.projectDesc, this.skillName1, this.skillName2, this.skillName3, this.skillLevel1Numeric, this.skillLevel2Numeric, this.skillLevel3Numeric))
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .goDirectlyTo(ProjectsMePage)
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitle)
                    .assertThatProjectDetailsPageFieldsLoadsSkills(this.skillLevel1, this.skillName1)
                    .assertThatProjectDetailsPageFieldsLoadsSkills(this.skillLevel2, this.skillName2)
                    .assertThatProjectDetailsPageFieldsLoadsSkills(this.skillLevel3, this.skillName3)
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
