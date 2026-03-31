// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class JobVacanciesFilteringTest extends BaseRestTest {

    private readonly newestFirst: string = "Newest First";
    private readonly jobType: string = "Job Type";
    private readonly jobTypeAndSchedule: string = "Job Type & Schedule";
    private readonly match: string = "Match";
    private readonly workplaceModel: string = "Workplace Model";
    private readonly level: string = "Level";
    private readonly permanent: string = "Permanent";
    private readonly low: string = "Low";
    private readonly fair: string = "Fair";
    private readonly good: string = "Good";
    private readonly excellent: string = "Excellent";
    private readonly director: string = "Director";
    private readonly agriculturalMachineryMechanicFullTitle: string = "First Job Family -  Agricultural Machinery Mechanic";
    private readonly agriculturalMachineryMechanic: string = "Agricultural Machinery Mechanic";
    private readonly mechanics: string = "Mechanics";
    private readonly agriculture: string = "Agriculture";
    private readonly electricians: string = "Electricians";
    private readonly advanced: string = "Advanced";
    private readonly intermediate: string = "Intermediate";
    private readonly beginner: string = "Beginner";
    private readonly careerGoal: string = "Career Goal";
    private readonly schedule: string = "Schedule";
    private readonly careerTrack: string = "Career Track";
    private readonly forward: string = "I want to progress my career and take on more responsibility";
    private readonly fullTime: string = "Full time";
    private readonly partTime: string = "Part time";
    private readonly individualContributor: string = "Individual contributor";
    private readonly internship: string = "Internship";
    private readonly emptyCustomLevel: string = "Empty Custom Level";
    private readonly customSeniorLevel: string = "Custom Senior Level";
    private readonly emptyCustomModel: string = "Empty Custom Model";
    private readonly emptyCustomJobType: string = "Other";
    private readonly customSchedule: string = "Custom Schedule";
    private readonly emptyCustomSchedule: string = "Empty Custom Schedule";
    private readonly customModel: string = "Custom Model";
    private readonly hybrid: string = "Hybrid";
    private readonly remote: string = "Remote";
    private readonly locations: string = "Locations";
    private readonly locationValue: string = "TestingQA";
    private readonly management: string = "Management";
    private readonly customJobType: string = "Internship";
    private readonly noResultsInfo: string = "Sorry, nothing matches your criteria! Try different keywords or adjust your filters";
    private readonly skills: string = "Skills";
    private readonly testAutomation: string = "test automation";
    private user: UserModel;
    private readonly locationName: string = "Pune";
    private readonly specialCharLocation: string = "Köl, Kalmar County, Sweden";
    private readonly specialCharLocationFilterToRemove: string = "Köl, 382 92 Nybro kommun, Sweden";
    private readonly locationWithDistance: string = "Pune (~56km)";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldSetUserProfileAndFilterJobVacanciesByLevel(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.agriculturalMachineryMechanic, this.agriculturalMachineryMechanicFullTitle);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.refreshCurrentPage(WelcomePage_New);
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.mechanics, this.advanced));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.agriculture, this.intermediate));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.electricians, this.beginner));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerGoal, this.forward);
        __page1 = __page1.addCareerPreference(this.level, this.director);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.workplaceModel, this.remote);
        __page1 = __page1.addCareerPreference(this.jobType, this.permanent);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.schedule, this.fullTime);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor);
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.showMore(this.level);
        __page1 = __page1.selectFilterValue(this.level, this.internship);
        __page1 = __page1.applyFilters();
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        expect(__page1.matchDetailValue(this.level)).toContainText(this.internship, { timeout: 30000 });
        __page1 = __page1.clickBackButton();
        expect(__page1.removeFilterButton(this.internship)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.removeFilter(this.internship);
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.showMore(this.level);
        __page1 = __page1.selectFilterValue(this.level, this.director);
        __page1 = __page1.applyFilters();
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        expect(__page1.matchDetailValue(this.level)).toContainText(this.director, { timeout: 30000 });
        __page1 = __page1.clickBackButton();
        expect(__page1.removeFilterButton(this.director)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.removeAllFilter();
    }

    public shouldFilterJobVacanciesByWorkplaceModel(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaTab();
        __page2 = __page2.openFiltersModal(AllFiltersModalPage);
        __page2 = __page2.searchForLocationV2WithWait(this.locationValue, 1000);
        __page2 = __page2.applyFilters();
        __page2 = __page2.typeSearchValue("Job with TestingQA location");
        __page2 = __page2.goToFirstJobVacancyWithSpecifiedLocation(this.locationValue);
        expect(__page2.workplaceModelLabel(this.locationValue)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickBackButton();
        expect(__page2.removeFilterButton(this.locationValue)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.removeFilter(this.locationValue);
    }

    public shouldFilterJobVacanciesByJobType(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToVacanciesPageViaTab();
        __page3 = __page3.openFiltersModal(AllFiltersModalPage);
        __page3 = __page3.showMore(this.jobType);
        __page3 = __page3.selectFilterValue(this.jobType, this.permanent);
        __page3 = __page3.applyFilters();
        __page3 = __page3.goToFirstJobVacancyOnAllJobsList();
        expect(__page3.matchDetailValue(this.jobTypeAndSchedule)).toContainText(this.permanent, { timeout: 30000 });
        __page3 = __page3.clickBackButton();
        expect(__page3.removeFilterButton(this.permanent)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.removeFilter(this.permanent);
        __page3 = __page3.openFiltersModal(AllFiltersModalPage);
        __page3 = __page3.selectFilterValue(this.jobType, this.internship);
        __page3 = __page3.applyFilters();
        __page3 = __page3.typeSearchValue("Road Mime");
        __page3 = __page3.goToFirstJobVacancyOnAllJobsList();
        expect(__page3.matchDetailValue(this.jobTypeAndSchedule)).toContainText(this.internship, { timeout: 30000 });
        __page3 = __page3.clickBackButton();
        expect(__page3.removeFilterButton(this.internship)).toBeVisible({ timeout: 30000 });
    }

    public shouldFilterJobVacanciesBySchedule(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.goToCareerGrowthPage();
        __page4 = __page4.goToVacanciesPageViaTab();
        __page4 = __page4.openFiltersModal(AllFiltersModalPage);
        __page4 = __page4.selectFilterValue(this.schedule, this.fullTime);
        __page4 = __page4.applyFilters();
        __page4 = __page4.sortListBy(this.newestFirst);
        __page4 = __page4.goToFirstJobVacancyOnAllJobsList();
        expect(__page4.matchDetailValue(this.jobTypeAndSchedule)).toContainText(this.fullTime, { timeout: 30000 });
        __page4 = __page4.clickBackButton();
        expect(__page4.removeFilterButton(this.fullTime)).toBeVisible({ timeout: 30000 });
        __page4 = __page4.removeFilter(this.fullTime);
        __page4 = __page4.openFiltersModal(AllFiltersModalPage);
        __page4 = __page4.selectFilterValue(this.schedule, this.partTime);
        __page4 = __page4.applyFilters();
        __page4 = __page4.goToFirstJobVacancyOnAllJobsList();
        expect(__page4.matchDetailValue(this.jobTypeAndSchedule)).toContainText(this.partTime, { timeout: 30000 });
        __page4 = __page4.clickBackButton();
        expect(__page4.removeFilterButton(this.partTime)).toBeVisible({ timeout: 30000 });
    }

    public shouldFilterJobVacanciesByCareerTrack(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user));
        __page5 = __page5.goToCareerGrowthPage();
        __page5 = __page5.goToVacanciesPageViaTab();
        __page5 = __page5.openFiltersModal(AllFiltersModalPage);
        __page5 = __page5.selectFilterValue(this.careerTrack, this.individualContributor);
        __page5 = __page5.applyFilters();
        __page5 = __page5.sortListBy(this.newestFirst);
        __page5 = __page5.goToFirstJobVacancyOnAllJobsList();
        expect(__page5.matchDetailValue(this.careerTrack)).toContainText(this.individualContributor, { timeout: 30000 });
        __page5 = __page5.clickBackButton();
        expect(__page5.removeFilterButton(this.individualContributor)).toBeVisible({ timeout: 30000 });
        __page5 = __page5.removeFilter(this.individualContributor);
        __page5 = __page5.openFiltersModal(AllFiltersModalPage);
        __page5 = __page5.selectFilterValue(this.careerTrack, this.management);
        __page5 = __page5.applyFilters();
        __page5 = __page5.goToFirstJobVacancyOnAllJobsList();
        expect(__page5.matchDetailValue(this.careerTrack)).toContainText(this.management, { timeout: 30000 });
        __page5 = __page5.clickBackButton();
        expect(__page5.removeFilterButton(this.management)).toBeVisible({ timeout: 30000 });
    }

    public shouldFilterJobVacanciesBySkill(): void {
                let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user));
        __page6 = __page6.goToCareerGrowthPage();
        __page6 = __page6.goToVacanciesPageViaTab();
        __page6 = __page6.openFiltersModal(AllFiltersModalPage);
        __page6 = __page6.searchForFilterValueWithWait(this.skills, this.testAutomation, 4000);
        __page6 = __page6.applyFilters();
        __page6 = __page6.goToFirstJobVacancyOnAllJobsList();
        __page6 = __page6.clickEditVacancyButton();
        Assert.assertTrue(__page6.skillChips().allTextContents().contains(this.testAutomation));
    }

    public shouldFilterJobVacanciesByGeoLocationAndDistanceTest(): void {
                let __page7: any = this;
        __page7 = __page7.getOmpLoginPage();
        __page7 = __page7.run(new LoginScenario(this.user));
        __page7 = __page7.goToCareerGrowthPage();
        __page7 = __page7.goToVacanciesPageViaTab();
        __page7 = __page7.openFiltersModal(AllFiltersModalPage);
        __page7 = __page7.searchForGeoLocation(this.locationName, 5000);
        __page7 = __page7.applyFilters();
        expect(__page7.removeFilterButton(this.locationName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.removeFilter(this.locationName);
        __page7 = __page7.openFiltersModal(AllFiltersModalPage);
        __page7 = __page7.searchForGeoLocation(this.specialCharLocation, 5000);
        __page7 = __page7.applyFilters();
        expect(__page7.removeFilterButton(this.specialCharLocationFilterToRemove)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.removeFilter(this.specialCharLocationFilterToRemove);
        __page7 = __page7.openFiltersModal(AllFiltersModalPage);
        __page7 = __page7.searchForGeoLocation(this.locationName, 5000);
        __page7 = __page7.changeDistane("56", 5000);
        __page7 = __page7.applyFilters();
        expect(__page7.removeFilterButton(this.locationWithDistance)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.openFiltersModal(AllFiltersModalPage);
        expect(__page7.allFiltersModal).toBeVisible({ timeout: 30000 });
        __page7 = __page7.closeModal();
    }
}
