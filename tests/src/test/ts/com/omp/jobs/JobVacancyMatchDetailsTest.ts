// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { expect } from "common/testing/playwright";

export class JobVacancyMatchDetailsTest extends BaseRestTest {

    private readonly skills: string = "Skills";
    private readonly experience: string = "Experience";
    private readonly jobType: string = "Job Type";
    private readonly matching: string = "Matching";
    private readonly workplaceModel: string = "Workplace Model";
    private readonly level: string = "Level";
    private readonly permanent: string = "Permanent";
    private readonly goodMatch: string = "Good match";
    private readonly director: string = "Director";
    private readonly agriculturalMachineryMechanicFullTitle: string = "First Job Family -  Agricultural Machinery Mechanic";
    private readonly agriculturalMachineryMechanic: string = "Agricultural Machinery Mechanic";
    private readonly agriculturalMachineryMechanicsDirector: string = "Agricultural Machinery Mechanics this.director";
    private readonly mechanics: string = "Mechanics";
    private readonly agriculture: string = "Agriculture";
    private readonly agricultureLC: string = "this.agriculture";
    private readonly electricians: string = "Electricians";
    private readonly advanced: string = "Advanced";
    private readonly intermediate: string = "Intermediate";
    private readonly beginner: string = "Beginner";
    private readonly careerGoal: string = "Career Goal";
    private readonly schedule: string = "Schedule";
    private readonly forward: string = "I want to progress my career and take on more responsibility";
    private readonly fullTime: string = "Full time";
    private readonly individualContributor: string = "Individual contributor";
    private readonly careerTrack: string = "Career Track";
    private readonly remote: string = "Remote";
    private readonly matchDetails: string = "Match details";
    private readonly notMatchSkills: string = "1 of 11 this.skills match your profile";
    private readonly matchPreferences: string = "Job Vacancy matches your preferences";
    private readonly careerPreferences: string = "Career Preferences";
    private readonly matchExperience: string = "Job Vacancy matches your this.experience";
    private readonly matchCareerPath: string = "Job Vacancy is a good fit for your career path";
    private readonly careerPath: string = "Career Path";
    private readonly agriculturalEngineeringLC: string = "agricultural engineering";
    private readonly emptyLevel: string = "-";
    private readonly closeRelationship: string = "Close relationship between this Job Vacancy and your recent this.experience";
    private readonly yes: string = "Yes";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckMatchDetailsVisibilityForJobVacancy(): void {
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
        __page1 = __page1.refreshPage();
        __page1 = __page1.goToRolesPageViaTab();
        __page1 = __page1.typeSearchValue(this.agriculturalMachineryMechanicsDirector);
        __page1 = __page1.markFirstRoleAsAspirational();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.mechanics, this.intermediate));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.agriculture, this.advanced));
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
        __page1 = __page1.waitForGoodOrExcellentMatchForSuggestedJobVacancy();
        expect(__page1.this.goodMatch(this.agriculturalMachineryMechanicsDirector).first()).toContainText(this.goodMatch, { timeout: 30000 });
        __page1 = __page1.goToFirstSuggestedJobVacancyDetailsPage();
        __page1 = __page1.showMatchDetails();
        expect(__page1.matchModalHeader).toContainText(this.matchDetails, { timeout: 30000 });
        expect(__page1.matchModalTab(this.skills)).toHaveClass("ed-progress-tab active");
        expect(__page1.matchModalDescription).toContainText(this.goodMatch, { timeout: 30000 });
        expect(__page1.matchModalTabDescription(this.skills)).toContainText(this.notMatchSkills, { timeout: 30000 });
        expect(__page1.matchModalTabIcon(this.skills)).toHaveClass("progress-tab-icon primary-color icon-cross-circle");
        expect(__page1.matchModalTabDescription(this.careerPreferences)).toContainText(this.matchPreferences, { timeout: 30000 });
        expect(__page1.matchModalTabIcon(this.careerPreferences)).toHaveClass("progress-tab-icon primary-color icon-check");
        expect(__page1.matchModalTabDescription(this.experience)).toContainText(this.matchExperience, { timeout: 30000 });
        expect(__page1.matchModalTabIcon(this.experience)).toHaveClass("progress-tab-icon primary-color icon-check");
        expect(__page1.matchModalTabDescription(this.careerPath)).toContainText(this.matchCareerPath, { timeout: 30000 });
        expect(__page1.matchModalTabIcon(this.careerPath)).toHaveClass("progress-tab-icon primary-color icon-check");
        expect(__page1.skillStatusIcon(this.agricultureLC)).toHaveClass("card-icon icon-check");
        expect(__page1.skillStatusIcon(this.agriculturalEngineeringLC)).toHaveClass("card-icon icon-cross-circle");
        expect(__page1.skillStatusLabel(this.agricultureLC)).toContainText("On target", { timeout: 30000 });
        expect(__page1.skillStatusLabel(this.agriculturalEngineeringLC)).toContainText("Off target", { timeout: 30000 });
        expect(__page1.skillYourLevelLabel(this.agricultureLC)).toContainText(this.advanced, { timeout: 30000 });
        expect(__page1.skillYourLevelLabel(this.agriculturalEngineeringLC)).toContainText(this.emptyLevel, { timeout: 30000 });
        expect(__page1.skillTargetLevelLabel(this.agricultureLC)).toContainText(this.advanced, { timeout: 30000 });
        __page1 = __page1.selectTab(this.careerPreferences);
        expect(__page1.matchModalTab(this.careerPreferences)).toHaveClass("ed-progress-tab active");
        expect(__page1.preference(this.schedule)).toContainText(this.fullTime, { timeout: 30000 });
        expect(__page1.preferenceStatus(this.schedule)).toContainText(this.matching, { timeout: 30000 });
        expect(__page1.preference(this.workplaceModel)).toContainText(this.remote, { timeout: 30000 });
        expect(__page1.preferenceStatus(this.workplaceModel)).toContainText(this.matching, { timeout: 30000 });
        expect(__page1.preference(this.jobType)).toContainText(this.permanent, { timeout: 30000 });
        expect(__page1.preferenceStatus(this.jobType)).toContainText(this.matching, { timeout: 30000 });
        expect(__page1.preference(this.level)).toContainText(this.director, { timeout: 30000 });
        expect(__page1.preferenceStatus(this.level)).toContainText(this.matching, { timeout: 30000 });
        expect(__page1.preference(this.careerTrack)).toContainText(this.individualContributor, { timeout: 30000 });
        expect(__page1.preferenceStatus(this.careerTrack)).toContainText(this.matching, { timeout: 30000 });
        expect(__page1.preferenceStatus(this.careerGoal)).toContainText(this.matching, { timeout: 30000 });
        __page1 = __page1.selectTab(this.experience);
        expect(__page1.matchModalTab(this.experience)).toHaveClass("ed-progress-tab active");
        expect(__page1.experienceDescription).toContainText(this.closeRelationship, { timeout: 30000 });
        expect(__page1.experienceStatus).toContainText(this.yes, { timeout: 30000 });
        expect(__page1.experienceStatusIcon).toHaveClass("card-icon icon-check");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
