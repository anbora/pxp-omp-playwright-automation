// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

//@Group(GroupNameEnum.OMP_REGRESSION) will be fixed soon as part of july release feature
//@FunctionalArea(FunctionalAreaEnum.LANDING)
export class WelcomeWidgetTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public welcomeWidget(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.welcomeStringAndSubTextInWelcomeWidget).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
