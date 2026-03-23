import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";

export abstract class AbstractShareModalPage<T extends AbstractShareModalPage> extends BasePage {

    public modalHeader(): Locator {

      return this.locator(".ed-dialog-modal-header").getByRole(AriaRole.HEADING).build().first();

    }
    public searchTextField: Locator = this.page.locator(".ed-share-content-modal .ed-search input");
    public selectUserCheckBox(userName: string): Locator {
      return this.getLocatorWithParam("//span[contains(text(), '%s')]/ancestor::div[contains(@id, 'row-name')]/descendant::input", userName);
    }
    public shareModalMessageInputBox: Locator = this.page.locator("#share-modal-message");
    public shareButton: Locator = this.page.locator("//div[@class='tab-wrapper']//following-sibling::div[@class='ed-dialog-modal-footer ']//button[@class='ed-btn ed-btn-primary' and text()='Share']");
    public shareSuccessToasterMessage: Locator = this.page.locator("//div[@class='success']//span[text()='You have successfully shared']");
    public notifyIndividualsCheckbox: Locator = this.page.locator("//input[translate(@aria-label, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='notify individuals']");

    abstract protected T thisReturnInstance();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectUserToShare(userName: string): T {
        searchTextField.clear();
        searchTextField.fill(userName);
        this.selectUserCheckBox(userName).click();
//        repeatUntilElementToBeVisible(() => searchTextField.fill(userName), selectUserCheckBox(userName), 5, 2000, () =>searchTextField.clear());
        this.page.waitForLoadState();
        return this.thisReturnInstance();
    }

    public enterShareMessage(sampleShareMessage: string): T {
        shareModalMessageInputBox.clear();
        shareModalMessageInputBox.fill(sampleShareMessage);
        return this.thisReturnInstance();
    }

    public clickShare(): T {
        shareButton.click();
        return this.thisReturnInstance();
    }

    public markNotifyIndividuals(): T {
        notifyIndividualsCheckbox.click();
        return this.thisReturnInstance();
    }

    public waitForNotificationToBeSend(): T {
        this.pause(10000);
        return this.thisReturnInstance();
    }
}
