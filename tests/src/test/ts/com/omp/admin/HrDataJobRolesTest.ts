import { HrDataEditJobRoleAssertion } from "assertions/admin/hrdata/HrDataEditJobRoleAssertion";
import { HrDataJobRolesAssertion } from "assertions/admin/hrdata/HrDataJobRolesAssertion";
import { HrDataNextJobRoleGenerationStatusAssertion } from "assertions/admin/hrdata/HrDataNextJobRoleGenerationStatusAssertion";
import { HrDataJobRoleTranslationAssertion } from "assertions/admin/users/HrDataJobRoleTranslationAssertion";
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobRolesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private jobRoleName: string = UUID.randomUUID().toString();
    private roleDescription: string = UUID.randomUUID().toString();
    private roleSummary: string = UUID.randomUUID().toString();
    private additionalDescription: string = UUID.randomUUID().toString();
    private functionAndFamilyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private functionName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private roleNameAfterEdit: string = UUID.randomUUID().toString();
    private roleNameTranslation: string = UUID.randomUUID().toString();
    private roleDescriptionTranslation: string = UUID.randomUUID().toString();
    private translationLanguage: string = "Italian";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobRoleAndTranslationViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobRolesHRData()
                .clickAddJobRoleButton()
                .typeRoleName(this.jobRoleName)
                .typeRoleDescription(this.roleDescription)
                .typeRoleSummary(this.roleSummary)
                .typeAdiitionalDescription(this.additionalDescription)
                .clickLocationDropdown()
                .selectFunctionAndFamily(this.functionName, this.functionAndFamilyName)
                .clickJobLevelDropdown()
                .clickSaveButton()
                .clickSearchJobRole(this.jobRoleName)
                .check(HrDataJobRolesAssertion)
                    .assertThatJobRoleIsDisplayedOnTheList(this.jobRoleName)
                .endAssertion()
                .clickEditJobRoleButton()
                .check(HrDataEditJobRoleAssertion)
                    .assertThatAdditionalDescriptionIsDisplayed(this.additionalDescription)
                    .assertThatDescriptionIsDisplayed(this.roleDescription)
                    .assertThatRoleSummaryIsDisplayed(this.roleSummary)
                    .assertThatLocationsAreDisplayed()
                .endAssertion()
                .typeEnterRoleName(this.roleNameAfterEdit)
                .addAdditionalLocation()
                .clickSaveButton()
                .clickSearchJobRole(this.roleNameAfterEdit)
                .check(HrDataJobRolesAssertion)
                    .assertThatJobRoleIsDisplayedOnTheList(this.roleNameAfterEdit)
                .endAssertion()
                .clickEditJobRoleButton()
                .check(HrDataEditJobRoleAssertion)
                    .assertThatLocationsAreDisplayed()
                    .assertThatAdditionalLocationsAreDisplayed()
                .endAssertion()
                .clickSaveButton()
                .clickSearchJobRole(this.roleNameAfterEdit)
                .clickTranslationButton()
                .clickTranslationDropdown(this.translationLanguage)
                .typeEnterRoleName(this.roleNameTranslation)
                .typeEnterRoleDescription(this.roleDescriptionTranslation)
                .clickSaveButton()
                .clickSearchJobRole(this.roleNameAfterEdit)
                .clickTranslationButton()
                .clickTranslationDropdown(this.translationLanguage)
                .check(HrDataJobRoleTranslationAssertion)
                    .assertThatJobRoleTranslationIsDisplayed(this.roleNameTranslation)
                    .assertThatJobRoleTranslationDescriptionIsDisplayed(this.roleDescriptionTranslation)
                .endAssertion()
                .clickSaveButton()
                .clickThreeDotsButton()
                .clickNextRoleGenerationalStatusButton()
                .clickSearchJobRole(this.roleNameAfterEdit)
                .check(HrDataNextJobRoleGenerationStatusAssertion)
                    .assertThatNextJobRolesGenerationalStatusContainsValues()
                .endAssertion()
                .clickCloseButton();
    }

    public checkJobRoleFilledFieldsInCareerGrowth(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.roleNameAfterEdit)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatDescriptionIsDisplayed(this.roleDescription)
                    .assertThatRoleSummaryIsDisplayed(this.roleSummary)
                    .assertThatAdditionalDescriptionIsDisplayed(this.additionalDescription)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
