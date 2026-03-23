import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";

export class SettingsAnnouncementsPage extends BasePage {

    public announcementTitle: Locator = this.page.locator("//div[contains(@class, 'bootstrap-switch-on')]/parent::td/preceding-sibling::td/span");
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public getFirstEnabledAnnouncementTitle(announcementTitleContainer: ResultContainer): SettingsAnnouncementsPage {
        announcementTitleContainer.setValue(announcementTitle.first().textContent());
        return this;
    }
}
