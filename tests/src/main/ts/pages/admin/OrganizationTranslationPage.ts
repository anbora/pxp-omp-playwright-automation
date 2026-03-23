import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";

export class OrganizationTranslationPage extends BasePage {

    public language: Locator = this.page.locator("//div[@class='css-1hwfws3']");
    public dropdownSelect: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");
    public organizationName: Locator = this.page.locator("div:nth-of-type(3) > input");

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickTranslationDropdown(): OrganizationTranslationPage {
        this.pause(2000);
        language.click();
        dropdownSelect.click();
        this.pause(2000);
        return this;
    }
    public typeEnterOrganizationName(OrganizationName: string): OrganizationTranslationPage {
        organizationName.click();
        organizationName.fill(OrganizationName);
        return this;
    }
    public clickSaveButton(): HrDataOrganizationPage {
        this.pause(2000);
        saveButton.click();
        this.pause(2000);
        return this.getPageClassInstance(HrDataOrganizationPage);
    }
}
