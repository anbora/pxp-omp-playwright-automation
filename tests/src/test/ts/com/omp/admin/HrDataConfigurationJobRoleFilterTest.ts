// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationJobRoleFilterTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private jobRoleFilter: string = "2";
    private jobRoleFilterIncorrect: string = "a";
    private organizationUnitType: string = "Legal Unit";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleConfigurationPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.clickOrganizationConfiguration();
        expect(__page1.organizationConfigurationTitle).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Organization configuration title is visible");
        expect(__page1.organizationConfiguration).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Organization configuration is visible");
        expect(__page1.jobRoleFilter).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Job role filter label is visible");
        expect(__page1.inputTypeNumber).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Input type number is visible");
        __page1 = __page1.selectOrganizationUnitType(this.organizationUnitType);
        __page1 = __page1.clickEnterJobRoleFilterLevelIncorrect(this.jobRoleFilterIncorrect);
        expect(__page1.inputTypeNumber).toHaveValue(/\D+/);
        __page1.logger.info("Incorrect job filter value is displayed");
        __page1 = __page1.clickEnterJobRoleFilterLevel(this.jobRoleFilter);
        __page1 = __page1.clickSaveButton();
        expect(__page1.jobRoleFilterCorrect).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Correct job filter is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
