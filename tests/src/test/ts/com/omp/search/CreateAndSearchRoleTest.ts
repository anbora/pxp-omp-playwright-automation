// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class CreateAndSearchRoleTest extends BaseRestTest {

    private one: number = 1;
    private roleName: string = UUID.randomUUID().toString();
    private hrData: string = "HR Data";
    private jobRoles: string = "Job Roles";
    private qaFamily: string = "QA family";
    private qaFunctionFamily: string = "QA family";
    private internship: string = "Internship";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createRoleManuallyViaAdminPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHRData(this.jobRoles);
        __page1 = __page1.addJobRole();
        __page1 = __page1.typeRoleName(this.roleName);
        __page1 = __page1.selectFunctionAndFamily(this.qaFamily, this.qaFunctionFamily);
        __page1 = __page1.clickJobLevelDropdown();
        __page1 = __page1.clickSaveButton();
        expect(__page1.jobRoleTitleInTable.first()).toContainText(this.roleName, { timeout: 30000 });
    }

    public shouldSearchForRoleInOpportunityMarketplace(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.typeSearchValue(this.roleName);
        expect(__page2.allCards()).toHaveCount(this.one, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
