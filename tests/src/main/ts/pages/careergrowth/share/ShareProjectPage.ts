import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { AbstractShareModalPage } from "pages/careergrowth/share/AbstractShareModalPage";

export class ShareProjectPage extends AbstractShareModalPage<ShareProjectPage> {

    public shareProjectModalHeader: Locator = modalHeader();
    public individualsTab: Locator = this.page.locator("//ul[@class='tabs']//li[1]");
    public groupsTab: Locator = this.page.locator("//ul[@class='tabs']//li[2]");
    public shareModalShareButton: Locator = shareButton;
    public shareSuccessToasterMessage: Locator = super.shareSuccessToasterMessage;

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    protected thisReturnInstance(): ShareProjectPage {

      return this;
    }

    public selectUserToShare(userName: string): ShareProjectPage {

      return super.selectUserToShare(userName);

    }

    public enterShareMessage(sampleShareMessage: string): ShareProjectPage {

      return super.enterShareMessage(sampleShareMessage);

    }

    public clickShare(): ShareProjectPage {

      return super.clickShare();

    }
}
