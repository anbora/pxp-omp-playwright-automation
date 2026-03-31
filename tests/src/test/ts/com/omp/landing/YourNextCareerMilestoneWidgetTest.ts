// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class YourNextCareerMilestoneWidgetTest extends BaseRestTest {

    private aspirationalRoleContainer: ResultContainer = new ResultContainer();
    private noPath: string = "No path selection";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public yourNextCareerMilestoneWidgetEmptyTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        expect(__page1.yourNextCareerMilestoneWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.yourNextCareerMilestoneWidgetEmptyLabel).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaTab();
        __page1 = __page1.getCardNameInAllBox(this.aspirationalRoleContainer);
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.markRoleAspirational_alternate();
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.yourNextCareerMilestoneWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.aspirationalRoleWithTitle(this.aspirationalRoleContainer.getValue())).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickAspirationalRoleCard(this.aspirationalRoleContainer.getValue());
        expect(__page1.roleNameLabel).toContainText(this.aspirationalRoleContainer.getValue(), { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
