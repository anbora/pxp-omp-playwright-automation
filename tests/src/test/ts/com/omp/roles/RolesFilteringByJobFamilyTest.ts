// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class RolesFilteringByJobFamilyTest extends BaseRestTest {

    private user: UserModel;
    private jobFamilyName: string = "QA family";
    private jobRoleName: string = UUID.randomUUID().toString();
    private jobFamily: string = "Job Family";
    private familyId: string = "3771782040293632469";
    private roleId: string;
    private twelve: number = 12;
    private one: number = 1;

    public initialize(): void {
      this.user = this.createUser();
      this.roleId = this.createRole(this.jobRoleName, this.jobRoleName, this.jobRoleName, this.familyId);
    }

    public shouldFilterRolesByJobFamily(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.typeSearchValue(this.jobRoleName);
        expect(__page1.allCards()).toHaveCount(this.one, { timeout: 30000 });
        __page1 = __page1.clearSearchKeywordCriteria();
        __page1 = __page1.refreshPage();
        expect(__page1.allCards()).toHaveCount(this.twelve, { timeout: 30000 });
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.searchForFilterWithCheckbox(this.jobFamily, this.jobFamilyName, 1000);
        __page1 = __page1.applyFiltersAndBackToRoleList();
        expect(__page1.removeFilterButton(this.jobFamilyName)).toBeVisible({ timeout: 30000 });
        expect(__page1.allCards()).toHaveCount(this.twelve, { timeout: 30000 });
    }

    public cleanUp(): void {
        this.deleteRole(this.jobRoleName, this.roleId);
        this.deleteUser(this.user);
    }
}
