// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobRolesHRData();
        __page1 = __page1.clickUploadCsvButton();
        __page1 = __page1.uploadCsvFile(this.csvFile);
        __page1 = __page1.clickSubmitCsvButton();
        __page1 = __page1.clickSearchJobRole(this.roleName);
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown(this.translationLanguage);
        expect(__page1.this.translationSummary).toContainText(this.translationSummary, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role name found on the list.");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
