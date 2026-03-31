// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { OrganizationTranslationPage } from "pages/admin/OrganizationTranslationPage";
import { CreateOrganizationPage } from "pages/admin/share/CreateOrganizationPage";
import { EditOrganizationPage } from "pages/admin/share/EditOrganizationPage";

export class HrDataOrganizationPage extends BasePage {

    public editOrganizationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Edit']");
    public addOrganizationButton: Locator = this.page.locator("//button[text()='Add Organization']");

    public searchInput: Locator = this.page.locator(".search__container__hr_data > input");

    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");
    public translationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Translation']");
    public organizationName: Locator = this.page.locator("tr.new-table-row > td:nth-of-type(2)");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickEditOrganizationButton(): EditOrganizationPage {
        editOrganizationButton.click();
        return this.getPageClassInstance(EditOrganizationPage);
    }

    public clickAddOrganizationButton(): CreateOrganizationPage {
        addOrganizationButton.click();
        return this.getPageClassInstance(CreateOrganizationPage);
    }

    public clickSearchOrganization(organizationName: string): HrDataOrganizationPage {
        searchInput.fill(organizationName);
        searchIcon.click();
        return this;
    }

    public clickTranslationButton(): OrganizationTranslationPage {
        translationButton.click();
        return this.getPageClassInstance(OrganizationTranslationPage);
    }
}
