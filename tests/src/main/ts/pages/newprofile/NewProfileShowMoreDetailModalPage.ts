// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";

export class NewProfileShowMoreDetailModalPage extends BasePage {

    public privateToYouSwitch: Locator = this.getByLabel("Private to you");
    public closeModalButton: Locator = this.page.locator("#ed-dialog-modal-header-close-button");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickPrivateToYouSwitch(): NewProfileShowMoreDetailModalPage {
        privateToYouSwitch.click();
        return this;
    }

    public closeShowMoreDetailModal(): NewProfilePage {
        closeModalButton.click();
        return this.getPageClassInstance(NewProfilePage);
    }
}
