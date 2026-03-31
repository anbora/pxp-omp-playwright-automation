// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class LOVFiltersInJobVacanciesPageTest extends BaseRestTest {

    private jobVacancy: string = "Job Vacancy";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private permanent: string = "Permanent";
    private contract: string = "Contract";
    private temporary: string = "Temporary";
    private volunteer: string = "Volunteer";
    private internship: string = "Internship";
    private probation: string = UUID.randomUUID().toString();
    private probation2: string = UUID.randomUUID().toString();
    private apprenticeship: string = "Apprenticeship";
    private other: string = "Other";
    private customLOVItem: string = "Custom Lov Item";
    private management: string = "Management";
    private individualContributor: string = "Individual contributor";
    private general: string = "General";
    private standardFields: string = "Standard Fields";
    private select: string = "Select";
    private seasonal: string = "Seasonal";
    private one: string = "2";
    private two: string = "3";
    private three: string = "4";
    private four: string = "5";
    private five: string = "6";
    private six: string = "7";
    private seven: string = "8";
    private english: string = "English";
    private opportunityMarketplace: string = "Talent Marketplace";
    private hrData: string = "HR Data";
    private configuration: string = "Configuration";
    private userModel: UserModel;

    public initialize(): void {

    this.userModel = this.createUser(true);

    }

    prepareTests(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.userModel))
                .run(new AddRoleAndFamilyToNewUserScenario(this.userModel.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .enableVisibility(this.other)
                .disableVisibility(this.customLOVItem)
                .clickSetLanguage(this.customLOVItem)
                .deleteTranslation(this.english)
                .setLanguages()
                .clickSave()
                .clickSave();
    }

    public enableDisableAndSetTranslationForLOVFilterOnJobVacanciesPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.userModel));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.showMore(this.jobType);
        expect(__page1.filterTitle(this.level)).toBeVisible({ timeout: 30000 });
        expect(__page1.filterTitle(this.workplaceModel)).toBeVisible({ timeout: 30000 });
        expect(__page1.filterTitle(this.schedule)).toBeVisible({ timeout: 30000 });
        if (this.one != null) {
                    expect(__page1.filterOption(this.jobType, this.one)).toContainText(this.permanent, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.permanent)).toBeVisible({ timeout: 30000 });
        if (this.two != null) {
                    expect(__page1.filterOption(this.jobType, this.two)).toContainText(this.contract, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.contract)).toBeVisible({ timeout: 30000 });
        if (this.three != null) {
                    expect(__page1.filterOption(this.jobType, this.three)).toContainText(this.temporary, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.temporary)).toBeVisible({ timeout: 30000 });
        if (this.four != null) {
                    expect(__page1.filterOption(this.jobType, this.four)).toContainText(this.volunteer, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.volunteer)).toBeVisible({ timeout: 30000 });
        if (this.five != null) {
                    expect(__page1.filterOption(this.jobType, this.five)).toContainText(this.internship, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.internship)).toBeVisible({ timeout: 30000 });
        if (this.six != null) {
                    expect(__page1.filterOption(this.jobType, this.six)).toContainText(this.apprenticeship, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.apprenticeship)).toBeVisible({ timeout: 30000 });
        if (this.seven != null) {
                    expect(__page1.filterOption(this.jobType, this.seven)).toContainText(this.other, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.jobType, this.other)).toBeVisible({ timeout: 30000 });
        if ("1" != null) {
                    expect(__page1.filterOption(this.careerTrack, "1")).toContainText(this.management, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.careerTrack, this.management)).toBeVisible({ timeout: 30000 });
        if ("2" != null) {
                    expect(__page1.filterOption(this.careerTrack, "2")).toContainText(this.individualContributor, { timeout: 30000 });
                    return this;
                }
        expect(__page1.filterOptionWithText(this.careerTrack, this.individualContributor)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.closeModal();
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForOpportunityMarketplace(this.general);
        __page1 = __page1.openOpportunityMarketplaceInnerTab(this.standardFields);
        expect(__page1.typeForField(this.jobType)).toContainText(this.select, { timeout: 30000 });
        expect(__page1.usageForField(this.jobType)).toContainText(this.jobVacancy, { timeout: 30000 });
        expect(__page1.availableOptionsForField(this.jobType)).toContainText(this.permanent + ", " + this.contract + ", " + this.temporary + ", "
                                    + this.volunteer + ", " + this.internship + ", " + this.apprenticeship + ", " + this.other, { timeout: 30000 });
        __page1 = __page1.changeContextToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForOpportunityMarketplace(this.configuration);
        __page1 = __page1.openHrDataInnerTab(this.standardFields);
        expect(__page1.typeForField(this.careerTrack)).toContainText(this.select, { timeout: 30000 });
        expect(__page1.usageForField(this.careerTrack)).toContainText(this.jobVacancy, { timeout: 30000 });
        expect(__page1.availableOptionsForField(this.careerTrack)).toContainText(this.management + ", " + this.individualContributor, { timeout: 30000 });
        __page1 = __page1.changeContextToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForOpportunityMarketplace(this.general);
        __page1 = __page1.openOpportunityMarketplaceInnerTab(this.standardFields);
        __page1 = __page1.editField(this.jobType);
        __page1 = __page1.addNewOption();
        expect(__page1.newLabel.last()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.closeModal();
        __page1 = __page1.refreshPage();
        __page1 = __page1.openOpportunityMarketplaceInnerTab(this.standardFields);
        __page1 = __page1.editField(this.jobType);
        __page1 = __page1.disableVisibility(this.other);
        __page1 = __page1.enableVisibility(this.customLOVItem);
        __page1 = __page1.typeNewLabel(this.customLOVItem, this.probation);
        __page1 = __page1.clickSave();
    }

    public checkCustomFiledEnablementAndSetLanguage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.userModel));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.openFiltersModal(AllFiltersModalPage);
        __page2 = __page2.showMore(this.jobType);
        if (this.one != null) {
                    expect(__page2.filterOption(this.jobType, this.one)).toContainText(this.permanent, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.permanent)).toBeVisible({ timeout: 30000 });
        if (this.two != null) {
                    expect(__page2.filterOption(this.jobType, this.two)).toContainText(this.contract, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.contract)).toBeVisible({ timeout: 30000 });
        if (this.three != null) {
                    expect(__page2.filterOption(this.jobType, this.three)).toContainText(this.temporary, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.temporary)).toBeVisible({ timeout: 30000 });
        if (this.four != null) {
                    expect(__page2.filterOption(this.jobType, this.four)).toContainText(this.volunteer, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.volunteer)).toBeVisible({ timeout: 30000 });
        if (this.five != null) {
                    expect(__page2.filterOption(this.jobType, this.five)).toContainText(this.internship, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.internship)).toBeVisible({ timeout: 30000 });
        if (this.six != null) {
                    expect(__page2.filterOption(this.jobType, this.six)).toContainText(this.apprenticeship, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.apprenticeship)).toBeVisible({ timeout: 30000 });
        if (undefined != null) {
                    expect(__page2.filterOption(this.jobType, undefined)).toContainText(this.probation, { timeout: 30000 });
                    return this;
                }
        expect(__page2.filterOptionWithText(this.jobType, this.probation)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.closeModal();
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.opportunityMarketplace);
        __page2 = __page2.openMenuForOpportunityMarketplace(this.general);
        __page2 = __page2.openOpportunityMarketplaceInnerTab(this.standardFields);
        __page2 = __page2.editField(this.jobType);
        __page2 = __page2.clickSetLanguage(this.customLOVItem);
        __page2 = __page2.selectLanguage(this.english);
        __page2 = __page2.clickAddLanguage();
        __page2 = __page2.typeTranslation(this.english, this.probation2);
        __page2 = __page2.setLanguages();
        __page2 = __page2.clickSave();
        __page2 = __page2.clickSave();
    }

    public checkTranslationForJobType(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.userModel));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToVacanciesPageViaCard();
        __page3 = __page3.openFiltersModal(AllFiltersModalPage);
        __page3 = __page3.showMore(this.jobType);
        if (this.one != null) {
                    expect(__page3.filterOption(this.jobType, this.one)).toContainText(this.permanent, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.permanent)).toBeVisible({ timeout: 30000 });
        if (this.two != null) {
                    expect(__page3.filterOption(this.jobType, this.two)).toContainText(this.contract, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.contract)).toBeVisible({ timeout: 30000 });
        if (this.three != null) {
                    expect(__page3.filterOption(this.jobType, this.three)).toContainText(this.temporary, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.temporary)).toBeVisible({ timeout: 30000 });
        if (this.four != null) {
                    expect(__page3.filterOption(this.jobType, this.four)).toContainText(this.volunteer, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.volunteer)).toBeVisible({ timeout: 30000 });
        if (this.five != null) {
                    expect(__page3.filterOption(this.jobType, this.five)).toContainText(this.internship, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.internship)).toBeVisible({ timeout: 30000 });
        if (this.six != null) {
                    expect(__page3.filterOption(this.jobType, this.six)).toContainText(this.apprenticeship, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.apprenticeship)).toBeVisible({ timeout: 30000 });
        if (undefined != null) {
                    expect(__page3.filterOption(this.jobType, undefined)).toContainText(this.probation2, { timeout: 30000 });
                    return this;
                }
        expect(__page3.filterOptionWithText(this.jobType, this.probation2)).toBeVisible({ timeout: 30000 });
    }

    public shouldEnsureTheConditionsAreTheSameAsBeforeTheTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .enableVisibility(this.other)
                .disableVisibility(this.customLOVItem)
                .clickSetLanguage(this.customLOVItem)
                .deleteTranslation(this.english)
                .setLanguages()
                .clickSave()
                .clickSave();
    }

    public afterClass(): void {

      this.deleteUser(this.userModel);

    }
}
