import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class NewProfileOrganizationTreeModalPage extends BasePage {

    public organizationTree: Locator = this.page.locator("//button[@class='organization-tree-member-info-user-name']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
