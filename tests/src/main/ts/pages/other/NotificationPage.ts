import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class NotificationPage extends BasePage {
  static pageModel = { pageName: "Notification Page", url: "/notifications" };

    public noNotificationLabel: Locator = this.page.locator("div.notification-wrapper div.no-notification-msg");
    public notificationMessage: Locator = this.page.locator("div.notification-card p");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public <T extends BasePage> clickFirstNotificationInRecentUpdatesWidget(clazz: Class<T>): T {
        notificationMessage.first().click();
        return this.getPageClassInstance(clazz);
    }
}
