import { HrDataEditJobFamiliesAssertion } from "assertions/admin/hrdata/HrDataEditJobFamiliesAssertion";
import { HrDataJobFamiliesAssertions } from "assertions/admin/hrdata/HrDataJobFamiliesAssertions";
import { HRDataJobFamiliesTranslationAssertion } from "assertions/admin/hrdata/HRDataJobFamiliesTranslationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobFamiliesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private familyName: string = UUID.randomUUID().toString();
    private familyNameAfterEdit: string = UUID.randomUUID().toString();
    private familyNameTranslation: string = UUID.randomUUID().toString();
    private familyDescription: string = UUID.randomUUID().toString();
    private familyDescriptionTranslation: string = UUID.randomUUID().toString();
    private functionName: string = "QA Job Function (DO NOT TOUCH)";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobFamilyAndTranslationViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobFamiliesHRData()
                .clickAddJobFamilyButton()
                .typeEnterJobTitle(this.familyName)
                .typeFamilyDescription(this.familyDescription)
                .selectFunction(this.functionName)
                .clickSaveButton()
                .clickSearchJobFamily(this.familyName)
                .check(HrDataJobFamiliesAssertions)
                    .assertThatJobFamilyIsDisplayedOnTheList(this.familyName)
                .endAssertion()
                .clickEditJobFamilyButton()
                .typeEnterJobTitle(this.familyNameAfterEdit)
                .clickSaveButton()
                .clickSearchJobFamily(this.familyNameAfterEdit)
                .check(HrDataEditJobFamiliesAssertion)
                    .assertThatJobFamilyIsDisplayedOnTheList(this.familyNameAfterEdit)
                .endAssertion()
                .clickTranslationButton()
                .clickTranslationDropdown()
                .typeEnterFamilyName(this.familyNameTranslation)
                .typeEnterFamilyDescription(this.familyDescriptionTranslation)
                .clickSaveButton()
                .clickSearchJobFamily(this.familyNameAfterEdit)
                .clickTranslationButton()
                .clickTranslationDropdown()
                .check(HRDataJobFamiliesTranslationAssertion)
                    .assertThatJobFamilyTranslationIsDisplayed(this.familyNameTranslation)
                    .assertThatJobFamilyTranslationDescriptionIsDisplayed(this.familyDescriptionTranslation)
                .endAssertion()
                .clickSaveButton()
                .clickSearchJobFamily(this.familyNameAfterEdit)
                .clickEditJobFamilyButton()
                .clickDeleteJobFamilyButton()
                .clickAreYouSureDeleteJobFamilyButton()
                .clickSearchJobFamily(this.familyNameAfterEdit)
                .check(HrDataJobFamiliesAssertions)
                    .assertThatDeletedJobFamilyIsNotDisplayedOnTheList()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
