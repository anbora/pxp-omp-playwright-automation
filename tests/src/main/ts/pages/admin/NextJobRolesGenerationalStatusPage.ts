import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class NextJobRolesGenerationalStatusPage extends BasePage {
    public searchInput: Locator = this.page.locator("div[role='document'] .search__input");

    public searchIcon: Locator = this.page.locator(".search-spacing .icon-fontello-search");

    public closeButton: Locator = this.page.locator("//button[contains(text(),'Close')]");
    public nextRoleGenerationalStatusResults: Locator = this.page.locator(".table-sticky-header .table-responsive");
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public clickSearchJobRole(roleName: string): NextJobRolesGenerationalStatusPage {
        searchInput.fill(roleName);
        searchIcon.click();
        return this;
    }

    public clickCloseButton(): HrDataJobRolesPage {
        closeButton.click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }

}
