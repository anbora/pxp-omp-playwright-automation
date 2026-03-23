import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class RolesAdminPage extends BasePage {

    private addRoleButton: Locator = this.page.locator(".new-button");
    private nextButton: Locator = this.page.locator("//ul[contains(@class, 'pagination')]/descendant::span[text() = '›']/parent::a");
    private editRole(roleName: string): Locator {
      return this.getLocatorWithParam("//td[normalize-space(text()) = '%s']/parent::tr/descendant::i[@title = 'Edit']/parent::a", roleName);
    }
    private deleteRole(roleName: string): Locator {
      return this.getLocatorWithParam("//td[normalize-space(text()) = '%s']/parent::tr/descendant::i[@title = 'Delete']/parent::a", roleName);
    }
    private closeButton: Locator = this.page.locator("//button[text() = 'Close']");
    private saveButton: Locator = this.page.locator("//button[text() = 'Save']");
    private userDropdownButton: Locator = this.page.locator(".header__right-block #user-dropdown");
    public checkboxPermission(permissionName: string): Locator {
      return this.getLocatorWithParam("//label[text() = '%s']/input", permissionName);
    }
    public helpSection: Locator = this.page.locator("//div[@class = 'header__right-block']/descendant::a[@role = 'menuitem'][text() = 'Help']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddNewRole(): RolesAdminPage {
        addRoleButton.click();
        return this;
    }

    public clickEditRole(roleName: string): RolesAdminPage {
        let role: Locator = editRole(roleName);
        if (isVisible(role)) {
            role.click();
        } else {
            if (isVisible(nextButton)) {
                nextButton.click();
                this.clickEditRole(roleName);
            }
        }
        return this;
    }

    public clickCloseButton(): RolesAdminPage {
        closeButton.click();
        return this;
    }

    public clickUserDropdownButton(): RolesAdminPage {
        userDropdownButton.click();
        return this;
    }

    public turnOnPermission(permissionName: string): RolesAdminPage {
        if (!checkboxPermission(permissionName).isChecked()) {
            this.checkboxPermission(permissionName).click();
        }
        return this;
    }

    public turnOffPermission(permissionName: string): RolesAdminPage {
        if (checkboxPermission(permissionName).isChecked()) {
            this.checkboxPermission(permissionName).click();
        }
        return this;
    }

    public clickSaveButton(): RolesAdminPage {
        saveButton.click();
        return this;
    }
}
