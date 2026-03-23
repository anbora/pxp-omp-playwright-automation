import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { MentorshipDiscoveryPage } from "pages/careergrowth/mentorship/MentorshipDiscoveryPage";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";

export class WelcomePage_New extends BasePage implements CareerGrowthTopPanelComponent<WelcomePage_New>{
  static pageModel = { pageName: "Career Growth Welcome page", url: "/career" };

    private static readonly TAB_SECTION: string = ".tm__welcome-tab";
    public readonly welcomeMessage: Locator = this.page.locator(".card-static span");
    public readonly careerPathCard: Locator = this.page.locator("//h4[text()='Career Exploration']/parent::div");
    public suggestionsCard(): Locator {
      return this.aiLocator(TAB_SECTION,"//h4[text()='Suggestions']/parent::div");
    }
    public readonly rolesCard: Locator = this.page.locator("//h4[text()='Job Roles']/parent::div");
    public readonly vacanciesCard: Locator = this.page.locator("//h4[text()='Job Vacancies']/parent::div");
    public projectsCard(): Locator {
      return this.aiLocator(TAB_SECTION, "//h4[text()='Projects']/parent::div");
    }
    public readonly mentorshipsCard: Locator = this.page.locator("//h4[text()='Mentorships']/parent::div");
    public tabIcon(title: string): Locator {
      return this.getLocatorWithParam("//h4[text()='%s']/preceding-sibling::i", title);
    }
    public readonly tabTip: Locator = this.page.locator("//p[@class='s-margin-bottom']");
    public tabButton(tab: string): Locator {
      return getP().getByRole(AriaRole.BUTTON, tab).build();
    }
    public hoverOverCards(cardName: string): Locator {
      return this.getByRole(AriaRole.BUTTON, cardName).build().first();
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public getP(): WelcomePage_New {

      return this;
    }

    public hoverOverCard(cardName: string): WelcomePage_New {
        this.hoverOverCards(cardName).first().hover();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public goToCareerPathPageViaCard(): CareerPathPage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        careerPathCard.click();
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public goToSuggestionsPageViaCard(): SuggestionsPage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        this.suggestionsCard().click();
        return this.getPageClassInstance(SuggestionsPage_New);
    }

    public goToRolesPageViaCard(): RolesListPage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(5000);
        rolesCard.click();
        this.pause(10000);
        return this.getPageClassInstance(RolesListPage_New);
    }

    public goToVacanciesPageViaCard(): VacanciesListPage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(2000);
        vacanciesCard.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    public goToProjectsPageViaCard(): ProjectDiscoveryPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(2000);
        this.projectsCard().click();
        return this.getPageClassInstance(ProjectDiscoveryPage);
    }

    public goToMentorshipPageViaCard(): MentorshipDiscoveryPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(2000);
        mentorshipsCard.click();
        return this.getPageClassInstance(MentorshipDiscoveryPage);
    }

    public hoverOverTab(title: string): WelcomePage_New {
        this.tabButton(title).hover();
        return this;
    }
}
