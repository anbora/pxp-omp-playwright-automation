import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";

export class EditJobDiscardChangesModalPage extends BasePage {

    private readonly cancelButton: Locator = this.page.locator("//button[@aria-label='Cancel']");
    private readonly discardButton: Locator = this.page.locator("//button[@aria-label='Discard']");
    private modalHeader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public <T extends BasePage> clickDiscardButton(clazz: Class<T>): T {
        discardButton.click();
        return this.getPageClassInstance(clazz);
    }

	public clickCancelButton(): EditJobVacancyPage {
        cancelButton.click();
        return this.getPageClassInstance(EditJobVacancyPage);
    }
}
