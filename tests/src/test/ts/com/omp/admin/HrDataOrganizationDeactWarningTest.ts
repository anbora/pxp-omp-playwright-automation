// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataOrganizationDeactWarningTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkDeactivationWarningViaAdminPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForOrganizationHRData();
        __page1 = __page1.clickEditOrganizationButton();
        __page1 = __page1.clickInactiveButton();
        expect(__page1.deactivationWarning.first()).toContainText("Setting Organization to Inactive will affect reporting and associations with Opportunities. Continue making this inactive?", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Deactivation warning is displayed");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
