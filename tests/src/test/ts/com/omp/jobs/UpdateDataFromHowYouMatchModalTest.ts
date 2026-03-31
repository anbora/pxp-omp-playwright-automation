// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { UserModel } from "models/user/UserModel";
import { AddMoreExperienceToCareerProfileScenario } from "scenarios/jobs/AddMoreExperienceToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { expect } from "common/testing/playwright";

export class UpdateDataFromHowYouMatchModalTest extends BaseRestTest {

    private readonly jobTitle: string = "restassureJob" + UUID.randomUUID();
    private readonly jobVacancy: string = "Job Vacancy";
    private readonly low: string = "low";
    private readonly missingData: string = "Missing data";
    private readonly skills: string = "Skills";
    private readonly careerPreferences: string = "Career Preferences";
    private readonly experience: string = "Experience";
    private readonly careerPath: string = "Career Path";
    private readonly noDataSkills: string = "Add this.skills to your profile to see how well you match";
    private readonly anxiety: string = "anxiety";
    private readonly beginner: string = "Beginner";
    private readonly updateSkills: string = "Update your this.skills";
    private readonly noDataPreferences: string = "Add career preferences to your profile to see how well you match";
    private readonly level: string = "Level";
    private readonly internship: string = "Internship";
    private readonly updatePreferences: string = "Update your preferences";
    private readonly noDataExperience: string = "Update your this.experience to see how well you match";
    private readonly bountyHunter: string = "Bounty hunter";
    private readonly lumesse: string = "Lumesse";
    private readonly hunting: string = "hunting";
    private readonly october: string = "Oct";
    private readonly june: string = "Jun";
    private readonly year_2018: string = "2018";
    private readonly year_2023: string = "2023";
    private readonly updateExperience: string = "Update your this.experience";
    private readonly noDataCareerPath: string = "Update your aspirational Job Role to see how well you match";
    jobModel: JobModel;
    private user: UserModel;

    public initialize(): void {
      let jobModel: any = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        let linkedRolesList: Array<LinkedRole> = this.jobModel.getLinkedRoles();
        linkedRolesList.get(0).setInternalId("");
        linkedRolesList.get(0).setExternalId("careerpathsmoketest4");
        this.jobModel.setLinkedRoles(linkedRolesList);
        this.createJob(this.jobTitle, this.jobModel);
      this.user = this.createUser();
    }

    public shouldCheckMatchDetailsVisibilityForJobVacancy(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.jobTitle);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.showMatchDetails();
        expect(__page1.matchModalDescription).toContainText("This " + this.jobVacancy + " seems to be a " + this.low + " match.", { timeout: 30000 });
        expect(__page1.matchModalTabDescription(this.skills)).toContainText(this.missingData, { timeout: 30000 });
        expect(__page1.matchModalTabDescription(this.experience)).toContainText(this.missingData, { timeout: 30000 });
        expect(__page1.matchModalTabDescription(this.careerPath)).toContainText(this.missingData, { timeout: 30000 });
        expect(__page1.matchModalTabIcon(this.skills)).toHaveClass("progress-tab-icon primary-color icon-question-circle");
        expect(__page1.matchModalTabIcon(this.experience)).toHaveClass("progress-tab-icon primary-color icon-question-circle");
        expect(__page1.matchModalTabIcon(this.careerPath)).toHaveClass("progress-tab-icon primary-color icon-question-circle");
        expect(__page1.noDataContainerDescription).toContainText(this.noDataSkills, { timeout: 30000 });
        __page1 = __page1.updateSkills();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.anxiety, this.beginner));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSaveButtonAndGoBackToJobVacancyDetails();
        __page1 = __page1.showMatchDetails();
        expect(__page1.updateButton).toContainText(this.updateSkills, { timeout: 30000 });
        expect(__page1.noDataContainerDescription).toBeHidden();
        __page1 = __page1.selectTab(this.experience);
        expect(__page1.noDataContainerDescription).toContainText(this.noDataExperience, { timeout: 30000 });
        __page1 = __page1.addExperience();
        __page1 = __page1.run(new AddMoreExperienceToCareerProfileScenario(this.bountyHunter, this.lumesse, this.hunting, this.october, this.year_2018, this.june, this.year_2023));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSaveButtonAndGoBackToJobVacancyDetails();
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.selectTab(this.experience);
        expect(__page1.updateButton).toContainText(this.updateExperience, { timeout: 30000 });
        expect(__page1.noDataContainerDescription).toBeHidden();
        __page1 = __page1.selectTab(this.careerPath);
        expect(__page1.noDataContainerDescription).toContainText(this.noDataCareerPath, { timeout: 30000 });
        __page1 = __page1.searchAspirationalJobRole();
        expect(__page1.galaxyView).toBeVisible({ timeout: 30000 });
    }
}
