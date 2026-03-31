// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";

export class ConfirmDeleteModalPage extends BasePage {

    public confirmButton: Locator = this.getByRole(AriaRole.DIALOG).getByRole(AriaRole.BUTTON, "Confirm", true);

	public clickConfirm(): SkillsPassportMePage {
        confirmButton.click();
        return this.getPageClassInstance(SkillsPassportMePage);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
