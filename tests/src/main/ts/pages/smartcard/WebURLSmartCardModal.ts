import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser } from "common/testing/playwright";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class WebURLSmartCardModal extends CreateSmartCardModal {

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
