// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, WaitForSelectorState } from "common/testing/playwright";

export class AddCertificateModalPage extends BasePage {
  static pageModel = { pageName: "Add Certificate Page", url: "/me/skills-passport" };

    private readonly certificateInput: Locator = this.page.locator("//input[@value='certificate']");
    private readonly certificateInputName: Locator = this.page.locator("#certificate-name");
    private badgeLevel: Locator = this.page.locator("#skill_level");
    private readonly certificateIssuer: Locator = this.page.locator("#certificate-issuer");
    private readonly certificateID: Locator = this.page.locator("//input[@id='certificate-id']");

    private readonly certificateCardID: Locator = this.page.locator("//div[@class='input-group']/descendant::input[contains(@id, 'certificate-id')]");
    private readonly certificateURL: Locator = this.page.locator("//input[@id='certificate-url']");
    private readonly editButton: Locator = this.page.locator("//button[@aria-label='Edit']");
    private readonly saveButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[text()='Save']");
    public certificateCard: Locator = this.page.locator(".certificate-carousel .ed-carousel-wrapper");

    public certificateCardName: Locator = this.page.locator("//h5[@class='header-title text-ellipsis'][not(@hidden)]");

    private readonly confirmButton: Locator = this.page.locator ("//div[@class='ed-dialog-modal-footer ']/button[text()='Confirm']");
    private readonly deleteButton: Locator = this.page.locator("//button[@aria-label='Delete']");
    private readonly confirmDeleteButton: Locator = this.page.locator("//button[text()='Confirm']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectCertificateType(): AddCertificateModalPage {
        certificateInput.click();
        return this;
    }

    public selectCertificateFromInput(badge: string): AddCertificateModalPage {
        certificateInputName.fill(badge);
        return this;
    }

    public selectCertificateLevel(level: string): AddCertificateModalPage {
        badgeLevel.selectOption(level);
        return this;
    }

    public selectCertificateIssuerFromInput(issuerName: string): AddCertificateModalPage {
        certificateIssuer.fill(issuerName);
        return this;
    }

    public selectCertificateIDFromInput(iDNumber: string): AddCertificateModalPage {
        certificateID.first().waitFor(new Locator.WaitForOptions().setTimeout(3000).setState(WaitForSelectorState.VISIBLE));
        certificateID.fill(iDNumber);
        return this;
    }

    public selectCertificateURLFromInput(siteName: string): AddCertificateModalPage {
        certificateURL.fill(siteName);
        return this;
    }

    public clickSaveButton(): AddCertificateModalPage {
        saveButton.click();
        saveButton.waitFor(new Locator.WaitForOptions().setTimeout(3000).setState(WaitForSelectorState.HIDDEN));
        return this;
    }

    public clickCertificateCard(): AddCertificateModalPage {
        this.pause(3000);
        certificateCard.click();
        return this;
    }

    public clickEditButton(): AddCertificateModalPage {
        editButton.click();
        return this;
    }

    public clickDeleteButton(): AddCertificateModalPage {
        deleteButton.click();
        return this;
    }

    public clickConfirmButton(): AddCertificateModalPage {
        confirmDeleteButton.click();
        return this;
    }
}
