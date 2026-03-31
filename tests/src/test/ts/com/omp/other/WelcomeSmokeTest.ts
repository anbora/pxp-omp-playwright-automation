// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";

export class WelcomeSmokeTest extends BaseRestTest {

    private welcomeMessage: string = "Welcome to Talent Marketplace!";
    private suggestionsMessage: string = "Suggestions are made based on your profile and preferences.";
    private suggestions: string = "Suggestions";
    private suggestionsTip: string = "Just for you! Suggestions based on your profile and preference";
    private jobRoles: string = "Job Roles";
    private jobRolesTip: string = "Browse Job Roles to see in demand skills and personalized learning plans";
    private jobVacancies: string = "Job Vacancies";
    private jobVacanciesTip: string = "Browse current internal Job Vacancies";
    private projects: string = "Projects";
    private projectsTip: string = "Expand your knowledge by taking on another project";
    private star: string = "icon-star";
    private route: string = "icon-route";
    private briefcase: string = "icon-briefcase-thin";
    private pencil: string = "icon-pencil-ruler";
    private careerGrowthWelcomePage: string = "/career";
    private suggestionsPage: string = "/career/this.suggestions";
    private rolesPage: string = "/career/job-roles";
    private vacanciesPage: string = "/career/job-vacancies";
    private projectsPage: string = "/career/project";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public checkWelcomePage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goDirectlyTo(WelcomePage_New);
        expect(__page1.this.user.name()).toContainText(this.user.name, { timeout: 30000 });
        assertTrue(__page1.getPage().url().contains(this.careerGrowthWelcomePage), "Expected url: '" + this.careerGrowthWelcomePage + "' but was: '" + __page1.getPage().url() + "'");
        expect(__page1.welcomeMessage).toContainText(this.welcomeMessage, { timeout: 30000 });
        expect(__page1.suggestionsMessage()).toContainText(this.suggestionsMessage, { timeout: 30000 });
        expect(__page1.tabIcon(this.suggestions)).toHaveClass(this.star);
        expect(__page1.tabIcon(this.jobRoles)).toHaveClass(this.route);
        expect(__page1.tabIcon(this.jobVacancies)).toHaveClass(this.briefcase);
        expect(__page1.tabIcon(this.projects)).toHaveClass(this.pencil);
        __page1 = __page1.hoverOverTab(this.suggestions);
        expect(__page1.tabTip.last()).toContainText(this.suggestionsTip, { timeout: 30000 });
        __page1 = __page1.hoverOverTab(this.jobRoles);
        expect(__page1.tabTip.last()).toContainText(this.jobRolesTip, { timeout: 30000 });
        __page1 = __page1.hoverOverTab(this.jobVacancies);
        expect(__page1.tabTip.last()).toContainText(this.jobVacanciesTip, { timeout: 30000 });
        __page1 = __page1.hoverOverTab(this.projects);
        expect(__page1.tabTip.last()).toContainText(this.projectsTip, { timeout: 30000 });
        __page1 = __page1.goToSuggestionsPageViaTab();
        assertTrue(__page1.getPage().url().contains(this.suggestionsPage), "Expected url: '" + this.suggestionsPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToRolesPageViaTab();
        assertTrue(__page1.getPage().url().contains(this.rolesPage), "Expected url: '" + this.rolesPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToVacanciesPageViaTab();
        assertTrue(__page1.getPage().url().contains(this.vacanciesPage), "Expected url: '" + this.vacanciesPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToProjectsPageViaTab();
        assertTrue(__page1.getPage().url().contains(this.projectsPage), "Expected url: '" + this.projectsPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToCareerGrowthWelcomePageViaTab();
        assertTrue(__page1.getPage().url().contains(this.careerGrowthWelcomePage), "Expected url: '" + this.careerGrowthWelcomePage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToSuggestionsPageViaCard();
        assertTrue(__page1.getPage().url().contains(this.suggestionsPage), "Expected url: '" + this.suggestionsPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToCareerGrowthWelcomePageViaTab();
        __page1 = __page1.goToRolesPageViaCard();
        assertTrue(__page1.getPage().url().contains(this.rolesPage), "Expected url: '" + this.rolesPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToCareerGrowthWelcomePageViaTab();
        __page1 = __page1.goToVacanciesPageViaCard();
        assertTrue(__page1.getPage().url().contains(this.vacanciesPage), "Expected url: '" + this.vacanciesPage + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.goToCareerGrowthWelcomePageViaTab();
        __page1 = __page1.goToProjectsPageViaCard();
        assertTrue(__page1.getPage().url().contains(this.projectsPage), "Expected url: '" + this.projectsPage + "' but was: '" + __page1.getPage().url() + "'");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
