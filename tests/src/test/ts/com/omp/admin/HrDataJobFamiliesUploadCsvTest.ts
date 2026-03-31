// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobFamiliesHRData();
        __page1 = __page1.clickUploadCsvButton();
        __page1 = __page1.uploadCsvFile(this.csvFile);
        __page1 = __page1.clickSubmitCsvButton();
        __page1 = __page1.clickSearchJobFamily(this.familyName);
        __page1 = __page1.clickEditJobFamilyButton();
        __page1 = __page1.clickDeleteJobFamilyButton();
        __page1 = __page1.clickAreYouSureDeleteJobFamilyButton();
        __page1 = __page1.clickSearchJobFamily(this.familyName);
        expect(__page1.searchResults.first()).toContainText("There are no records available yet", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family name not found on the list.");
        __page1 = __page1.clickUploadHistoryButton();
        __page1 = __page1.clickCloseUploadHistory();
        __page1 = __page1.clickUploadHistoryButton();
        expect(__page1.uploadHistoryResults.first()).toContainText("FAMILY_SAMPLE.csv", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Upload history contains family name.");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
