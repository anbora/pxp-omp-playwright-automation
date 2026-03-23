import { OpportunityMarketplaceProjectAssertions } from "assertions/admin/OpportunityMarketplaceProjectAssertions";
import { CreateProjectAssertions, ManageProjectAssertions, ProjectDetailsAssertions, ProjectDiscoveryAssertions, ProjectMePageAssertions } from "assertions/careergrowth/project";
import { MePageAssertions } from "assertions/me/MePageAssertions";
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

export class CreateProjectLimitedAndValidateConfigModalTest extends BaseRestTest {

    private projectTitle: string = "Config" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private projectAction: string = "View Project details";
    private projectAction2: string = "View details";
    private projectAction3: string = "Manage Project";
    private openingsCount: string = "0/1";
    private projectStatusText: string = "Applied";
    private projectAction1: string = "Close";
    private applyTextMessage: string = "ApplyMessage" + UUID.randomUUID();
    private urlContainer: ResultContainer = new ResultContainer();
    private user1: UserModel;
    private user2: UserModel;
    private user3: UserModel;

    public initialize(): void {
      this.user2 = this.createUser(true);
        this.wait(10000);
      this.user3 = this.createUser(true);
    }

    public setProjectApplicationModalSettingsToOn(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToAdminPanel()
                .selectMainTab("Talent Marketplace")
                .openMenuForProjectOpportunityMarketplace()
                .check(OpportunityMarketplaceProjectAssertions)
                    .assertThatRequireApplicantMessageLabelIsVisible()
                    .assertThatShowManagerPermissionLabelIsVisible()
                .endAssertion()
                .toggleRequireApplicantMessageToOn()
                .toggleShowManagerPermissionToOn()
                .clickSaveButtonConfigTab();
    }

    public createProjectAndPublishWithLimitedOpening(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .goDirectlyTo(LandingPage)
                .clickCreateButton()
                .clickCreateProjectButton()
                .fillInProjectTitle(this.projectTitle)
                .fillInProjectDescription(this.projectDesc)
                .selectAProjectThumbnail()
                .enableApplicationRequired()
                .clickPublishButton()
                .clickMayBeLaterButton()
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
                    //.assertSubmitButtonIsNotEnabled()
                    .assertManagerConsentCheckBoxIsDisplayed()
                .endAssertion()
                .clickSubmitButtonWithMsgAndConsentYesToProject(this.applyTextMessage)
                .check(ProjectDetailsAssertions)
                    .appliedToALimitedOpeningProjectModalDisplays()
                .endAssertion()
                .clickCloseButtonApplyToALimitedOpeningProjectConfModal()
                .check(ProjectDetailsAssertions)
                    .assertProjectStatusTextDisplays(this.projectStatusText);
    }

    public checkUserIsDisplayedInManageProjectAndCloseProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goToMePageProfile()
                .goToProjectsTab()
                .clickPublishedTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion()
                .clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle)
                .clickOwnedByMeProjectHorizontalCardDropDownAction(this.projectAction3, ManageProjectPage)
                .check(ManageProjectAssertions)
                    .assertUserNameDisplaysInAppliedList(this.user3.fullName)
                .endAssertion()
                .clickOnAActionManageProjects(this.projectAction)
                .clickOnAProjectAction(this.projectAction1, ProjectDetailsPage)
                .check(ProjectDetailsAssertions)
                    .closeProjectModalDisplays()
                .endAssertion()
                .clickCloseButtonCloseProjectModal()
                .goToMePageProfile()
                .goToProjectsTab()
                .clickClosedTab()
                .waitForProjectCardToBeVisible()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayed(this.projectTitle)
                .endAssertion();
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

    public afterClass(): void {
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
