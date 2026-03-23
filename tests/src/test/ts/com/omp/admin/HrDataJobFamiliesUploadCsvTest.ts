import { HrDataUploadCsvAssertion } from "assertions/admin/users/HrDataUploadCsvAssertion";
import { HrDataUploadHistoryAssertion } from "assertions/admin/users/HrDataUploadHistoryAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobFamiliesUploadCsvTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private csvFile: string;
    private familyName: string = "CSV Import Family Unique";
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.csvFile = "src/main/resources/fixtures/csv/hrdata/" + System.getProperty("config", "qaAws") + "/FAMILY_SAMPLE.csv";
    }

    public uploadCsvAndCheckUploadHistoryViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobFamiliesHRData()
                .clickUploadCsvButton()
                .uploadCsvFile(this.csvFile)
                .clickSubmitCsvButton()
                .clickSearchJobFamily(this.familyName)
                .clickEditJobFamilyButton()
                .clickDeleteJobFamilyButton()
                .clickAreYouSureDeleteJobFamilyButton()
                .clickSearchJobFamily(this.familyName)
                .check(HrDataUploadCsvAssertion)
                    .assertThatDeletedFamilyIsNotDisplayedOnTheList()
                .endAssertion()
                .clickUploadHistoryButton()
                .clickCloseUploadHistory()
                .clickUploadHistoryButton()
                .check(HrDataUploadHistoryAssertion)
                    .assertThatUploadHistoryContainsValues()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
