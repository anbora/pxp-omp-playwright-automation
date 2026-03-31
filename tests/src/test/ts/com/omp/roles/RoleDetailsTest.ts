// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class RoleDetailsTest extends BaseRestTest {

    private ROLE_NAME: string = UUID.randomUUID().toString();
    private CYPRESS_ROLE_NAME: string = "CypressRoleName_" + this.ROLE_NAME;
    private internship: string = "Internship";
    private roleId: string;
    private user: UserModel;

    public initialize(): void {
      this.roleId = this.createRole(this.CYPRESS_ROLE_NAME, this.ROLE_NAME, this.ROLE_NAME);
      this.user = this.createUser();
    }

    public shouldCheckRoleTitleDescriptionAndLevel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(RoleDetailsPage, this.roleId);
        __page1 = __page1.waitForRoleDetailsToBeVisible(this.CYPRESS_ROLE_NAME);
        expect(__page1.roleNameLabel).toContainText(this.CYPRESS_ROLE_NAME, { timeout: 30000 });
        expect(__page1.h3InDescription).toContainText(this.ROLE_NAME, { timeout: 30000 });
        expect(__page1.divInDescription).toContainText(this.ROLE_NAME, { timeout: 30000 });
        expect(__page1.aInDescription).toContainText(this.ROLE_NAME, { timeout: 30000 });
        expect(__page1.strongInDescription).toContainText(this.ROLE_NAME, { timeout: 30000 });
        expect(__page1.levelLabel.first()).toContainText(this.internship, { timeout: 30000 });
    }

    public afterTests(): void {
        this.deleteRole(this.ROLE_NAME, this.roleId);
        this.deleteUser(this.user);
    }
}
