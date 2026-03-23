import { EditFieldModalAssertions } from "assertions/admin/EditFieldModalAssertions";
import { HrDataConfigurationAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataConfigurationTest extends BaseRestTest {
    private expectedProficiencyLevels: Set<string> = new Set(["Novice", "Beginner", "Intermediate", "Advanced", "Expert"]);
    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleConfigurationPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .check(HrDataConfigurationAssertion)
                    .assertThatJobRoleConfigurationTitleIsDisplayed()
                    .assertThatAutomaticallyAssignDetectedSkillsToJobRolesIsDisplayed()
                    .assertThatOverRideDetectedSkillsAssociatedForJobRoleUpdateIsDisplayed()
                    .assertThatDetectedSkillLevelIsDisplayed()
                .endAssertion()
                .expandListOfProficiencyLevels()
                .check(HrDataConfigurationAssertion)
                    .assertProficiencyLevels(this.expectedProficiencyLevels)
                    .assertThatMaximumNumberOfSkillsAssignedToJobRoleIsDisplayed()
                    .assertThatAllowedRangeIsDisplayed()
                    .assertThatAutomaticallyAssignDetectedNextRolesToJobRolesIsDisplayed()
                    .assertThatOverRideRecalculatedNextRolesAssociatedForJobRolesIsDisplayed()
                    .assertThatMaximumNumberOfNextRolesAssociatedToJobRoleIsDisplayed()
                    .assertThatEnableCareerPathIsDisplayed()
                .endAssertion();
    }

    public organizationConfigurationTab(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickOrganizationConfiguration()
                .check(HrDataConfigurationAssertion)
                    .assertThatOrganizationConfigurationTabIsDisplayed()
                    .assertThatOrganizationConfigurationIsDisplayed()
                    .assertThatEnableOrganizationIsDisplayed()
                    .assertThatUsageIsDisplayed()
                    .assertThatOrganizationLevelValuesToBeDisplayedIsDisplayed()
                    .assertThatOrganizationTypeDisplayedOnTheOpportunityCardIsDisplayed()
                .endAssertion()
                .clickAndFillProjectFilterInput()
                .clickAndFillProjectFilterInput()
                .clickSaveButton()
                .check(HrDataConfigurationAssertion)
                    .assertThatErrorMessageWhileSavingIsDisplayed()
                .endAssertion();
    }

    public locationConfigurationTab(): void {
         this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .check(HrDataConfigurationAssertion)
                    .assertThatLocationsConfigurationIsDisplayed()
                .endAssertion();
    }

    public standardFieldsConfigurationTab(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .clickInLevelFieldEditIcon()
                .selectFirstRank()
                .selectSecondRank()
                .clickSaveButtonEditLevelModal()
                .clickInLevelFieldEditIcon()
                .check(EditFieldModalAssertions)
                    .assertThatRankOneValueIsTheSame()
                    .assertThatRankTwoValueIsTheSame()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
