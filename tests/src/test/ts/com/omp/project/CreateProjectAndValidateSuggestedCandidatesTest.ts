import { CreateProjectAssertions } from "assertions/careergrowth/project/CreateProjectAssertions";
import { ManageProjectAssertions } from "assertions/careergrowth/project/ManageProjectAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { CreateProjectWithSkillsAnd1RoleScenario } from "scenarios/project/CreateProjectWithSkillsAnd1RoleScenario";

export class CreateProjectAndValidateSuggestedCandidatesTest extends BaseRestTest {

    private projectTitle: string = "Quality" + " "+ UUID.randomUUID();
    private projectDesc: string = "Suggested Candidates Test Desc";
    private skillName1: string = "learning styles";
    private skillLevel1: string = "0.25";
    private skillName2: string = "java";
    private skillLevel2: string = "0.5";
    private skillName3: string = "JavaScript";
    private skillLevel3: string = "0.75";
    private actionName: string = "Manage Project";
    private roleNameToTypeAndAssert: string = "software engineer in tests";
    private roleNameToSelect: string = "Software Quality Assurance -  Software Engineer in Tests";
    private candidateTitle: string = "SDET";
    private shareMessage: string = "suggested candidate share msg";
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
        this.wait(10000);
      this.user2 = this.createUser(true);
    }

    prepareUserForRecommendation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goToEditProfileFromUserDropDown(this.user2.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput("Software Engineer in Tests", "Software Quality Assurance -  Software Engineer in Tests")
                .clickSelectButton()
                .fillInJobTitle(this.candidateTitle)
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(this.skillName1, "Advanced"))
                .run(new AddSkillToCareerProfileScenario(this.skillName2, "Advanced"))
                .run(new AddSkillToCareerProfileScenario(this.skillName3, "Advanced"))
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public createProjectAndValidateSuggestedCandidatesTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickCreateProjectButton()
                .check(CreateProjectAssertions)
                    .assertThatProjectPageLoadsAllRequiredFields()
                .endAssertion()
                .run(new CreateProjectWithSkillsAnd1RoleScenario(this.projectTitle, this.projectDesc, this.skillName1, this.skillLevel1, this.skillName2, this.skillLevel2, this.skillName3, this.skillLevel3, this.roleNameToTypeAndAssert, this.roleNameToSelect))
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .goDirectlyTo(ProjectsMePage)
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ManageProjectPage)
                .clickSuggestedCandidatesTab()
                .refreshUntilSuggestedCandidateAppears(this.user2.fullName)
                .check(ManageProjectAssertions)
                    .assertUserNameAndTitleIsDisplayedInSuggestedCandidatesList(this.user2.fullName, this.candidateTitle)
                .endAssertion()
                .clickSuggestedCandidatesShareIcon(this.user2.fullName)
                .check(ManageProjectAssertions)
                    .assertShareModalDisplaysSelectedUser(this.user2.fullName)
                .endAssertion()
                .submitShareWithMessage(this.shareMessage)
                .check(ManageProjectAssertions)
                    .assertShareProjectSuccessToasterIsDisplayed();
    }

    public verifySharedWithMeShowsSharedProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickSharedWithMeTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInSharedWithMe(this.projectTitle)
                    .assertSharedByUserIsExpected(this.projectTitle, this.user.fullName)
                .endAssertion()
                .clickSharedProjectViewMessage(this.projectTitle)
                .check(ProjectMePageAssertions)
                    .assertShareMessageIsDisplayed(this.shareMessage);
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
