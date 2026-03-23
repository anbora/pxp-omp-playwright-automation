import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class CreateProjectMePage extends ProjectsMePage {

    public publishButton: Locator = this.page.locator("//div[@class='projects-footer-actions']/button[text()='Publish']");
    public maybeLaterButton: Locator = this.page.locator("//div[@role='dialog']//button[@class='ed-btn ed-btn-neutral']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickPublishButton(): CreateProjectMePage {
        publishButton.click();
        return this;
    }

    public clickMaybeLaterButton(): CreateProjectMePage {
        maybeLaterButton.click();
        return this;
    }
}
