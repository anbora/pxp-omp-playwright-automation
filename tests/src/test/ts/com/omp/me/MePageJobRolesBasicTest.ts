// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class MePageJobRolesBasicTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public MeJobRolesBasicTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.clickRolesTab();
        __page1 = __page1.clickExploreRoles();
        __page1 = __page1.dismissFirstCard();
        __page1 = __page1.markFirstSuggestedRoleAsAspirational();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.clickRolesTab();
        __page1.firstRoleOnTheList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.firstRoleOnTheList.isVisible());
        __page1 = __page1.clickMoreActionsButton();
        __page1 = __page1.performActionForRole("Remove as aspirational Job Role");
        expect(__page1.searchResults.first()).toContainText("You haven`t marked any Job Roles as aspirational yet. Start by exploring Job Roles!", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role not found on the list.");
        __page1 = __page1.selectLeftMenuTab("Dismissed");
        __page1.firstRoleOnTheList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.firstRoleOnTheList.isVisible());
        __page1 = __page1.clickUnDismissFirstRole();
        expect(__page1.searchResults.first()).toContainText("You haven`t marked any Job Roles as dismissed yet.", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role not found on the list.");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
