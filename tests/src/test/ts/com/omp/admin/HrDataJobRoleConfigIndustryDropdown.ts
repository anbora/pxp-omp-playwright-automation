// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataJobRoleConfigIndustryDropdown extends BaseRestTest {

    private hrdata: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkIndustryDropdownConfig(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrdata);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.clickIndustryDropdown();
        let expectedFirstThreeItems: Array<string> = Arrays.asList("Agriculture", "Construction", "Culture and Leisure");
        for (const expectedText of expectedFirstThreeItems) {
                    expect(__page1.industryDropdownSelect(expectedText)).toBeVisible();
                }
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
