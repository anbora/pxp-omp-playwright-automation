// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { Assert, assertTrue } from "common/testing/runtime";
import { expect } from "common/testing/playwright";

export class GalaxyViewRolePillsAndCardsTest extends BaseRestTest {

    private one: string = "1";
    private two: string = "2";
    private three: string = "3";
    private four: string = "4";
    private startingRole: string = "Starting Actor";
    private startingRoleFullName: string = "House of Cards -  Starting Actor";
    private low: string = "Low";
    private fair: string = "Fair";
    private good: string = "Good";
    private excellent: string = "Excellent";
    private excellentMatchColor: string = "rgb(109, 196, 151)";
    private goodMatchColor: string = "rgb(145, 200, 62)";
    private fairMatchColor: string = "rgb(251, 171, 25)";
    private lowMatchColor: string = "rgb(238, 124, 43)";
    private friends: string = "Friends";
    private joeyTribbiani: string = "Joey Tribbiani";
    private rossGeller: string = "Ross Geller";
    private gunther: string = "Gunther";
    private edwardMeechum: string = "Edward Meechum";
    private sopranos: string = "The Sopranos";
    private janiceSoprano: string = "Janice Soprano";
    private adrianaLeCerva: string = "Adriana Le Cerva";
    private patyParisi: string = "Paty Parisi";
    private vitoSpatafore: string = "Vito Spatafore";
    private bobbyBaccalieri: string = "Bobby Baccalieri";
    private director: string = "Director";
    private contests: string = "contests";
    private interfaith: string = "interfaith";
    private shrub: string = "shrub";
    private lumesse: string = "lumesse";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private december: string = "Dec";
    private year_2023: string = "2023";
    private underwood: string = "Francis Underwood";
    private blessings: string = "Blessings";
    private intermediate: string = "Intermediate";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckGalaxyViewRoleDetailsOnRoleCard(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToEditProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.underwood, this.lumesse, this.lumesse, this.october, this.year_2017, this.december, this.year_2023));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.blessings, this.intermediate));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToCareerPathPageViaTab();
        __page1 = __page1.waitForRolePillOnGalaxyView(this.joeyTribbiani);
        Assert.assertTrue(__page1.rolePillName(this.janiceSoprano).first().getAttribute("class").contains("cp-role-pill--collapsed"));
        __page1 = __page1.clickRolePill(this.janiceSoprano);
        expect(__page1.roleCardLevelLabel(this.janiceSoprano)).toContainText(this.director, { timeout: 30000 });
        expect(__page1.roleCardFamilyLabel(this.janiceSoprano)).toContainText(this.sopranos, { timeout: 30000 });
        expect(__page1.roleCardSkillsLabel(this.janiceSoprano, this.contests)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleCardSkillsLabel(this.janiceSoprano, this.interfaith)).toBeVisible({ timeout: 30000 });
        expect(__page1.roleCardSkillsLabel(this.janiceSoprano, this.shrub)).toBeVisible({ timeout: 30000 });
    }

    public shouldCheckGalaxyViewRoleMatchingOnPills(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToCareerPathPageViaTab();
        __page2 = __page2.waitForMatchOnRoleCard(this.bobbyBaccalieri, this.excellent);
        expect(__page2.smileIconForRolePill(this.edwardMeechum)).toHaveCSS("fill", this.fairMatchColor);
        expect(__page2.smileIconForRolePill(this.joeyTribbiani)).toHaveCSS("fill", this.goodMatchColor);
        expect(__page2.smileIconForRolePill(this.bobbyBaccalieri)).toHaveCSS("fill", this.excellentMatchColor);
        expect(__page2.smileIconForCollapsedRolePill(this.janiceSoprano)).toHaveCSS("fill", this.lowMatchColor);
        expect(__page2.smileIconForGroupedRolesPill(this.sopranos, this.one, this.one)).toHaveCSS("fill", this.goodMatchColor);
        expect(__page2.smileIconForGroupedRolesPill(this.friends, this.one, this.one)).toHaveCSS("fill", this.excellentMatchColor);
    }

    public shouldCheckGalaxyViewRoleMatchingOnCards(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToCareerPathPageViaTab();
        __page3 = __page3.waitForRolePillOnGalaxyView(this.joeyTribbiani);
        __page3 = __page3.clickRolePill(this.janiceSoprano);
        expect(__page3.roleCardSmile(this.janiceSoprano)).toHaveCSS("fill", this.lowMatchColor);
        expect(__page3.roleCardMatchingLabel(this.janiceSoprano)).toContainText(this.low, { timeout: 30000 });
        __page3 = __page3.clickRolePill(this.edwardMeechum);
        expect(__page3.roleCardSmile(this.edwardMeechum)).toHaveCSS("fill", this.fairMatchColor);
        expect(__page3.roleCardMatchingLabel(this.edwardMeechum)).toContainText(this.fair, { timeout: 30000 });
        __page3 = __page3.clickRolePill(this.joeyTribbiani);
        expect(__page3.roleCardSmile(this.joeyTribbiani)).toHaveCSS("fill", this.goodMatchColor);
        expect(__page3.roleCardMatchingLabel(this.joeyTribbiani)).toContainText(this.good, { timeout: 30000 });
        __page3 = __page3.clickRolePill(this.bobbyBaccalieri);
        expect(__page3.roleCardSmile(this.bobbyBaccalieri)).toHaveCSS("fill", this.excellentMatchColor);
        expect(__page3.roleCardMatchingLabel(this.bobbyBaccalieri)).toContainText(this.excellent, { timeout: 30000 });
        __page3 = __page3.clickGroupedRolesPill(this.two, this.friends);
        expect(__page3.roleCardSmile(this.gunther)).toHaveCSS("fill", this.fairMatchColor);
        expect(__page3.roleCardSmile(this.rossGeller)).toHaveCSS("fill", this.excellentMatchColor);
    }

    public shouldCheckGalaxyViewRolePillsGroupingWhileZooming(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.goToCareerGrowthPage();
        __page4 = __page4.goToCareerPathPageViaTab();
        __page4 = __page4.waitForRolePillOnGalaxyView(this.joeyTribbiani);
        expect(__page4.groupedRolesNumber(this.sopranos, this.one)).toContainText(this.three, { timeout: 30000 });
        expect(__page4.rolePill(this.adrianaLeCerva)).toBeHidden();
        expect(__page4.rolePill(this.vitoSpatafore)).toBeHidden();
        expect(__page4.rolePill(this.patyParisi)).toBeHidden();
        expect(__page4.rolePill(this.bobbyBaccalieri)).toBeVisible({ timeout: 30000 });
        expect(__page4.rolePill(this.janiceSoprano)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.zoomIn();
        expect(__page4.rolePill(this.vitoSpatafore)).toBeHidden();
        expect(__page4.rolePill(this.patyParisi)).toBeHidden();
        expect(__page4.rolePill(this.bobbyBaccalieri)).toBeVisible({ timeout: 30000 });
        expect(__page4.rolePill(this.adrianaLeCerva)).toBeVisible({ timeout: 30000 });
        expect(__page4.rolePill(this.janiceSoprano)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.zoomOut();
        __page4 = __page4.zoomOut();
        __page4 = __page4.zoomOut();
        expect(__page4.groupedRolesNumber(this.sopranos, this.one)).toContainText(this.four, { timeout: 30000 });
        expect(__page4.rolePill(this.adrianaLeCerva)).toBeHidden();
        expect(__page4.rolePill(this.vitoSpatafore)).toBeHidden();
        expect(__page4.rolePill(this.patyParisi)).toBeHidden();
        expect(__page4.rolePill(this.bobbyBaccalieri)).toBeHidden();
        expect(__page4.rolePill(this.janiceSoprano)).toBeVisible({ timeout: 30000 });
    }
}
