import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, WaitForSelectorState } from "common/testing/playwright";

export class AddEditBadgeModalPage extends BasePage {
  static pageModel = { pageName: "Add Badge Page", url: "/me/skills-passport" };
    private readonly badgeInputName: Locator = this.page.locator("#badge-name");

    private readonly badgeInput: Locator = this.page.locator("//input[@value='badge']");
    private badgeLevel: Locator = this.page.locator("#skill_level");
    private readonly badgeIssuer: Locator = this.page.locator("#badge-issuer");
    private readonly badgeID: Locator = this.page.locator("#badge-id");
    private readonly badgeURL: Locator = this.page.locator("#badge-url");
    public badgeCard: Locator = this.page.locator("//div[@class='badge-card justflex pointer']");

    public badgeDetails: Locator = this.page.locator("//div[@class='badge-details']");
    private readonly editBadgeButton: Locator = this.page.locator ("//button[@aria-label='Edit']");
    private readonly confirmButton: Locator = this.page.locator ("//div[@class='ed-dialog-modal-footer ']/button[text()='Confirm']");
    private readonly saveButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[text()='Save']");
    private readonly deleteBadgeButton: Locator = this.page.locator ("//button[@aria-label='Delete']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public addBadgeTitle(name: string): AddEditBadgeModalPage {
        badgeInputName.fill(name);
        return this;
    }

    public selectBadgeLevel(level: string): AddEditBadgeModalPage {
        badgeLevel.selectOption(level);
        return this;
    }
    public selectBadgeIssuerFromInput(issuerName: string): AddEditBadgeModalPage {
        badgeIssuer.fill(issuerName);
        return this;
    }

    public selectBadgeIDFromInput(iDNumber: string): AddEditBadgeModalPage {
        badgeID.first().waitFor(new Locator.WaitForOptions().setTimeout(3000).setState(WaitForSelectorState.VISIBLE));
        badgeID.fill(iDNumber);
        return this;
    }

    public selectBadgeURLFromInput(siteName: string): AddEditBadgeModalPage {
        badgeURL.fill(siteName);
        return this;
    }

    public clickBadgeCard(): AddEditBadgeModalPage {
        this.pause(3000);
        badgeCard.click();
        return this;
    }

    public editBadgeCard(): AddEditBadgeModalPage {
        editBadgeButton.click();
        return this;
    }

    public clickSaveButton(): AddEditBadgeModalPage {
        saveButton.click();
        saveButton.waitFor(new Locator.WaitForOptions().setTimeout(3000).setState(WaitForSelectorState.HIDDEN));
        return this;
    }

    public clickDeleteButton(): AddEditBadgeModalPage {
        deleteBadgeButton.click();
        return this;
    }

    public clickConfirmButton(): AddEditBadgeModalPage {
        confirmButton.click();
        return this;
    }
}
