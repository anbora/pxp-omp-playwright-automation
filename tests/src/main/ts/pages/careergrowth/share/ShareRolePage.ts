// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser } from "common/testing/playwright";
import { AbstractShareModalPage } from "pages/careergrowth/share/AbstractShareModalPage";

export class ShareRolePage extends AbstractShareModalPage<ShareRolePage> {

    protected thisReturnInstance(): ShareRolePage {

      return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectUserToShare(userName: string): ShareRolePage {

      return super.selectUserToShare(userName);

    }

    public enterShareMessage(sampleShareMessage: string): ShareRolePage {

      return super.enterShareMessage(sampleShareMessage);

    }

    public notifyIndividuals(): ShareRolePage {

      return super.markNotifyIndividuals();

    }
}
