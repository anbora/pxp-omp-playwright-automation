import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";

export abstract class AbstractOrganizationModalPage <T extends AbstractOrganizationModalPage> extends BasePage {

    public organizationNameField: Locator = this.page.locator("//html//input[@id='OrgTitle']");
    public saveButton: Locator = this.page.locator("//button[text()='Save']");

    abstract protected T thisReturnInstance();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public enterOrganizationName(OrganizationName: string): T {
        organizationNameField.click();
        organizationNameField.fill(OrganizationName);
        return this.thisReturnInstance();
    }

    public saveButton(): HrDataOrganizationPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataOrganizationPage);
    }
}
