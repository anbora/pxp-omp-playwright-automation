// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";
import { AbstractOrganizationModalPage } from "pages/admin/share/AbstractOrganizationModalPage";

export class EditOrganizationPage extends AbstractOrganizationModalPage<EditOrganizationPage> {

    public inactiveButton: Locator = this.page.locator(".org-form .radio:nth-child(2) label");
    public deactivationWarning: Locator = this.page.locator(".modal-body");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    protected thisReturnInstance(): EditOrganizationPage {

      return this;
    }

    public enterOrganizationName(OrganizationName: string): EditOrganizationPage {

      return super.enterOrganizationName(OrganizationName);

    }

    public clickSaveButton(): HrDataOrganizationPage {

      return super.saveButton();

    }

    public clickInactiveButton(): EditOrganizationPage {
        inactiveButton.click();
        return this.getPageClassInstance(EditOrganizationPage);
    }
}
