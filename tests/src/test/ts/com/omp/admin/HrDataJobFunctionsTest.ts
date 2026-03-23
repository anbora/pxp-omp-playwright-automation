import { HrDataEditJobFunctionAssertion } from "assertions/admin/hrdata/HrDataEditJobFunctionAssertion";
import { HrDataJobFunctionsAssertions } from "assertions/admin/hrdata/HrDataJobFunctionsAssertions";
import { HRDataJobFunctionTranslationAssertion } from "assertions/admin/hrdata/HRDataJobFunctionTranslationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobFunctionsTest extends BaseRestTest {

    private functionName: string = UUID.randomUUID().toString();
    private hrData: string = "HR Data";
    private functionNameAfterEdit: string = UUID.randomUUID().toString();
    private functionNameTranslation: string = UUID.randomUUID().toString();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobFunctionAndTranslationViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobFunctionsHRData()
                .clickAddJobFunctionButton()
                .typeFunctionName(this.functionName)
                .clickSaveButton()
                .clickSearchJobFunction(this.functionName)
                .check(HrDataJobFunctionsAssertions)
                    .assertThatJobFunctionIsDisplayedOnTheList(this.functionName)
                .endAssertion()
                .clickEditJobFunctionButton()
                .typeEnterJobFunction(this.functionNameAfterEdit)
                .clickSaveButton()
                .clickSearchJobFunction(this.functionNameAfterEdit)
                .check(HrDataEditJobFunctionAssertion)
                    .assertThatJobFunctionIsDisplayedOnTheListAfterEdit(this.functionNameAfterEdit)
                .endAssertion()
                .clickJobFunctionTranslationButton()
                .clickTranslationDropdown()
                .typeEnterFunctionName(this.functionNameTranslation)
                .clickJobFunctionSaveButton()
                .clickSearchJobFunction(this.functionNameAfterEdit)
                .clickJobFunctionTranslationButton()
                .clickTranslationDropdown()
                .check(HRDataJobFunctionTranslationAssertion)
                    .assertThatJobFunctionTranslationIsDisplayed(this.functionNameTranslation)
                .endAssertion()
                .clickJobFunctionSaveButton()
                .clickSearchJobFunction(this.functionNameAfterEdit)
                .clickEditJobFunctionButton()
                .clickDeleteJobFunctionButton()
                .clickAreYouSureDeleteJobFunctionButton()
                .clickSearchJobFunction(this.functionNameAfterEdit)
                .check(HrDataJobFunctionsAssertions)
                    .assertThatDeletedJobFunctionIsNotDisplayedOnTheList()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
