// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { AbstractMePage } from "pages/me/share/AbstractMePage";

export class NewProfileFollowingModalPage extends BasePage {

    public followingNameIcon(text: string): Locator {

      return this.getByLabel(text);

    }
    public followerNameIcon(text: string): Locator {
      return followingNameIcon(text);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
