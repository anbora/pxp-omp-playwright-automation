import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";

export class RemainingSkillsModalPage extends BasePage {

    public header: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/child::h1");
    public title: Locator = this.page.locator("//h3[@class='skills-modal-title']");
    public skill(skill: string): Locator {
      return this.getLocatorWithParam("//span[@class='skill-title'][text()='%s']", skill);
    }
    public checkIcon(skill: string): Locator {
      return this.getLocatorWithParam("//span[@class='skill-title'][text()='%s']/child::span[contains(@class, 'icon-check-circle-light')]", skill);
    }
    public closeButton: Locator = this.page.locator("//button[@aria-label='Close']");

	public closeModal(): VacanciesListPage_New {
        closeButton.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
