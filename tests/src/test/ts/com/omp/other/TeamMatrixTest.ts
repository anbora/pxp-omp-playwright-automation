// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class TeamMatrixTest extends BaseTest {

    public TeamMatrixLoadsForManager(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToHomePage();
        __page1 = __page1.goToManagerDashboardPage();
        expect(__page1.teamMatrixHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.filtersIcon).toBeVisible({ timeout: 30000 });
        expect(__page1.legendIcon).toBeVisible({ timeout: 30000 });
        expect(__page1.rateSkillsButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickRateSkills();
        expect(__page1.rateSkillsModalHeader).toBeVisible({ timeout: 30000 });
    }
}
