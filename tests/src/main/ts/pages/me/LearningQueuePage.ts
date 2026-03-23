import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class LearningQueuePage extends BasePage {

    public bookmarkedButton: Locator = this.page.locator("//button[text() = 'Bookmarked']");
    public learningTitle: Locator = this.page.locator("p.ip-title");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickBookmarkedTab(): LearningQueuePage {
        bookmarkedButton.click();
        return this;
    }
}
