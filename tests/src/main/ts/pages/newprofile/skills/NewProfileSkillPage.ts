import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { AbstractMePage } from "pages/me/share/AbstractMePage";

export class NewProfileSkillPage extends AbstractMePage<NewProfileSkillPage> {

    public headerOfSection(sectionName: string): Locator {

      return this.getLocatorWithParam("//h3[contains(text(), '%s')]", sectionName);

    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
