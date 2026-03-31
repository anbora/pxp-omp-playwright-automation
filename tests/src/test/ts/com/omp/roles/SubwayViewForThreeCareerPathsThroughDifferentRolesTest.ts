// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class SubwayViewForThreeCareerPathsThroughDifferentRolesTest extends BaseRestTest {

    private user: UserModel;
    private pathA: string = "Path A";
    private pathB: string = "Path B";
    private pathC: string = "Path C";
    private noPath: string = "No path selection";
    private zero: string = "0";
    private one: string = "1";
    private two: string = "2";
    private three: string = "3";
    private nopolitan2FullName: string = "Subway -  Nopolitan2";
    private nopolitan2: string = "Nopolitan2";
    private nopolitan4: string = "Nopolitan4";
    private nopolitan5: string = "Nopolitan5";
    private nopolitan5b: string = "Nopolitan5b";
    private nopolitan6: string = "Nopolitan6";

    private row1_col0: string = "cp-role-pill__wrapper row_1 col_0 ";
    private row1_col1: string = "cp-role-pill__wrapper row_1 col_1 ";
    private row1_col2: string = "cp-role-pill__wrapper row_1 col_2 ";
    private row2_col0_highlighted: string = "cp-role-pill__wrapper row_2 col_0  cp-role-pill--highlighted cp-role-pill--selected";

    private moveOneLeftParameter: string = "M350,417 H115 a25,25 0 0 1 -25,-25 V251";
    private moveTwoLeftParameter: string = "M90,251 V110 a-25,-25 0 0 1 25,-25 H325 ";

    private moveOneRightParameter: string = "M350,417 H585 a-25,-25 0 0 0 25,-25 V251";
    private moveTwoRightParameter: string = "M610,251 V110 a25,25 0 0 0 -25,-25 H375 ";

    private moveOneStraightParameter: string = "M350 417 L350 251";
    private moveTwoStraightParameter: string = "M350 251 L350 85";

    private whiteColor: string = "rgb(255, 255, 255)";
    private blackColor: string = "rgb(38, 39, 59)";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckSubwayView(): void {
        //paths: A => B1 => C and A => B2 => C and A => B3 => C
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.editProfile();
        __page1 = __page1.goToEditProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.nopolitan2, this.nopolitan2FullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.typeSearchValue(this.nopolitan6);
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.refreshPageUntilSubwayViewIsDisplayed();
        __page1 = __page1.clickOnRoleName(this.nopolitan6);
        expect(__page1.userRoleName).toContainText(this.nopolitan2, { timeout: 30000 });
        __page1.logger.info("Successfully verified that user role name contains '" + this.nopolitan2 + "' text.");
        expect(__page1.gridLine).toHaveCount(Integer.parseInt(this.two));
        expect(__page1.paths).toHaveCount(Integer.parseInt(this.three));
        expect(__page1.movesForGivenPath(this.zero)).toHaveCount(Integer.parseInt(this.two));
        expect(__page1.movesForGivenPath(this.one)).toHaveCount(Integer.parseInt(this.two));
        expect(__page1.movesForGivenPath(this.two)).toHaveCount(Integer.parseInt(this.two));
        expect(__page1.goalRoleName).toContainText(this.nopolitan6, { timeout: 30000 });
        __page1.logger.info("Successfully verified that goal this.nopolitan6 name contains '" + this.nopolitan6 + "' text.");
        Assert.assertTrue(__page1.this.row1_col1(this.nopolitan4).getAttribute("class").contains(this.row1_col1));
        Assert.assertTrue(__page1.this.row1_col2(this.nopolitan5).getAttribute("class").contains(this.row1_col2));
        Assert.assertTrue(__page1.this.row1_col0(this.nopolitan5b).getAttribute("class").contains(this.row1_col0));
        Assert.assertTrue(__page1.this.row2_col0_highlighted(this.nopolitan6).getAttribute("class").contains(this.row2_col0_highlighted));
    }

    public shouldCheckPathParametersAndSelectAPath(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.typeSearchValue(this.nopolitan6);
        __page2 = __page2.goToFirstRoleCard();
        expect(__page2.moveForGivenStep(this.zero, this.two, this.zero)).toHaveAttribute("d", this.moveOneLeftParameter);
        expect(__page2.moveForGivenStep(this.zero, this.two, this.one)).toHaveAttribute("d", this.moveTwoLeftParameter);
        expect(__page2.moveForGivenStep(this.one, this.three, this.zero)).toHaveAttribute("d", this.moveOneRightParameter);
        expect(__page2.moveForGivenStep(this.one, this.three, this.one)).toHaveAttribute("d", this.moveTwoRightParameter);
        expect(__page2.moveForGivenStep(this.two, this.one, this.zero)).toHaveAttribute("d", this.moveOneStraightParameter);
        expect(__page2.moveForGivenStep(this.two, this.one, this.one)).toHaveAttribute("d", this.moveTwoStraightParameter);
        Assert.assertTrue(__page2.moveByPathAndStep(this.one, this.zero).getAttribute("class").contains("highlihgted"));
        Assert.assertTrue(__page2.moveByPathAndStep(this.one, this.one).getAttribute("class").contains("highlihgted"));
        expect(__page2.highlightedMoveForGivenPath(this.zero)).toBeHidden();
        expect(__page2.highlightedMoveForGivenPath(this.one)).toBeHidden();
        __page2 = __page2.selectPath(this.pathB);
        Assert.assertTrue(__page2.moveByPathAndStep(this.two, this.zero).getAttribute("class").contains("highlihgted"));
        Assert.assertTrue(__page2.moveByPathAndStep(this.two, this.one).getAttribute("class").contains("highlihgted"));
        expect(__page2.highlightedMoveForGivenPath(this.zero)).toBeHidden();
        expect(__page2.highlightedMoveForGivenPath(this.one)).toBeHidden();
        __page2 = __page2.selectPath(this.pathC);
        Assert.assertTrue(__page2.moveByPathAndStep(this.three, this.zero).getAttribute("class").contains("highlihgted"));
        Assert.assertTrue(__page2.moveByPathAndStep(this.three, this.one).getAttribute("class").contains("highlihgted"));
        expect(__page2.highlightedMoveForGivenPath(this.zero)).toBeHidden();
        expect(__page2.highlightedMoveForGivenPath(this.one)).toBeHidden();
        __page2 = __page2.selectPath(this.pathC);
        expect(__page2.highlightedMoveForGivenPath(this.zero)).toBeHidden();
        expect(__page2.highlightedMoveForGivenPath(this.one)).toBeHidden();
        expect(__page2.highlightedMoveForGivenPath(this.two)).toBeHidden();
    }

    public shouldMarkRoleAsAspirationalChangePathSelectNoPathRemoveRoleAsAspirational(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToRolesPageViaCard();
        __page3 = __page3.typeSearchValue(this.nopolitan6);
        __page3 = __page3.goToFirstRoleCard();
        expect(__page3.aspirationalIconForPath(this.pathA)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathB)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathC)).toBeHidden();
        expect(__page3.roleBackgroundColor(this.nopolitan6)).toHaveCSS("background-color", this.whiteColor);
        __page3 = __page3.markRoleAspirational();
        __page3 = __page3.selectPathForAspirationalSubmenu(this.pathA);
        __page3.pause(2000);
        Assert.assertTrue(__page3.aspirationalIconForPath(this.pathA).getAttribute("class").contains("icon icon-bullseye-arrow active icon-selected"));
        expect(__page3.roleBackgroundColor(this.nopolitan6)).toHaveCSS("background-color", this.blackColor);
        expect(__page3.aspirationalIconForPath(this.pathB)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathC)).toBeHidden();
        __page3 = __page3.changePath();
        __page3 = __page3.selectPathForAspirationalSubmenuForExistingAspirationalRole(this.pathB);
        __page3.pause(2000);
        Assert.assertTrue(__page3.aspirationalIconForPath(this.pathB).getAttribute("class").contains("icon icon-bullseye-arrow active icon-selected"));
        expect(__page3.roleBackgroundColor(this.nopolitan6)).toHaveCSS("background-color", this.blackColor);
        expect(__page3.aspirationalIconForPath(this.pathA)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathC)).toBeHidden();
        __page3 = __page3.changePath();
        __page3 = __page3.selectPathForAspirationalSubmenuForExistingAspirationalRole(this.noPath);
        expect(__page3.roleBackgroundColor(this.nopolitan6)).toHaveCSS("background-color", this.blackColor);
        expect(__page3.aspirationalIconForPath(this.pathA)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathB)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathC)).toBeHidden();
        __page3 = __page3.changePath();
        __page3 = __page3.selectPathForAspirationalSubmenuForExistingAspirationalRole(this.pathC);
        __page3.pause(2000);
        Assert.assertTrue(__page3.aspirationalIconForPath(this.pathC).getAttribute("class").contains("icon icon-bullseye-arrow active icon-selected"));
        expect(__page3.roleBackgroundColor(this.nopolitan6)).toHaveCSS("background-color", this.blackColor);
        expect(__page3.aspirationalIconForPath(this.pathA)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathB)).toBeHidden();
        __page3 = __page3.removeRoleAsAspirational();
        expect(__page3.roleBackgroundColor(this.nopolitan6)).toHaveCSS("background-color", this.whiteColor);
        expect(__page3.aspirationalIconForPath(this.pathA)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathB)).toBeHidden();
        expect(__page3.aspirationalIconForPath(this.pathC)).toBeHidden();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
