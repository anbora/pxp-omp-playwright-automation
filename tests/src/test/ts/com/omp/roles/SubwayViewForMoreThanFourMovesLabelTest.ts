// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class SubwayViewForMoreThanFourMovesLabelTest extends BaseRestTest {

    private startingRole: string = "Nopolitan0";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "Subway -  Nopolitan0";
    private user: UserModel;
    private subwayText: string = "No direct path to this Job Role — build your skills and create your own journey!";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckCareerPathSectionForTextBetweenRoles(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.editProfile();
        __page1 = __page1.goToEditProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.typeSearchValue(this.endRole);
        __page1 = __page1.goToFirstRoleCard();
        expect(__page1.roleMessage).toContainText(this.subwayText);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
