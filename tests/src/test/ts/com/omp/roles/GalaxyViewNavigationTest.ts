// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class GalaxyViewNavigationTest extends BaseRestTest {

    private zero: string = "0";
    private first: string = "1";
    private second: string = "2";
    private third: string = "3";
    private fourth: string = "4";
    private r0: string = "152";
    private r1: string = "262";
    private r2: string = "372";
    private r3: string = "482";
    private r4: string = "592";
    private r0ZoomedOut: string = "136";
    private r1ZoomedOut: string = "234";
    private r2ZoomedOut: string = "332";
    private r3ZoomedOut: string = "430";
    private r4ZoomedOut: string = "528";
    private r0ZoomedIn: string = "168";
    private r1ZoomedIn: string = "290";
    private r2ZoomedIn: string = "412";
    private r3ZoomedIn: string = "534";
    private r4ZoomedIn: string = "656";
    private xDimension0: string = "355.5";
    private yDimension0: string = "577";
    private xDimensionZoomedIn1: string = "339.5";
    private xDimensionZoomedOut1: string = "371.5";
    private startingRole: string = "Current role for Smoke Test";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "First Job Family -  Current role for Smoke Test";
    private startingPoint: string = "0 0 1200 1200";
    private leftPoint: string = "-16 0 1200 1200";
    private rightPoint: string = "16 0 1200 1200";
    private upPoint: string = "0 -16 1200 1200";
    private downPoint: string = "0 16 1200 1200";
    private leftUpPoint: string = "-16 -16 1200 1200";
    private leftDownPoint: string = "-16 16 1200 1200";
    private rightUpPoint: string = "16 -16 1200 1200";
    private rightDownPoint: string = "16 16 1200 1200";
    private left3Down2Point: string = "-48 32 1200 1200";
    public selectStartingJobRole: string = "Football player trainee";
    public nextRoleFirstValue: string = "Football player junior";
    public nextRoleSecondValue: string = "Football player star";
    public roleLevelValue: string = "LevelAssociate";
    public roleAreaValue: string = "Unusual job family";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckGalaxyViewRedirection(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToCareerPathPageViaTab();
        __page1 = __page1.waitForRolePillOnGalaxyView(this.endRole);
        __page1 = __page1.clickRolePill(this.endRole);
        __page1 = __page1.clickRoleCard(this.endRole);
        expect(__page1.roleNameLabel).toContainText(this.endRole, { timeout: 30000 });
        __page1 = __page1.clickBackButtonAndReturnToGalaxyView();
        expect(__page1.galaxyView).toBeVisible({ timeout: 30000 });
        __page1 = __page1.exploreJobRoles();
        expect(__page1.allJobRolesHeader).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToCareerPathPageViaTab();
        __page1 = __page1.waitForRolePillOnGalaxyView(this.endRole);
        __page1 = __page1.selectStartingJobRole(this.selectStartingJobRole);
        __page1 = __page1.waitForRolePillOnGalaxyView(this.selectStartingJobRole);
        __page1 = __page1.clickRolePill(this.nextRoleFirstValue);
        expect(__page1.rolePill(this.nextRoleFirstValue)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.collapseButtonClick();
        __page1 = __page1.clickRolePill(this.nextRoleSecondValue);
        expect(__page1.rolePill(this.nextRoleSecondValue)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleLevel.first()).toContainText(this.roleLevelValue, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Role level is displayed.");
        expect(__page1.roleArea(this.roleAreaValue)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleSkills).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Role skills are displayed.");
        __page1 = __page1.clickRoleCard(this.nextRoleSecondValue);
        __page1 = __page1.clickOnMarkRoleAsAspirationalButton();
        __page1 = __page1.optionallyAddSkillsCloseModal();
        __page1 = __page1.clickBackButtonAndReturnToGalaxyView();
        expect(__page1.roleIsMarkedAspirational(this.nextRoleSecondValue)).toBeVisible({ timeout: 30000 });
        expect(__page1.rolePill(this.nextRoleFirstValue)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.currentRoleDropdown();
        __page1 = __page1.waitForRolePillOnGalaxyView(this.endRole);
        expect(__page1.rolePill(this.endRole)).toBeVisible({ timeout: 30000 });
    }

    public shouldCheckGalaxyViewNavigation(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToCareerPathPageViaTab();
        __page2 = __page2.clickRolePill(this.endRole);
        expect(__page2.showPanelButton).toBeHidden();
        __page2 = __page2.collapseJobRoleCardDetails();
        expect(__page2.galaxyViewDetailPanel).toHaveClass("galaxy-view-detail__panel --collapsed");
        expect(__page2.showPanelButton).toBeVisible({ timeout: 30000 });
        __page2 = __page2.expandJobRolesPanel();
        expect(__page2.roleCard(this.endRole)).toBeVisible({ timeout: 30000 });
        expect(__page2.showPanelButton).toBeHidden();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.startingPoint);
        expect(__page2.galaxyRing(this.zero)).toHaveAttribute("r", this.r0);
        expect(__page2.galaxyRing(this.first)).toHaveAttribute("r", this.r1);
        expect(__page2.galaxyRing(this.second)).toHaveAttribute("r", this.r2);
        expect(__page2.galaxyRing(this.third)).toHaveAttribute("r", this.r3);
        expect(__page2.galaxyRing(this.fourth)).toHaveAttribute("r", this.r4);
        expect(__page2.rolePillLocation(this.endRole)).toHaveAttribute("x", this.xDimension0);
        expect(__page2.rolePillLocation(this.endRole)).toHaveAttribute("y", this.yDimension0);
        __page2 = __page2.moveLeft();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.leftPoint);
        __page2 = __page2.moveUp();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.leftUpPoint);
        __page2 = __page2.moveRight();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.upPoint);
        __page2 = __page2.moveRight();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.rightUpPoint);
        __page2 = __page2.moveDown();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.rightPoint);
        __page2 = __page2.moveDown();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.rightDownPoint);
        __page2 = __page2.moveLeft();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.downPoint);
        __page2 = __page2.moveLeft();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.leftDownPoint);
        __page2 = __page2.moveLeft();
        __page2 = __page2.moveLeft();
        __page2 = __page2.moveDown();
        expect(__page2.galaxyViewBox).toHaveAttribute("viewBox", this.left3Down2Point);
        __page2 = __page2.zoomOut();
        expect(__page2.rolePillLocation(this.endRole)).toHaveAttribute("x", this.xDimensionZoomedOut1);
        expect(__page2.rolePillLocation(this.endRole)).toHaveAttribute("y", this.yDimension0);
        expect(__page2.galaxyRing(this.zero)).toHaveAttribute("r", this.r0ZoomedOut);
        expect(__page2.galaxyRing(this.first)).toHaveAttribute("r", this.r1ZoomedOut);
        expect(__page2.galaxyRing(this.second)).toHaveAttribute("r", this.r2ZoomedOut);
        expect(__page2.galaxyRing(this.third)).toHaveAttribute("r", this.r3ZoomedOut);
        expect(__page2.galaxyRing(this.fourth)).toHaveAttribute("r", this.r4ZoomedOut);
        __page2 = __page2.zoomIn();
        __page2 = __page2.zoomIn();
        expect(__page2.rolePillLocation(this.endRole)).toHaveAttribute("x", this.xDimensionZoomedIn1);
        expect(__page2.rolePillLocation(this.endRole)).toHaveAttribute("y", this.yDimension0);
        expect(__page2.galaxyRing(this.zero)).toHaveAttribute("r", this.r0ZoomedIn);
        expect(__page2.galaxyRing(this.first)).toHaveAttribute("r", this.r1ZoomedIn);
        expect(__page2.galaxyRing(this.second)).toHaveAttribute("r", this.r2ZoomedIn);
        expect(__page2.galaxyRing(this.third)).toHaveAttribute("r", this.r3ZoomedIn);
        expect(__page2.galaxyRing(this.fourth)).toHaveAttribute("r", this.r4ZoomedIn);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
