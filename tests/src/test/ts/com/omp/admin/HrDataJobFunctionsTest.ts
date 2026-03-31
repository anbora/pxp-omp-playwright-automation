// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobFunctionsHRData();
        __page1 = __page1.clickAddJobFunctionButton();
        __page1 = __page1.typeFunctionName(this.functionName);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFunction(this.functionName);
        expect(__page1.jobFunctionTitleInTable.first()).toContainText(this.functionName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job function name found on the list.");
        __page1 = __page1.clickEditJobFunctionButton();
        __page1 = __page1.typeEnterJobFunction(this.functionNameAfterEdit);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFunction(this.functionNameAfterEdit);
        expect(__page1.jobFunctionTitleInTable.first()).toContainText(this.functionNameAfterEdit, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job function name found on the list.");
        __page1 = __page1.clickJobFunctionTranslationButton();
        __page1 = __page1.clickTranslationDropdown();
        __page1 = __page1.typeEnterFunctionName(this.functionNameTranslation);
        __page1 = __page1.clickJobFunctionSaveButton();
        __page1 = __page1.clickSearchJobFunction(this.functionNameAfterEdit);
        __page1 = __page1.clickJobFunctionTranslationButton();
        __page1 = __page1.clickTranslationDropdown();
        expect(__page1.functionName.first()).toHaveValue(this.functionNameTranslation);
        __page1.logger.info("Successfully verified data. Job function translation name contains text.");
        __page1 = __page1.clickJobFunctionSaveButton();
        __page1 = __page1.clickSearchJobFunction(this.functionNameAfterEdit);
        __page1 = __page1.clickEditJobFunctionButton();
        __page1 = __page1.clickDeleteJobFunctionButton();
        __page1 = __page1.clickAreYouSureDeleteJobFunctionButton();
        __page1 = __page1.clickSearchJobFunction(this.functionNameAfterEdit);
        expect(__page1.searchResults.first()).toContainText("There are no records available yet", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job function name not found on the list.");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
