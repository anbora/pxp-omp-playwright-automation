import { HrDataJobRolesTranslationAssertions } from "assertions/admin/hrdata/HrDataJobRolesTranslationAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobRolesUploadCsvTranslationTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private csvFile: string;
    private roleName: string = "CIO Division";
    private translationLanguage: string = "Portuguese";
    private translationSummary: string = "Finalidade do trabalho";
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.csvFile = "src/main/resources/fixtures/csv/hrdata/" + System.getProperty("config", "qaAws") + "/ROLE_SAMPLE_TRANSLATION.csv";
    }

    public uploadCsvAndCheckUploadHistoryViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobRolesHRData()
                .clickUploadCsvButton()
                .uploadCsvFile(this.csvFile)
                .clickSubmitCsvButton()
                .clickSearchJobRole(this.roleName)
                .clickTranslationButton()
                .clickTranslationDropdown(this.translationLanguage)
                .check(HrDataJobRolesTranslationAssertions)
                    .assertThatJobRoleTranslationSummaryIsDisplayed(this.translationSummary)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
