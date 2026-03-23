import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";

export class ManageRolePage extends BasePage {

    public rolesList: Locator = this.page.locator("div.role-card_header > div.role-title");
    public rolesByID(roleId: string): Locator {
      return this.getLocatorWithParam("//div[@data-testid='%s']", roleId);
    }
    public firstRoleOnTheList: Locator = this.page.locator("//a[contains(@class, 'role-title')]");
    public dismissButton: Locator = this.page.locator("//i[@class='icon-ban']/parent::button");
    public undismissButton: Locator = this.page.locator("//i[@class='icon-ban']/parent::button");
    public dismissRoleIdButton(roleId: string): Locator {
      return this.getLocatorWithParam("//div[@data-testid='%s']/descendant::i[@class='icon-ban']/parent::button", roleId);
    }
    public leftMenutab(tabName: string): Locator {
      return this.getLocatorWithParam("//ul[contains(@class, 'left-navigation')]/descendant::button[text() = '%s']", tabName);
    }
    public selectedTab(tabName: string): Locator {
      return this.getLocatorWithParam("//button[text() ='%s'][contains(@class,'selected')]", tabName);
    }
    public roleMarkedAsDismissed(roleId: string): Locator {
      return this.getLocatorWithParam("//div[@data-testid='%s']/descendant::i[@class='icon-ban']/parent::button", roleId);
    }
    public noJobVacanciesToShowInfo(info: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm-opportunities__no-data']/child::div[@class='icon-area']/following-sibling::div[1]", info);
    }
    public moreActionsForRoleButton: Locator = this.page.locator("//div[@class = 'role-card__details']/descendant::button");
    public moreActionsPopperOption(action: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'role-card-popper')]/descendant::li[text()='%s']", action);
    }
    public markedAsAspirationalRoleIdArrowIcon(roleId: string): Locator {
      return this.getLocatorWithParam("//div[@data-testid='%s']/descendant::i[@class='icon icon-bullseye-arrow active']", roleId);
    }
    public exploreRolesButton: Locator = this.page.locator("//button[@id='Explore Job Roles']");
    public viewMessage: Locator = this.page.locator(".view-messages-btn");
    public viewMessageLink(roleId: string): Locator {
      return this.getLocatorWithParam("div[data-testid='%s'] .view-messages-btn", roleId);
    }
    public message: Locator = this.page.locator(".view-message-modal-container-user-info-message>p");
    public closeButton: Locator = this.page.locator(".view-message-modal button.ed-btn-neutral");
    public searchResults: Locator = this.page.locator("//div[@class='my-opportunities__container']");

	public selectLeftMenuTab(tabName: string): ManageRolePage {
        this.leftMenutab(tabName).click();
        return this;
    }

	public clickDismissFirstRole(): ManageRolePage {
        dismissButton.first().click();
        return this;
    }

	public clickUnDismissFirstRole(): ManageRolePage {
        undismissButton.first().click();
        return this;
    }

	public clickDismissInAllRoles(): ManageRolePage {
        dismissButton.all().forEach(Locator::click);
//        cy.wait(2000)
        return this;
    }

	public clickDismissRoleId(roleId: string): ManageRolePage {
        this.dismissRoleIdButton(roleId).first().click();
//        cy.wait(1500)
        return this;
    }

	public getDismissedRoleNumber(roleNumber: ResultContainer): ManageRolePage {
        roleNumber.setValue(rolesList.first().textContent());
        return this;
    }

	public getFirstDismissedRoleTitle(roleNumber: ResultContainer): ManageRolePage {
        roleNumber.setValue(firstRoleOnTheList.first().textContent());
        return this;
    }

	public clickMoreActionsButton(): ManageRolePage {
        moreActionsForRoleButton.first().click();
        return this;
    }

	public performActionForRole(action: string): ManageRolePage {
        this.clickMoreActionsButton();
        this.moreActionsPopperOption(action).click();

        return this;
    }

	public clickExploreRoles(): RolesListPage_New {
        exploreRolesButton.click();
        return this.getPageClassInstance(RolesListPage_New);
    }

	public refreshPage(): ManageRolePage {
        this.page.reload();
        return this;
    }

	public refreshPageUntilRoleFound(role: string): ManageRolePage {
        this.repeatUntilElementToBeVisible(() => {
        }, firstRoleOnTheList, 10, 10000, () => this.page.reload());
        return this;
    }

    public clickViewMessage(): ManageRolePage {
        viewMessage.first().click();
        return this;
    }

    public clickViewMessage(roleId: string): ManageRolePage {
        this.viewMessageLink(roleId).click();
        return this;
    }

    public closeMessageModal(): ManageRolePage {
        closeButton.click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public waitForRole(roleId: string): ManageRolePage {
        this.repeatUntilElementToBeVisible(() =>{}, rolesByID(roleId),20, 2000, this::refreshPage);
        return this;
    }
}
