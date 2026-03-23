import { HrDataJobRolesAssertion } from "assertions/admin/hrdata/HrDataJobRolesAssertion";
import { AllFiltersModalAssertions } from "assertions/careergrowth/jobs/AllFiltersModalAssertions";
import { RoleCardAssertions } from "assertions/careergrowth/roles/RoleCardAssertions";
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class HrDataConfigurationLocationAssociationAndVisibilityForJobRolesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;
    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private familyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private jobRoleName: string = UUID.randomUUID().toString();
    private partialName: string = "QA";
    private levelName: string = "Associate";
    private locationName: string = "TestingQA";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createJobRoleWithLocationField(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobRolesHRData()
                .clickAddJobRoleButton()
                .typeRoleName(this.jobRoleName)
                .selectJobFamily(this.partialName, this.familyName)
                .selectJobLevel(this.levelName)
                .selectJobLocation(this.partialName, this.locationName)
                .clickSaveButton()
                .clickSearchJobRole(this.jobRoleName)
                .check(HrDataJobRolesAssertion)
                    .assertThatJobRoleIsDisplayedOnTheList(this.jobRoleName)
                .endAssertion();
    }

    public locationVisibilityForJobRolesTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToRolesPageViaTab()
                .typeSearchValue(this.jobRoleName)
                .check(RoleCardAssertions)
                    .assertThatLocationIsVisibleOnJobRoleCard()
                .endAssertion()
                .clickJobRoleCardDetails(this.jobRoleName)
                .check(RoleDetailsAssertions)
                    .assertThatLocationIsVisibleOnJobCardDetails()
                .endAssertion()
                .clickBackButton()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatLocationIsVisibleOnJobCardFilter()
                .endAssertion()
                .closeFiltersModal();
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("Job Role")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibleForJobVacancyTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.jobRoleName)
                .check(RoleCardAssertions)
                    .assertThatLocationIsNotVisibleOnJobRoleCard()
                .endAssertion()
                .clickJobRoleCardDetails(this.jobRoleName)
                .check(RoleDetailsAssertions)
                    .assertThatLocationIsNotVisibleOnJobCardDetails()
                .endAssertion()
                .clickBackButton()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatLocationIsNotVisibleOnJobCardFilter()
                .endAssertion()
                .closeFiltersModal();
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("Job Role")
                .addLocationVisibility("Job Role details")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Job Role filter")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Job Role card")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
