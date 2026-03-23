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
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { CreateProjectWithSuggestedSkillsScenario } from "scenarios/project/CreateProjectWithSuggestedSkillsScenario";

export class CreateProjectWithSuggestedSkillsTest extends BaseRestTest {

    private projectTitle: string = "Automation";
    private projectDesc: string = "Automation Test Desc";
    private skillLevel1: string = "Beginner";
    private suggestedSkillID: string = "5943564426482605570";
    private skillName: string = "automation";
    private actionName: string = "View details";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithRecommendedSkills(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .clickCreateButton()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithSuggestedSkillsScenario(this.projectTitle, this.projectDesc, this.suggestedSkillID))
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .goDirectlyTo(ProjectsMePage)
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitle)
                    .assertThatProjectDetailsPageFieldsLoadsSkills(this.skillLevel1, this.skillName)
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
