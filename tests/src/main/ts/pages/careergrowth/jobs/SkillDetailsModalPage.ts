import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";

export class SkillDetailsModalPage extends BasePage {

    public cancelButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button");
    public modalTitle(modalTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-dialog-modal-header']/h2[contains(text(), '%s')]", modalTitle);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

	public clickCancelButton(): VacanciesListPage_New {
        cancelButton.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }
}
