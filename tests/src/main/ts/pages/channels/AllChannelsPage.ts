import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser } from "common/testing/playwright";

export class AllChannelsPage extends BasePage {
  static pageModel = { pageName: "Channel details page", url: "/channels/all" };

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

}
