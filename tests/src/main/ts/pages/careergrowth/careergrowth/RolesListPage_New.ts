import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerGrowthCarouselComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthCarouselComponent";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthLeftMenuComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthLeftMenuComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { ShareRolePage } from "pages/careergrowth/share/ShareRolePage";

export class RolesListPage_New extends BasePage implements CareerGrowthTopPanelComponent<RolesListPage_New>,
        CareerGrowthCarouselComponent<RolesListPage_New>, CareerGrowthFiltersComponent<RolesListPage_New>,
        CareerGrowthLeftMenuComponent<RolesListPage_New> {

    public readonly allJobRolesHeader: Locator = this.page.locator("//h5[text()='All Job Roles']");
    public readonly recommendedRoleCounter: Locator = this.page.locator("//div[@class = 'role-carousel-header_left__title']/span[2]");
    public readonly manageRoles: Locator = this.page.locator("//button/span[text() = 'My Job Roles'] | //button/span[text() = 'Manage Job Roles'] | //button/span[text() = 'My Roles']");
    public readonly yourAspirationalRoleName: Locator = this.page.locator("//div[@class='aspirational-role-name']/div");
    public readonly viewDetailsOfAspirationalRoleLink: Locator = this.page.locator("//div[@class='aspirational-roles-carousel__details-content']/button");
    public itemOnAllRolesListByOrder(number: string): Locator {
      return this.getLocatorWithParam("//div[@class='all-roles-container']/descendant::div[@class='role-card__details'][%s]/div[1]", number);
    }
    public readonly allMoreActionsForRoleButtons: Locator = this.page.locator("//div[@class='all-roles-container']/descendant::div[contains(@class,'role-card-full')]/descendant::button[@aria-label='Actions for this suggestion']");
    public similarJobVacancyForRoleIcon(roleName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::a/parent::div/parent::div/descendant::div[@class='role-card__vacancy']", roleName);
    }
    public readonly numberOfYourAspirationalRoles: Locator = this.page.locator("//div[@class='supporting-text no-padding']/span");
    public recommendedRoleSkillIcon(roleTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-carousel-wrapper']/descendant::div[contains(@class, 'role-title')][text()='%s']/ancestor::div[contains(@class, 'role-card')]/descendant::div[@class='role-card__skills']/descendant::div[@class='role-card__skills__icon']/child::i", roleTitle);
    }
    public skillOnRoleCard(roleTitle: string, skill: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-carousel-wrapper']/descendant::div[contains(@class,'role-title')][text()='%s']/ancestor::div[contains(@class, 'role-card-full')]/descendant::li[@class='job-skill__skills__chip'][text()='%s']", roleTitle, skill);
    }
    public moreSkillsLinkOnRecommendedRoleCard(roleTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-carousel-wrapper']/descendant::div[contains(@class,'role-title')][text()='%s']/ancestor::div[contains(@class, 'role-card-full')]/descendant::li[@class='job-skill__skills--remaining']", roleTitle);
    }
    public recommendedRoleMatchLabel(roleTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'ed-carousel-container')]/descendant::div[contains(@class, 'role-title')][text()='%s']/ancestor::div[contains(@class, 'role-card')]/descendant::div[@class='matching-label']", roleTitle);
    }
    public markAsAspirationalFromCard: Locator = this.page.locator("//ul[@role='menu']/li[1]");
    public firstRoleFairMatch: Locator = this.page.locator("//ul/div[1]//div[@class='job-matching__details']/div[@class='matching-label']");
//    public Locator hoverShare = locator("//li[@class='footer-icon-wrapper']/button/div").build();
    public hoverMadeAspirational: Locator = locator("//div[@class='role-menu']/div/i").build();
