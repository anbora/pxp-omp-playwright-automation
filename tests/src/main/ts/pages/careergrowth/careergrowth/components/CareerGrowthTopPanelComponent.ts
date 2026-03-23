import { BasePage } from "common/BasePage";
import { AriaRole, LoadState, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { BaseInterface } from "pages/careergrowth/careergrowth/components/BaseInterface";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { MentorshipDiscoveryPage } from "pages/careergrowth/mentorship/MentorshipDiscoveryPage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";

export interface CareerGrowthTopPanelComponent<T extends BasePage> extends BaseInterface<T> {
    T getP();

    userName(): default Locator {

      return getP().getByRole(AriaRole.HEADING, "Hi,").build();

    }
    welcomeTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Welcome").build();
    }
    careerPathTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Career Exploration").build();
    }
    suggestionsTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Suggestions").build();
    }
    rolesTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Job Roles").build();
    }
    vacanciesTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Job Vacancies").build();
    }
    projectsTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Project").build();
    }
    mentorshipTab(): default Locator {
      return getP().getByRole(AriaRole.TAB, "Mentorship").build();
    }
    suggestionsMessage(): default Locator {
      return getP().locator("div.profile-setup__message-bold > span").build();
    }
    currentRoleName(): default Locator {
      return getP().locator("span.role-name").build();
    }
    updateCareerProfileLink(): default Locator {
      return getP().locator("//button[text() = 'Update Career Profile']").build();
    }
    updateCareerProfileLinkWithoutAI(): default Locator {
      return getP().locator("//button[text() = 'Update Career Profile']").build();
    }
    yourAspirationalRolesInformation(): default Locator {
      return getP().locator("//div[@class='supporting-text no-padding']").build();
    }

    goToCareerGrowthWelcomePageViaTab(): default WelcomePage_New {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.welcomeTab().click();
        return this.getP().getPageClassInstance(WelcomePage_New);
    }

    goToCareerPathPageViaTab(): default CareerPathPage_New {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.careerPathTab().first().click();
        return this.getP().getPageClassInstance(CareerPathPage_New);
    }

    goToSuggestionsPageViaTab(): default SuggestionsPage_New {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.suggestionsTab().first().click();
        return this.getP().getPageClassInstance(SuggestionsPage_New);
    }

    goToRolesPageViaTab(): default RolesListPage_New {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.rolesTab().click();
        return this.getP().getPageClassInstance(RolesListPage_New);
    }

    goToVacanciesPageViaTab(): default VacanciesListPage_New {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.vacanciesTab().click();
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getP().getPageClassInstance(VacanciesListPage_New);
    }

    goToProjectsPageViaTab(): default ProjectDiscoveryPage {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.projectsTab().first().click();
        return this.getP().getPageClassInstance(ProjectDiscoveryPage);
    }

    goToMenthorshipPageViaTab(): default MentorshipDiscoveryPage {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.getP().pause(2000);
        this.mentorshipTab().first().click();
        return this.getP().getPageClassInstance(MentorshipDiscoveryPage);
    }

    clickUpdateCareerProfileLink(): default ExperienceCareerProfileModalPage {
        this.getP().pause(1000);
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.refreshPage();
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.updateCareerProfileLink().click();
        return this.getP().getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    getCurrentRoleNameAssignedToUser(roleName: ResultContainer): default T {
        roleName.setValue(currentRoleName().textContent());
        return this.getP();
    }
}
