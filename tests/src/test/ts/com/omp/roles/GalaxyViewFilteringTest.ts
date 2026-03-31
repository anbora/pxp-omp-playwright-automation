// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { GalaxyViewFiltersModalPage } from "pages/careergrowth/roles/GalaxyViewFiltersModalPage";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class GalaxyViewFilteringTest extends BaseRestTest {

    private sevenInt: number = 7;
    private elevenInt: number = 11;
    private twentyTwoInt: number = 22;
    private thirtyOneInt: number = 31;
    private zero: string = "0";
    private one: string = "1";
    private four: string = "4";
    private five: string = "5";
    private six: string = "6";
    private seven: string = "7";
    private eight: string = "8";
    private nine: string = "9";
    private eleven: string = "11";
    private fifteen: string = "15";
    private startingRole: string = "Starting Actor";
    private startingRoleFullName: string = "House of Cards -  Starting Actor";
    private qaFamily: string = "QA family";
    private alert: string = "You reached the maximum number of choices (4)";
    private strangerThings: string = "Stranger Things";
    private houseMD: string = "House M.D.";
    private friends: string = "Friends";
    private rachelGreen: string = "Rachel Green";
    private monicaGeller: string = "Monica Geller";
    private phoebeBuffay: string = "Phoebe Buffay";
    private joeyTribbiani: string = "Joey Tribbiani";
    private chandlerBing: string = "Chandler Bing";
    private rossGeller: string = "Ross Geller";
    private gunther: string = "Gunther";
    private houseOfCards: string = "House of Cards";
    private breakingBad: string = "Breaking Bad";
    private sopranos: string = "The Sopranos";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckGalaxyViewForFewJobFamiliesWithoutFiltering(): void {
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
        __page1 = __page1.goToCareerPathPageViaTab();
        __page1 = __page1.waitForRolePillOnGalaxyView(this.phoebeBuffay);
        expect(__page1.jobFamilySectionLineTitle(this.sopranos)).toBeVisible({ timeout: 30000 });
        expect(__page1.jobFamilySectionLineTitle(this.houseOfCards)).toBeVisible({ timeout: 30000 });
        expect(__page1.jobFamilySectionLineTitle(this.breakingBad)).toBeVisible({ timeout: 30000 });
        expect(__page1.jobFamilySectionLineTitle(this.friends)).toBeVisible({ timeout: 30000 });
        expect(__page1.rolePills).toHaveCount(this.thirtyOneInt);
    }

    public shouldCheckExceedingTheLimitOfJobFamilies(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToCareerPathPageViaTab();
        __page2 = __page2.waitForRolePillOnGalaxyView(this.phoebeBuffay);
        __page2 = __page2.openFiltersModal(AllFiltersModalPage);
        expect(__page2.jobFamilyCheckbox(this.qaFamily)).toBeDisabled();
        expect(__page2.jobFamilyText(this.qaFamily)).toContainText(this.one, { timeout: 30000 });
        expect(__page2.selectedFamiliesLabel(this.zero)).toContainText(this.zero);
        __page2 = __page2.selectCustomOption();
        __page2 = __page2.selectJobFamilyCheckbox(this.sopranos);
        expect(__page2.selectedFamiliesLabel(this.one)).toContainText(this.one);
        __page2 = __page2.selectJobFamilyCheckbox(this.houseOfCards);
        __page2 = __page2.selectJobFamilyCheckbox(this.houseMD);
        __page2 = __page2.selectJobFamilyCheckbox(this.friends);
        expect(__page2.selectedFamiliesLabel(this.four)).toContainText(this.four);
        __page2 = __page2.selectJobFamilyCheckbox(this.breakingBad);
        expect(__page2.selectedFamiliesLabel(this.five)).toContainText(this.five);
        expect(__page2.alert).toContainText(this.alert, { timeout: 30000 });
        expect(__page2.applyButton).toBeDisabled();
        __page2 = __page2.selectJobFamilyCheckbox(this.breakingBad);
        expect(__page2.alert).toBeHidden();
        expect(__page2.applyButton).toBeEnabled();
    }

    public shouldCheckGalaxyViewFiltering(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToCareerPathPageViaTab();
        __page3 = __page3.waitForRolePillOnGalaxyView(this.phoebeBuffay);
        __page3 = __page3.openFiltersModal(GalaxyViewFiltersModalPage);
        __page3 = __page3.selectCustomOption();
        expect(__page3.jobFamilyText(this.houseOfCards)).toContainText(this.six, { timeout: 30000 });
        expect(__page3.jobFamilyText(this.friends)).toContainText(this.seven, { timeout: 30000 });
        expect(__page3.jobFamilyText(this.breakingBad)).toContainText(this.eight, { timeout: 30000 });
        expect(__page3.jobFamilyText(this.houseMD)).toContainText(this.nine, { timeout: 30000 });
        expect(__page3.jobFamilyText(this.strangerThings)).toContainText(this.eleven, { timeout: 30000 });
        expect(__page3.jobFamilyText(this.sopranos)).toContainText(this.fifteen, { timeout: 30000 });
        __page3 = __page3.selectJobFamilyCheckbox(this.friends);
        __page3 = __page3.applyFilters();
        expect(__page3.rolePills).toHaveCount(this.sevenInt);
        expect(__page3.rolePill(this.rachelGreen)).toBeVisible({ timeout: 30000 });
        expect(__page3.rolePill(this.monicaGeller)).toBeVisible({ timeout: 30000 });
        expect(__page3.rolePill(this.phoebeBuffay)).toBeVisible({ timeout: 30000 });
        expect(__page3.rolePill(this.joeyTribbiani)).toBeVisible({ timeout: 30000 });
        expect(__page3.rolePill(this.chandlerBing)).toBeVisible({ timeout: 30000 });
        expect(__page3.rolePill(this.rossGeller)).toBeVisible({ timeout: 30000 });
        expect(__page3.rolePill(this.gunther)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.removeFilter(this.friends);
        expect(__page3.rolePills).toHaveCount(this.thirtyOneInt);
        __page3 = __page3.openFiltersModal(GalaxyViewFiltersModalPage);
        __page3 = __page3.selectCustomOption();
        __page3 = __page3.selectJobFamilyCheckbox(this.sopranos);
        __page3 = __page3.selectJobFamilyCheckbox(this.strangerThings);
        __page3 = __page3.applyFilters();
        expect(__page3.rolePills).toHaveCount(this.twentyTwoInt);
        __page3 = __page3.removeFilter(this.sopranos);
        expect(__page3.rolePills).toHaveCount(this.elevenInt);
        __page3 = __page3.openFiltersModal(GalaxyViewFiltersModalPage);
        __page3 = __page3.selectJobFamilyCheckbox(this.houseMD);
        __page3 = __page3.applyFilters();
        __page3 = __page3.removeAllFilter();
        __page3 = __page3.waitForRolePillOnGalaxyView(this.joeyTribbiani);
        expect(__page3.rolePills).toHaveCount(this.thirtyOneInt);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