//    public Locator hoverOverDismiss = locator("//button/i[@class='icon-ban']").build();
    public jobRoleLocation: Locator = locator(".role-location").build();
    public markedAsAspirationalRoleIdArrowIcon(roleId: string): Locator {
      return this.getLocatorWithParam("//div[@data-testid='%s']/descendant::i[@class='icon icon-bullseye-arrow active']", roleId);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public getP(): RolesListPage_New {

      return this;
    }

    public typeSearchValue(vacancyName: string): RolesListPage_New {

      return typeSearchValueWithWaitForElement(vacancyName, firstCard(), firstCard());

    }

    public clickManageRoles(): ManageRolePage {
        manageRoles.click();
        return this.getPageClassInstance(ManageRolePage);
    }

//    public RolesListPage_New waitUntilDismissedRoleButtonVisibleForFirstRole(String sortValue) {
//        repeatUntilElementToBeVisible(
//                () => sortListBy(sortValue),
//                dismissButton(),
//                20,
//                5000,
//                () => this.page.reload()
//        );
//        return this;
//    }

    public markFirstSuggestedRoleAsAspirational(): RolesListPage_New {
        this.moreActionButtonForCard().first().click();
        markAsAspirationalFromCard.click();
        this.pause(2000);
        return this;
    }

    public markFirstRoleAsAspirational(): RolesListPage_New {
        this.moreActionButtonForCard().first().click();
        markAsAspirationalFromCard.click();
        this.pause(2000);
        return this;
    }

    public clickShareInContextOfFirstAvailableRoleAndStoreItsId(resultContainer: ResultContainer): ShareRolePage {
        resultContainer.setValue(firstCardName().getAttribute("data-testid"));
        this.shareButton().click();
        return this.getPageClassInstance(ShareRolePage);
    }

    public getFirstYourAspirationalRole(roleName: ResultContainer): RolesListPage_New {
        roleName.setValue(yourAspirationalRoleName.textContent());
        return this;
    }

    public viewDetailsOfAspirationalRole(): RoleDetailsPage {
        viewDetailsOfAspirationalRoleLink.click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public clickSpecifiedRoleByOrder(number: string): RoleDetailsPage {
        this.itemOnAllRolesListByOrder(number).click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public performActionForRoleNumber(order: string, action: string): RolesListPage_New {
        this.moreActionButtonForCard().first().click();
        this.moreActionsPopperOption(action).click();
        this.pause(2000);
        return this;
    }

    public removeAspirationalRoleIfExist(): RolesListPage_New {
//        cy.wait(5000)
        allMoreActionsForRoleButtons.first().click();
//        moreActionsPopperOption('Remove as aspirational Role')
//        cy.wait(1000)
        return this;
    }

    public waitForRoleMarkedAsAspirationalSuggestionById(roleId: string): RolesListPage_New {
        this.repeatUntilElementToBeVisible(() => {
        }, markedAsAspirationalRoleIdArrowIcon(roleId), 20, 10000, () => refreshCurrentPage(RolesListPage_New));
        return this;
    }

    public waitForRoleMarkedAsAspirationalSuggestionByIdIsNotVisible(roleId: string): RolesListPage_New {
        this.repeatUntilElementToBeNotVisible(() => {
        }, markedAsAspirationalRoleIdArrowIcon(roleId), 20, 10000, () => refreshCurrentPage(RolesListPage_New));
        return this;
    }

    public getAllRecommendedJobRolesWhichContainsTitle(jobRoleList: ResultContainer, partOfTitle: string): RolesListPage_New {
        let counter: number = Integer.parseInt(recommendedRoleCounter.textContent().replace("(", "").replace(")", ""));
        let listOfJobRoles: any = new ArrayList();
        for (int i = 1; i <= counter; i++) {
//            String recommendedRoleName = cardName(i).first().textContent();
//            if (recommendedRoleName.contains(partOfTitle)) {
//                listOfJobRoles.add(recommendedRoleName);
//            }
        }
        jobRoleList.setListValue(listOfJobRoles);
        return this;
    }

    public hoverOverShare(): RolesListPage_New {
        this.shareButton().hover();
        return this;
    }

    public hoverOverMarkedAsAspirational(): RolesListPage_New {
        hoverMadeAspirational.first().hover();
        return this;
    }

    public clickSortByButton(): RolesListPage_New {

      return this;
    }

    public clickActionsButtonJobRoles(): RolesListPage_New {

      return this;
    }

    public clickJobRoleCardDetails(roleName: string): RoleDetailsPage {
        this.cardName(roleName).first().click();
        return this.getPageClassInstance(RoleDetailsPage);
    }
}
