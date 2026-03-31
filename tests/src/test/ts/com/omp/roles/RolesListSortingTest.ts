// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class RolesListSortingTest extends BaseRestTest {

    private user: UserModel;
    private roleContainer: ResultContainer = new ResultContainer();

    public dataProviderForRoleSorting(): any[][] {
        return [
                        ["Excellent to Low Match", "Low to Excellent Match"],
                        ["Newest First", "Oldest First"],
                        ["Alphabetical: A-Z", "Alphabetical: Z-A"]
                ];
    }

    public initialize(): void {

    this.user = this.createUser();

    }

    public prepareUserForTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .waitForGoodOrExcellentMatch();
    }

    public shouldCheckRoleSorting(startSorting: string, endSorting: string): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.sortListBy(startSorting);
        __page1 = __page1.getFirstCardOnAllList(this.roleContainer);
        __page1.pause(1000);
        expect(__page1.firstCardName().first()).toContainText(this.roleContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.sortListBy(endSorting);
        __page1.pause(1000);
        expect(__page1.firstCardName().first()).not.toContainText(this.roleContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.sortListBy(startSorting);
        __page1.pause(1000);
        expect(__page1.firstCardName().first()).toContainText(this.roleContainer.getValue(), { timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
