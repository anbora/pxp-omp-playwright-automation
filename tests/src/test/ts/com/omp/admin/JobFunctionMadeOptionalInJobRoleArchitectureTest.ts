// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobFamiliesHRData();
        __page1 = __page1.clickAddJobFamilyButton();
        __page1 = __page1.typeEnterJobTitle(this.familyName);
        __page1 = __page1.typeFamilyDescription(this.familyDescription);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFamily(this.familyName);
        expect(__page1.familyName.first()).toContainText(this.familyName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family name found on the list.");
    }

    public createJobFamilyFileUploadWithoutJobFunction(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.hrData);
        __page2 = __page2.openMenuForJobFamiliesHRData();
        __page2 = __page2.clickUploadCsvButton();
        __page2 = __page2.uploadCsvFile(this.csvFile);
        __page2 = __page2.clickSubmitCsvButton();
        __page2 = __page2.clickUploadHistoryButton();
        expect(__page2.uploadHistoryResults.first()).toContainText("FAMILY_SAMPLE.csv", { timeout: 30000 });
        __page2.logger.info("Successfully verified data. Upload history contains family name.");
        __page2 = __page2.clickCloseUploadHistory();
        __page2 = __page2.clickSearchJobFamily(this.familyNameCsv);
        expect(__page2.familyName.first()).toContainText(this.familyNameCsv, { timeout: 30000 });
        __page2.logger.info("Successfully verified data. Job family name found on the list.");
    }
}
