import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class HrDataConfigurationLocationAssociationAndVisibilityForProjectsTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;
    //private String projectTitle = "LocationTest" + UUID.randomUUID();
    private projectDesc: string = "Location Test Desc";
    private locationTextToEnter: string = "Santa Monica HQ";
    private locationName: string = "Santa Monica HQ";
    private projectTitle: string = "LocationProject_DND";

    public initialize(): void {

    this.user = this.createUser(true);

    }
// this is commented if we create new project it is taking more than 10 min to come in search results
// so until finding solution for this commenting project creation part
//    @Test(priority = 1)
//    public void createProjectWithLocationField() {
//        this.getOmpLoginPage()
//                .run(new LoginWithOnboardingScenario(user))
//                .clickCreateButton()
//                .clickCreateProjectButton()
//                .check(CreateProjectAssertions)
//                .assertThatProjectPageLoadsAllRequiredFields()
//                .endAssertion()
//                .selectAProjectThumbnail()
//                .fillInProjectTitle(projectTitle)
//                .fillInProjectDescription(projectDesc)
//                .selectProjectLocation(locationTextToEnter, locationName)
//                .clickPublishButton();
//    }

    public locationVisibilityForProjectsTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToProjectsPageViaTab()
                .searchForAProject(this.projectTitle)
//              .refreshUntilProjectReturnsInResults(projectTitle)
                .check(ProjectDiscoveryAssertions)
                    .assertThatLocationIsVisibleOnProjectCard()
                .endAssertion()
                .clickProjectCardCardDetails(this.projectTitle)
                .check(ProjectDetailsAssertions)
                    .assertThatLocationIsVisibleOnProjectDetails()
                .endAssertion()
                .clickBackButton()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertThatLocationIsVisibleOnProjectFilter()
                .endAssertion()
                .clickFilterCancelButton();
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("Project")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibleForProjectsTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToProjectsPageViaCard()
                .searchForAProject(this.projectTitle)
                .check(ProjectDiscoveryAssertions)
                    .assertThatLocationIsNotVisibleOnProjectCard()
                .endAssertion()
                .clickProjectCardCardDetails(this.projectTitle)
                .check(ProjectDetailsAssertions)
                    .assertThatLocationIsNotVisibleOnProjectDetails()
                .endAssertion()
                .clickBackButton()
                .clickInFiltersButton()
                .check(ProjectDiscoveryAssertions)
                    .assertThatLocationIsNotVisibleOnProjectFilter()
                .endAssertion()
                .clickFilterCancelButton();
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("Project")
                .addLocationVisibility("Project details")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Project filter")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Project card")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
