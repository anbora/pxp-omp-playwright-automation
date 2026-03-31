// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class UpdateCareerProfileLinkVisibilityTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public verifyCareerProfileLinkIsVisible(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        expect(__page1.updateCareerProfileLink()).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that Update Career Profile Link is visible.");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
