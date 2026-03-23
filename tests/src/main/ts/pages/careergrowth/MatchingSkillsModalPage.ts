import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { AddToSkillsPassportModalPage } from "pages/careergrowth/AddToSkillsPassportModalPage";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";

export class MatchingSkillsModalPage extends BasePage {

    public matchingSkillColumn(skillLabel: string, columnNumber: number): Locator {

      return this.getLocatorWithParam("//p[text()='%s']/ancestor::tr/td[%s]//p", skillLabel, String.valueOf(columnNumber));

    }
    public addSkillsFromMatchingLink: Locator = this.page.locator(".ed-dialog-modal-header .ed-link-secondary i");
    public closeIcon: Locator = this.page.locator("button.ed-dialog-modal-header-close-button");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddSkillsToPassportFromMatchingModal(): AddToSkillsPassportModalPage {
        addSkillsFromMatchingLink.click();
        return this.getPageClassInstance(AddToSkillsPassportModalPage);
    }

    public clickCloseIcon(): JobVacancyDetailsPage {
        closeIcon.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public <T extends BasePage> clickCloseIcon(clazz: Class<T>): T {
        closeIcon.click();
        return this.getPageClassInstance(clazz);
    }
}
