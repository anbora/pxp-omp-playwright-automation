import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { RolesAdminPage } from "pages/admin/roles/RolesAdminPage";
import { AddUserModalPage } from "pages/admin/users/AddUserModalPage";

export class UsersAdminPage extends BasePage {

    private static readonly ACCOUNTS_USERS_ROW: string = "tbody";
    private static readonly ROLES_MODAL: string = ".modal-dialog";
    public emptyListLabel: Locator = this.page.locator("td.textCenter");
    public userEmailInTable(email: string): Locator {
      return this.getLocatorWithParam("//tr[@class = 'new-table-row']/td[text() = '%s']", email);
    }
    private addUsersButton: Locator = this.page.locator("//button[text() = 'Add Users']");
    private deleteUserButton: Locator = this.page.locator("//button[text() = 'Delete User']");
    private yesButtonForDeletion: Locator = this.page.locator("//button[text() = 'Yes']");
    private searchInput: Locator = this.page.locator("div.search__container_users input.search__input");
    private userCheckbox(fullName: string): Locator {
      return this.getLocatorWithParam("input[aria-label = 'Select user %s']", fullName);
    }
    public submenu(menu: string): Locator {
      return this.getLocatorWithParam("//li[contains(@class, 'open')]/descendant::span[text()='%s']/parent::a", menu);
    }
    public checkRoleForSearchedUser(): Locator {
      return this.aiLocator(ACCOUNTS_USERS_ROW, "//tr[1]/td/a[text()='Role']");
    }
    public currentRolesField(): Locator {
      return this.aiLocator(ROLES_MODAL, "//div/h4[text()='Current Roles']/parent::div/div");
    }
    public closeRolesModal(): Locator {
      return this.aiLocator(ROLES_MODAL, "//div/button[@class='close']");
    }
    public editButton(user: string): Locator {
      return this.getByLabel("Edit User: "+user).build();
    }
    public userManagementLocation(): Locator {
      return this.getByLabel("Edit user", true).getByText("Location", true ).build();
    }
    public cancelButton: Locator = getByRole(AriaRole.BUTTON, "Cancel").build();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddUsersButton(): AddUserModalPage {
        addUsersButton.click();
        return this.getPageClassInstance(AddUserModalPage);
    }

    public fillInSearchInput(value: string): UsersAdminPage {
        searchInput.fill(value);
        return this;
    }

    public clickUserCheckBox(fullName: string): UsersAdminPage {
        this.userCheckbox(fullName).click();
        return this;
    }

    public clickDeleteUserButton(): UsersAdminPage {
        deleteUserButton.click();
        return this;
    }

    public clickYesForDeletionConfirmation(): UsersAdminPage {
        yesButtonForDeletion.click();
        this.pause(10000);
        return this;
    }

    public checkUserRole(): UsersAdminPage {
        this.checkRoleForSearchedUser().click();
        return this;
    }

    public clickCloseRolesModalButton(): UsersAdminPage {
        this.closeRolesModal().click();
        return this;
    }

    public openRolesPage(): RolesAdminPage {
        this.submenu("Roles").click();
        return this.getPageClassInstance(RolesAdminPage);
    }

    public editUser(user: string): UsersAdminPage {
        this.editButton(user).click();
        this.pause(2000);
        return this;
    }

    public clickCancel(): UsersAdminPage {
        cancelButton.click();
        this.pause(2000);
        return this;
    }
}
