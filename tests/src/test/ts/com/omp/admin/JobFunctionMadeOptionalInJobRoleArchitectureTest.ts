import { HrDataJobFamiliesAssertions } from "assertions/admin/hrdata/HrDataJobFamiliesAssertions";
import { HrDataUploadHistoryAssertion } from "assertions/admin/users/HrDataUploadHistoryAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class JobFunctionMadeOptionalInJobRoleArchitectureTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private familyName: string = UUID.randomUUID().toString();
    private familyDescription: string = UUID.randomUUID().toString();
    private familyNameCsv: string = "CSV Import Family Without Job Function";
    private user: UserModel;
    private csvFile: string;

    public initialize(): void {
      this.user = this.createUser(true);
      this.csvFile = "src/main/resources/fixtures/csv/hrdata/" + System.getProperty("config", "qaAws") + "/FAMILY_SAMPLE1.csv";
    }

    public createJobFamilyManuallyWithoutJobFunction(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobFamiliesHRData()
                .clickAddJobFamilyButton()
                .typeEnterJobTitle(this.familyName)
                .typeFamilyDescription(this.familyDescription)
                .clickSaveButton()
                .clickSearchJobFamily(this.familyName)
                .check(HrDataJobFamiliesAssertions)
                    .assertThatJobFamilyIsDisplayedOnTheList(this.familyName)
                .endAssertion();
    }

    public createJobFamilyFileUploadWithoutJobFunction(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForJobFamiliesHRData()
                .clickUploadCsvButton()
                .uploadCsvFile(this.csvFile)
                .clickSubmitCsvButton()
                .clickUploadHistoryButton()
                .check(HrDataUploadHistoryAssertion)
                    .assertThatUploadHistoryContainsValues()
                .endAssertion()
                .clickCloseUploadHistory()
                .clickSearchJobFamily(this.familyNameCsv)
                .check(HrDataJobFamiliesAssertions)
                    .assertThatJobFamilyIsDisplayedOnTheList(this.familyNameCsv)
                .endAssertion();
    }
}
