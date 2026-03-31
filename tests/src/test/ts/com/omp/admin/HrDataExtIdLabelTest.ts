// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataExtIdLabelTest extends BaseRestTest {

    private hrdata: string = "HR Data";
    private user: UserModel;
    private jobRoleName: string = UUID.randomUUID().toString();
    private roleDescription: string = UUID.randomUUID().toString();
    private roleSummary: string = UUID.randomUUID().toString();
    private additionalDescription: string = UUID.randomUUID().toString();
    private functionAndFamilyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private functionName: string = "QA Job Function For Roles (DO NOT TOUCH)";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkJobRoleExternalIdInfoLabel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrdata);
        __page1 = __page1.openMenuForJobRolesHRData();
        __page1 = __page1.clickAddJobRoleButton();
        __page1 = __page1.typeRoleName(this.jobRoleName);
        __page1 = __page1.typeRoleDescription(this.roleDescription);
        __page1 = __page1.typeRoleSummary(this.roleSummary);
        __page1 = __page1.typeAdiitionalDescription(this.additionalDescription);
        __page1 = __page1.clickLocationDropdown();
        __page1 = __page1.selectFunctionAndFamily(this.functionName, this.functionAndFamilyName);
        __page1 = __page1.clickJobLevelDropdown();
        expect(__page1.externalIdText).toContainText("System will auto generate and assign an id if left blank", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Warning message is showing");
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.jobRoleName);
        __page1 = __page1.clickEditJobRoleButton();

    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
