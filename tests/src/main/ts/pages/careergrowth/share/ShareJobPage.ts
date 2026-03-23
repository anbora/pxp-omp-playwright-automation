import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { AbstractShareModalPage } from "pages/careergrowth/share/AbstractShareModalPage";

export class ShareJobPage extends AbstractShareModalPage<ShareJobPage> {

    public shareProjectModalHeader: Locator = modalHeader();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    protected thisReturnInstance(): ShareJobPage {

      return this;
    }

    public selectUserToShare(userName: string): ShareJobPage {

      return super.selectUserToShare(userName);

    }

    public enterShareMessage(sampleShareMessage: string): ShareJobPage {

      return super.enterShareMessage(sampleShareMessage);

    }

    public clickShare(): ShareJobPage {

      return super.clickShare();

    }

    public notifyIndividuals(): ShareJobPage {

      return super.markNotifyIndividuals();

    }
}
