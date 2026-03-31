// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";

export class ProjectDiscoveryPage extends BasePage implements CareerGrowthTopPanelComponent<ProjectDiscoveryPage>,
        CareerGrowthFiltersComponent<ProjectDiscoveryPage> {

    public allProjectsHeader: Locator = this.page.locator("//div/h2[@class='tab-heading omp-counter-field']|//div/h5[@class='tab-heading omp-counter-field']");
    public suggestProjectsCarouselHeader: Locator = this.page.locator("//div//section[@class='tm__recommendations-carousel-header']");
    public searchInputField: Locator = this.getByPlaceholder("Search here...");
    public searchIcon: Locator = this.getByLabel("Search",true);
    public filtersButton: Locator = this.getByRole(AriaRole.BUTTON, "Filters");
    public projectCardActionsMenu(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__project-card-header']/h3[text()='%s']/following-sibling::div//div//button", projectTitle);
    }
    public projectCardTitle(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__project-card-header']/h3[text()='%s']", projectTitle);
    }
    public projectCardOrgValue(projectTitle: string, orgNameValue: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__project-card-header']/h3[text()='%s']/../following-sibling::div[contains(@class,'m-margin-top')]/div[2]/span[text()='%s']", projectTitle, orgNameValue);
    }
    public projectThreeDots: Locator = this.getByRole(AriaRole.BUTTON," more actions").first();
    public projectActionsClickOnAnAction(actionName: string): Locator {
      return this.getLocatorWithParam("//ul[@class='tm__project-dropdown-list']/li[text()='%s']", actionName);
    }
    public createAProjectButton: Locator = this.getByRole(AriaRole.LINK, "Create a Project");
    public allFiltersHeader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='All Filters']|//div[@class='ed-dialog-modal-header']/h2[text()='All Filters']");
    public orgFilterHeader: Locator = this.page.locator("//h3[@class='filter-section-header' and text()='Organization']");
    public removeAppliedFilter: Locator = this.page.locator("//button[contains(@aria-label,'Remove')]");
    public orgFilterDepartmentSubFilter: Locator = this.page.locator("//legend[contains(@class,'filter-list__title')]/div[text()='Department']");
    public orgFilterDepartmentSubFilterSearchTextField: Locator = this.page.locator("//fieldset[legend/div[contains(text(), 'Department')] or legend[contains(text(), 'Department')]]/descendant::input[@type = 'text']");
    public openingsAvailableFilter: Locator = this.page.locator("//div[@class='tm-filterbar__activefilters']/div[contains(@class, 'ed-tag-container')]/span[2][text()='Openings available']");
    public filterSelectValue(filterValue: string): Locator {
      return this.getLocatorWithParam("//input[@type='checkbox']/following-sibling::span[text()='%s']", filterValue);
    }
    public filterCancelButton: Locator = this.getByRole(AriaRole.BUTTON, "Cancel");
    public filterApplyButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Apply']");
    public filterSearchTextField(filterHeader: string): Locator {
      return this.getLocatorWithParam("//h4[contains(@class,'filter-list__title')]/div[text()='%s']/../following-sibling::div/div/input", filterHeader);
    }
    public closeFiltersButton: Locator = this.getByRole(AriaRole.BUTTON, "Cancel");
    public readonly sortBy: Locator = this.page.locator("#ed-opportunities-sort-by");
    public projectCardLocation: Locator = this.locator(".icon-map-marker");
    public projectCardDetails(projectName: string): Locator {
      return this.getByRole(AriaRole.BUTTON, projectName, true);
    }
    public readonly projectFilterLocation: Locator = this.getByLabel("Locations");
    public hoverShareProjects: Locator = this.page.locator("//div[@class='tm__project-card-actions-container']/div[1]/button");
    public hoverBookmarkProjects: Locator = this.page.locator("//div[@class='tm__project-card-actions-container']/div[2]/button");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public getP(): ProjectDiscoveryPage {

      return this;
    }

    public searchForAProject(projectTitle: string): ProjectDiscoveryPage {
        searchInputField.click();
        searchInputField.fill(projectTitle);
        searchIcon.click();
        return this;
    }

    public clickAndSelectAProjectAction(projectTitle: string, actionName: string): ProjectDiscoveryPage {
        this.projectCardActionsMenu(projectTitle).click();
        this.projectActionsClickOnAnAction(actionName).click();
        return this;
    }

    public hoverOverShareProjects(): ProjectDiscoveryPage {
        hoverShareProjects.first().hover();
        return this;
    }

    public hoverOverBookmarkProjects(): ProjectDiscoveryPage {
        hoverBookmarkProjects.first().hover();
        return this;
    }

    public searchAndSelectOrgDepartmentFilterValue(departmentFilterValue: string): ProjectDiscoveryPage {
        orgFilterDepartmentSubFilterSearchTextField.fill(departmentFilterValue);
        this.filterSelectValue(departmentFilterValue).click();
        filterApplyButton.click();
        return this;
    }

    public clickFilterCancelButton(): ProjectDiscoveryPage {
        filterCancelButton.click();
        return this;
    }

    public clearFilterAndSearchAgain(): ProjectDiscoveryPage {
        removeAppliedFilter.click();
        filtersButton.click();
        this.searchAndSelectOrgDepartmentFilterValue("Automation Dept");
        return this;
    }

    public refreshUntilProjectReturnsInSearchResults(projectTitle: string): ProjectDiscoveryPage {
        this.repeatUntilElementToBeVisible(() => {
        }, projectCardTitle(projectTitle), 10, 5000, () => this.clearFilterAndSearchAgain());
        return this;
    }

    public visitAURL<T extends BasePage>(url: string, clazz: Class<T>): T {
        this.page.navigate(url);
        return this.getPageClassInstance(clazz);
    }

    public visitClipboardCopiedLink(): ProjectDiscoveryPage {
//        cy.window().then(win => {
//                win.navigator.clipboard.readText().then(urlFromClipboard => {
//                        cy.visit(urlFromClipboard)
//                })
//          })
        return this;
    }

    public clickSearchIcon(): ProjectDiscoveryPage {
        searchIcon.click();
        return this;
    }

    public refreshUntilProjectReturnsInResults(projectTitle: string): ProjectDiscoveryPage {
        this.repeatUntilElementToBeVisible(() => {
        }, projectCardTitle(projectTitle), 20, 5000, () => this.clickSearchIcon());
        return this;
    }

    public clickProjectCardCardDetails(projectName: string): ProjectDetailsPage {
        this.projectCardDetails(projectName).first().click();
        return this.getPageClassInstance(ProjectDetailsPage);
    }
}
