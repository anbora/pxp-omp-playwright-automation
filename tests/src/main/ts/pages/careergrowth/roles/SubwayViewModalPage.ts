import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";

export class SubwayViewModalPage extends BasePage {
  static pageModel = { pageName: "Recommended career path modal", url: "" };

    public header: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']");
    public statusIcon: Locator = this.page.locator("//span[contains(@class,'status-icon--big icon-exclamation-circle')]");
    public statusMessage: Locator = this.page.locator("//span[@class='status-message__text']");
    public statusMessageDescription: Locator = this.page.locator("//span[@class='status-message__text']/following-sibling::span");
    public subwayViewDescription: Locator = this.page.locator("//div[@class='cp-subway-view__description']");
    public userRoleName: Locator = this.page.locator("//div[@class='cp-user-role__name']/child::div");
    public path(number: string): Locator {
      return this.getLocatorWithParam("//*[@id='path_nr_%s']", number);
    }
    public roleName: Locator = this.page.locator("//div[@class='cp-role-pill__name']/child::div");
    public closeButton: Locator = this.page.locator("//button[@aria-label='Close']");

    public clickCloseButton(): RoleDetailsPage {
        closeButton.click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
