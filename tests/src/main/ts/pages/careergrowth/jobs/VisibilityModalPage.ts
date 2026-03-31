// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";

export class VisibilityModalPage extends BasePage {

    public visibilityInput(visibilityType: string): Locator {

      return this.getLocatorWithParam("//input[@value='%s']", visibilityType);

    }
    public saveChangesButton: Locator = this.page.locator("//button[text()='Save Changes']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public setVisibility(visibility: string): VisibilityModalPage {
        this.visibilityInput(visibility).click();
        return this;
    }

	public saveChanges(): SkillsPassportMePage {
        saveChangesButton.click();
        return this.getPageClassInstance(SkillsPassportMePage);
    }
}
