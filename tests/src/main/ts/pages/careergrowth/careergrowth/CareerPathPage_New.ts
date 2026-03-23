import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator } from "common/testing/playwright";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { GalaxyViewFiltersModalPage } from "pages/careergrowth/roles/GalaxyViewFiltersModalPage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";

export class CareerPathPage_New extends BasePage implements CareerGrowthTopPanelComponent<CareerPathPage_New>, CareerGrowthFiltersComponent<CareerPathPage_New>{
  static pageModel = { pageName: "Career Path Page", url: "/career/career-path" };

    public readonly filtersButton: Locator = this.page.locator("//i[@class='icon-new-filter']/parent::button");
    public readonly galaxyView: Locator = this.page.locator("//div[@class='tm__galaxy-view']");
    public readonly galaxyViewBox: Locator = this.page.locator("//div[@class='tm__galaxy-view']/child::*[1]");
    public readonly noDataIcon: Locator = this.page.locator("//div[@class='tm-opportunities__no-data']/descendant::i");
    public removeFilterButton(jobFamily: string): Locator {
      return this.getLocatorWithParam("//button[@aria-label='Remove %s']", jobFamily);
    }
    public readonly removeAllFiltersButton: Locator = this.page.locator("//button[@title='Clear all filters']");
    public readonly updateCurrentJobRoleButton: Locator = this.page.locator("//button[@id='Update current Job Role']");
    public jobFamilySectionLineTitle(jobFamily: string): Locator {
      return this.getLocatorWithParam("//*[@class='galaxy-view-bg-sectionline']/child::*[3]/child::*[text()='%s']", jobFamily);
    }
    public readonly jobFamilySectionLine: Locator = this.page.locator("//*[@class='galaxy-view-bg-sectionline']/child::*[3]/child::*");
    public currentRoleName(roleName: string): Locator {
      return this.getLocatorWithParam("//div[@class='cp-user-role__name']/child::div[text() = '%s']", roleName);
    }
    public groupedRolesPill(numberOfRoles: string, jobFamily: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/ancestor::*[contains(@class,'g-button cp_role-pill')][@aria-label='%s']", numberOfRoles, jobFamily);
    }
    public groupedRolesNumber(jobFamilyName: string, orderNumber: string): Locator {
      return this.getLocatorWithParam("//*[@class='g-button cp_role-pill--clickable'][@aria-label='%s'][%s]/descendant::span", jobFamilyName, orderNumber);
    }
    public readonly rolePills: Locator = this.page.locator("//*[contains(@class,'g-button cp_role-pill')]");
    public rolePill(roleName: string): Locator {
      return this.getLocatorWithParam("//div[@class='cp-role-pill__name']/child::div[@aria-label='%s']",roleName);
    }
    public rolePillName(roleName: string): Locator {
      return this.getLocatorWithParam("//div[@title='%s']", roleName);
    }
    public rolePillLocation(roleName: string): Locator {
      return this.getLocatorWithParam("//*[contains(@class,'g-button cp_role-pill--clickable')][contains(@aria-label,'%s')]/child::*[@class='cp_role-pill__object']", roleName);
    }
    public smileIconForGroupedRolesPill(jobFamilyName: string, orderNumber: string, smileIconNumber: string): Locator {
      return this.getLocatorWithParam("//*[@class='g-button cp_role-pill--clickable'][@aria-label='%s'][%s]/descendant::div[@class='cp-role-group-pill__icons']/child::*[%s]/child::*[1]/child::*[1]", jobFamilyName, orderNumber, smileIconNumber);
    }
    public galaxyRing(ringNumber: string): Locator {
      return this.getLocatorWithParam("//*[@class='galaxy-view-bg__ring-nr-%s']", ringNumber);
    }
    public readonly showPanelButton: Locator = this.page.locator("//button[@class='galaxy-view-detail__collapse-btn']/child::span/child::span[@class='icon-angle-up-arrow']");
    public readonly jobRoleNameOnRoleDetailsCard: Locator = this.page.locator("//div[@class='role-card_header']/child::a[contains(@class,'role-title')]/child::div");
    public smileIconForRolePill(roleName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div/parent::div/descendant::*[@class='progress-smile-icon']/child::*[1]/child::*[1]", roleName);
    }
    public smileIconForCollapsedRolePill(roleName: string): Locator {
      return this.getLocatorWithParam("//*[text()='%s']/following-sibling::*/child::div/child::*/child::*/child::*[1]", roleName);
    }
    public readonly jobRoleDetailsCardCollapseButton: Locator = this.page.locator("//button[@class='galaxy-view-detail__collapse-btn']");
    public readonly exploreJobRoleTip: Locator = this.page.locator("//div[@class='tm__galaxy-tab_header_explore']/child::span[1]");
    public readonly exploreJobRoleButton: Locator = this.page.locator("//a[@class='ed-link']");
    public roleCard(roleName: string): Locator {
      return this.getLocatorWithParam("//a[contains(@class,'role-title')]/div[text()='%s']/parent::a[@class = 'role-title']", roleName);
    }
    public readonly roleCardTitle: Locator = this.page.locator("//div[contains(@class, 'role-title')]");
    public roleCardSmile(roleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[@role='button']/descendant::div[@class='smile-icon']/child::*/child::*[1]/child::*[1]", roleName);
    }
    public roleCardLevelLabel(roleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[@class='role-card__details']/descendant::div[@class='role-level']", roleName);
    }
    public roleCardFamilyLabel(roleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[@class='role-card__details']/descendant::div[@class='role-area']", roleName);
    }
    public roleCardMatchingLabel(roleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[@class='role-card role-card-full']/descendant::div[@class='matching-label']", roleName);
    }
    public roleCardWithMatchingLabel(roleName: string, match: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[@class='role-card role-card-full']/descendant::div[@class='matching-label'][text()='%s]", roleName, match);
    }
    public roleCardProgressBar(roleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[@class='role-card__details']/descendant::div[contains(@class, 'role-progress-bar')]/descendant::span[@class='progress-item']", roleName);
    }
    public roleCardSkillsLabel(roleName: string, skillName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'role-title')][text()='%s']/ancestor::div[contains(@class,'role-card-full')]/descendant::li[text()='%s']", roleName, skillName);
    }
    public readonly zoomInButton: Locator = this.page.locator("//button[contains(@style,'zoom-in')]");
    public readonly zoomOutButton: Locator = this.page.locator("//button[contains(@style,'zoom-out')]");
    public readonly moveLeftButton: Locator = this.page.locator("//button[@title = 'Move graph left']");
    public readonly moveUpButton: Locator = this.page.locator("//button[@title = 'Move graph up']");
    public readonly moveDownButton: Locator = this.page.locator("//button[@title = 'Move graph down']");
    public readonly moveRightButton: Locator = this.page.locator("//button[@title = 'Move graph right']");
    public readonly galaxyViewDetailPanel: Locator = this.page.locator("//button[@class='galaxy-view-detail__collapse-btn']/parent::div");
    public currentRoleDropdown: Locator = this.page.locator("//div[@class='cp-user-role__search-dropdown']");
    public searchAllJobRoles: Locator = this.page.locator("//div[@role='application']/div/div/div[1]/div[2]");
    public dropdownSelect: Locator = this.page.locator("//div[@role='application']//div[@role='listbox']/div[1]");
    public collapseButton: Locator = this.page.locator("//button[@class='galaxy-view-detail__collapse-btn']");
    public currentRole: Locator = this.page.locator("//div[.='Current role for Smoke Test']");
    public roleLevel: Locator = this.page.locator("//div[@class='role-level']");
    public roleArea(roleArea: string): Locator {
      return this.getLocatorWithParam("//div[@class='role-area']/span[.='%s']", roleArea);
    }
    public roleSkills: Locator = this.page.locator("//ul[@class='job-skill__skills text-mode']/span[.='Skills: ']");
    public roleIsMarkedAspirational(nextRoleSecond: string): Locator {
      return this.getLocatorWithParam("//div[@class='aspirational-role-name']/div[.='%s']", nextRoleSecond);
    }
    public hoverOverArrows(arrowName: string): Locator {
      return this.getByLabel(arrowName).build().first();
    }
    public hoverOverZoom(zoomInOrOut: string): Locator {
      return this.getByLabel(zoomInOrOut).build().first();
    }
    public openSelectStartingJobRoleSearch: Locator = locator("//div[@class='cp-user-role__search-dropdown']/button").build();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public openFiltersModal(): GalaxyViewFiltersModalPage {

      return openFiltersModal(GalaxyViewFiltersModalPage);

    }

    public hoverOverArrow(arrowName: string): CareerPathPage_New {
        this.hoverOverArrows(arrowName).first().hover();
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public hoverOverZoomOptions(zoomInOrOut: string): CareerPathPage_New {
        this.hoverOverZoom(zoomInOrOut).first().hover();
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public openJobRoleSearch(): CareerPathPage_New {
        openSelectStartingJobRoleSearch.click();
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public removeFilter(jobFamily: string): CareerPathPage_New {
        this.removeFilterButton(jobFamily).click();
        this.pause(10000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public removeAllFilters(): CareerPathPage_New {
        removeAllFiltersButton.click();
        this.pause(10000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public exploreJobRoles(): RolesListPage_New {
        exploreJobRoleButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(RolesListPage_New);
    }

    public updateCurrentJobRole(): ProfileDetailsPage {
        updateCurrentJobRoleButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(ProfileDetailsPage);
    }

    public clickRolePill(roleName: string): CareerPathPage_New {
        this.pause(1000);
        this.rolePill(roleName).first().click();
        this.pause(1000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public clickGroupedRolesPill(rolesNumber: string, jobFamily: string): CareerPathPage_New {
        this.groupedRolesPill(rolesNumber, jobFamily).first().click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public clickRoleCard(roleName: string): RoleDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.roleCard(roleName).click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public collapseJobRoleCardDetails(): CareerPathPage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        jobRoleDetailsCardCollapseButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(2000);
        return this;
    }

    public expandJobRolesPanel(): CareerPathPage_New {
        showPanelButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public zoomIn(): CareerPathPage_New {
        zoomInButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public zoomOut(): CareerPathPage_New {
        zoomOutButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public moveLeft(): CareerPathPage_New {
        moveLeftButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public moveRight(): CareerPathPage_New {
        moveRightButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public moveUp(): CareerPathPage_New {
        moveUpButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public moveDown(): CareerPathPage_New {
        moveDownButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public waitForRolePillOnGalaxyView(roleName: string): CareerPathPage_New {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshPage();
        }, rolePill(roleName), 5, 15000, () => {});
        return this;
    }

    public waitForMatchOnRoleCard(roleName: string, match: string): CareerPathPage_New {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshPage();
            this.clickRolePill(roleName);
            this.pause(6000);
        }, roleCardWithMatchingLabel(roleName, match), 5, 10000, () => {});
        return this;
    }

    public getP(): CareerPathPage_New {

      return this;
    }

    public refreshPage(): CareerPathPage_New {
        this.page.reload();
        return this;
    }

    public currentRoleDropdown(): CareerPathPage_New {
        currentRoleDropdown.click();
        currentRole.click();
        return this;
}

    public selectStartingJobRole(selectStartingJobRole: string): CareerPathPage_New {
      currentRoleDropdown.click();
      searchAllJobRoles.click();
      searchAllJobRoles.type(selectStartingJobRole);
      this.pause(3000);
      dropdownSelect.click();
      return this;
    }

    public collapseButtonClick(): CareerPathPage_New {
        collapseButton.click();
        return this;
    }
}
