import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class SkillStudioPopup extends GlobalNavigationPage {

    public selectorForWait: Locator = this.page.locator("//div[text()='Skills Studio']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
        super(this.browser, this.pageHandler, this.logger, this.portalIndex);
        selectorForWait.waitFor(new Locator.WaitForOptions().setTimeout(60000));
    }

    public <T extends BasePage> getPageClass(clazz: Class<T>): T {

      return this.getPageClassInstance(clazz);

    }
}
