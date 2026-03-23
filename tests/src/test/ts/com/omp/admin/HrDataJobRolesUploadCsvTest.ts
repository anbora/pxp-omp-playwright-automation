import { HrDataJobRolesUploadCsvAssertion } from "assertions/admin/hrdata/HrDataJobRolesUploadCsvAssertion";
import { HrDataJobRoleUploadHistoryAssertion } from "assertions/admin/hrdata/HrDataJobRoleUploadHistoryAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobRolesUploadCsvTest extends BaseRestTest {
    private hrData: string = "HR Data";
    private csvFile: string;
    private roleName: string = "CSV Import Role";
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.csvFile = "src/main/resources/fixtures/csv/hrdata/" + System.getProperty("config", "qaAws") + "/ROLE_SAMPLE.csv";
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
                .check(HrDataJobRolesUploadCsvAssertion)
                    .assertThatUploadedRoleDisplayedOnTheList()
                .endAssertion()
                .clickUploadHistoryButton()
                .clickCloseUploadHistory()
                .clickUploadHistoryButton()
                .check(HrDataJobRoleUploadHistoryAssertion)
                    .assertThatUploadHistoryContainsValues()
//                    .assertThatUploadHistoryIsSuccessfull()
                .endAssertion()
                .clickCloseUploadHistory();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
