// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class MentorshipFiltersModalTest extends BaseRestTest {

    private user: UserModel;
    private jobRoles: string = "Job Roles";
    private skills: string = "Skills";
    private timeZones: string = "Time Zones";
    private languages: string = "Languages";
    private geographicalLocation: string = "Geographical Location";
    private unitOfBusiness: string = "Unit of Business";
    private department: string = "Department";
    private legalUnit: string = "Legal Unit";
    private searchAllJobRoles: string = "Search all Job Roles";
    private searchAllSkills: string = "Search all this.skills";
    private jobRoleValue: string = "Unusual job family -  Java developer";
    private jobRoleNoFamily: string = "Java developer";
    private skillValue: string = "java 8";
    private timeZonesValue: string = "[UTC −10:00] Pacific/Honolulu";
    private languageValue: string = "Ukrainian";
    private geographicalLocationValue: string = "India";
    private departmentValue: string = "Automation Dept";
    private unitOfBusinessValue: string = "Automation";
    private legalUnitValue: string = "Yuliia";
    private timeZonesSectionNumber: string = "3";
    private languagesSectionNumber: string = "4";
    private locationSectionNumber: string = "5";
    private departmentSectionNumber: string = "6";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public CheckAllFiltersInFiltersModal(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        __page1 = __page1.clickInFiltersButton();
        expect(__page1.this.jobRoles(this.jobRoles)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.skills(this.skills)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.timeZones(this.timeZones)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.languages(this.languages)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.geographicalLocation(this.geographicalLocation)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.unitOfBusiness(this.unitOfBusiness)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.department(this.department)).toBeVisible({ timeout: 30000 });
        expect(__page1.this.legalUnit(this.legalUnit)).toBeVisible({ timeout: 30000 });
        expect(__page1.searchFields(this.searchAllJobRoles)).toBeVisible({ timeout: 30000 });
        expect(__page1.searchFields(this.searchAllSkills)).toBeVisible({ timeout: 30000 });
        expect(__page1.locationsAndDepartmentFilterInput(this.locationSectionNumber)).toBeVisible({ timeout: 30000 });
        expect(__page1.locationsAndDepartmentFilterInput(this.departmentSectionNumber)).toBeVisible({ timeout: 30000 });
        expect(__page1.timeZonesAndLanguagesFilterInput(this.timeZonesSectionNumber)).toBeVisible({ timeout: 30000 });
        expect(__page1.timeZonesAndLanguagesFilterInput(this.languagesSectionNumber)).toBeVisible({ timeout: 30000 });
        expect(__page1.showMore(showMoreTimeZones)).toBeVisible({ timeout: 30000 });
        expect(__page1.showMore(showMoreLanguages)).toBeVisible({ timeout: 30000 });
        expect(__page1.showMore(showMoreLocations)).toBeVisible({ timeout: 30000 });
        expect(__page1.showMore(showMoreDepartments)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickAndFillFilter(this.searchAllJobRoles, this.jobRoleValue, this.jobRoleValue);
        __page1 = __page1.clickAndFillFilter(this.searchAllSkills, this.skillValue, this.skillValue);
        __page1 = __page1.clickAndFillLanguageAndTimezonesFilter(this.languagesSectionNumber, this.languageValue);
        __page1 = __page1.clickAndFillLocationsAndDepartmentFilter(this.locationSectionNumber, this.geographicalLocationValue);
        __page1 = __page1.clickAndFillLocationsAndDepartmentFilter(this.departmentSectionNumber, this.departmentValue);
        __page1 = __page1.selectDivisionFilter(this.unitOfBusinessValue);
        __page1 = __page1.selectLegalUnitFilter(this.legalUnitValue);
        __page1 = __page1.clickApplyButtonFiltersModal();
        expect(__page1.filterPanel).toContainText(this.jobRoleNoFamily, { timeout: 30000 });
        expect(__page1.filterPanel).toContainText(this.skillValue, { timeout: 30000 });
        expect(__page1.filterPanel).toContainText(this.languageValue, { timeout: 30000 });
        expect(__page1.filterPanel).toContainText(this.geographicalLocationValue, { timeout: 30000 });
        expect(__page1.filterPanel).toContainText(this.departmentValue, { timeout: 30000 });
        expect(__page1.filterPanel).toContainText(this.unitOfBusinessValue, { timeout: 30000 });
        expect(__page1.filterPanel).toContainText(this.legalUnitValue, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
