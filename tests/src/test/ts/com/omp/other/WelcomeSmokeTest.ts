import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goDirectlyTo(WelcomePage_New)
                .check(WelcomePageAssertions)
                    .assertThatUserNameIsVisible(this.user.name)
                    .assertThatUrlContainsProperText(this.careerGrowthWelcomePage)
                    .assertThatWelcomeMessageIsEqualTo(this.welcomeMessage)
                    .assertThatSuggestionsMessageIsEqualTo(this.suggestionsMessage)
                    .assertThatIconIsDisplayedForTab(this.suggestions, this.star)
                    .assertThatIconIsDisplayedForTab(this.jobRoles, this.route)
                    .assertThatIconIsDisplayedForTab(this.jobVacancies, this.briefcase)
                    .assertThatIconIsDisplayedForTab(this.projects, this.pencil)
                .endAssertion()
                .hoverOverTab(this.suggestions)
                .check(WelcomePageAssertions)
                    .assertThatTabTipIsEqualTo(this.suggestionsTip)
                .endAssertion()
                .hoverOverTab(this.jobRoles)
                .check(WelcomePageAssertions)
                    .assertThatTabTipIsEqualTo(this.jobRolesTip)
                .endAssertion()
                .hoverOverTab(this.jobVacancies)
                .check(WelcomePageAssertions)
                    .assertThatTabTipIsEqualTo(this.jobVacanciesTip)
                .endAssertion()
                .hoverOverTab(this.projects)
                .check(WelcomePageAssertions)
                    .assertThatTabTipIsEqualTo(this.projectsTip)
                .endAssertion()
                .goToSuggestionsPageViaTab()
                .check(SuggestionsAssertions)
                    .assertThatUrlContainsProperText(this.suggestionsPage)
                .endAssertion()
                .goToRolesPageViaTab()
                .check(RoleListAssertions)
                    .assertThatUrlContainsProperText(this.rolesPage)
                .endAssertion()
                .goToVacanciesPageViaTab()
                .check(VacanciesListAssertions)
                    .assertThatUrlContainsProperText(this.vacanciesPage)
                .endAssertion()
                .goToProjectsPageViaTab()
                .check(ProjectDiscoveryAssertions)
                    .assertThatUrlContainsProperText(this.projectsPage)
                .endAssertion()
                .goToCareerGrowthWelcomePageViaTab()
                .check(WelcomePageAssertions)
                    .assertThatUrlContainsProperText(this.careerGrowthWelcomePage)
                .endAssertion()
                .goToSuggestionsPageViaCard()
                .check(SuggestionsAssertions)
                    .assertThatUrlContainsProperText(this.suggestionsPage)
                .endAssertion()
                .goToCareerGrowthWelcomePageViaTab()
                .goToRolesPageViaCard()
                .check(RoleListAssertions)
                    .assertThatUrlContainsProperText(this.rolesPage)
                .endAssertion()
                .goToCareerGrowthWelcomePageViaTab()
                .goToVacanciesPageViaCard()
                .check(VacanciesListAssertions)
                    .assertThatUrlContainsProperText(this.vacanciesPage)
                .endAssertion()
                .goToCareerGrowthWelcomePageViaTab()
                .goToProjectsPageViaCard()
                .check(ProjectDiscoveryAssertions)
                    .assertThatUrlContainsProperText(this.projectsPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
