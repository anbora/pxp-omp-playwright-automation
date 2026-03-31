// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class GalaxyViewForCareerPathSmokeTest extends BaseRestTest {

    private one: number = 1;
    private startingRole: string = "Current role for Smoke Test";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "First Job Family -  Current role for Smoke Test";
    private exploreTip: string = "Can't find the right Job Role in the chart?";
    private firstJobFamily: string = "First Job Family";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckSimpleGalaxyView(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToCareerPathPageViaTab();
        __page1 = __page1.waitForRolePillOnGalaxyView(this.endRole);
        expect(__page1.jobFamilySectionLine).toContainText(this.firstJobFamily, { timeout: 30000 });
        expect(__page1.currentRoleName(this.startingRole)).toBeVisible({ timeout: 30000 });
        expect(__page1.rolePill(this.endRole)).toBeVisible({ timeout: 30000 });
        expect(__page1.showPanelButton).toBeHidden();
        expect(__page1.exploreJobRoleTip).toContainText(this.exploreTip, { timeout: 30000 });
        __page1 = __page1.clickRolePill(this.endRole);
        expect(__page1.jobRoleNameOnRoleDetailsCard).toContainText(this.endRole, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
