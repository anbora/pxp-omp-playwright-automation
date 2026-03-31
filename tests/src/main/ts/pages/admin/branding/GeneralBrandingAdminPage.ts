// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class GeneralBrandingAdminPage extends BasePage {
    public readonly removeBannerButton: Locator = this.page.locator(".delete-icon .pointer");
    public readonly uploadFileButton: Locator = this.page.locator("//div[contains(@class, 'user-branding-section-container')]/descendant::button[@class='upload-image']");
    public readonly saveButton: Locator = this.page.locator("//div[contains(@class, 'user-branding-section-container')]/descendant::button[@class='save-btn']");
    public readonly deleteButtonForUploadedFile: Locator = this.page.locator("//div[@class='delete-icon']/descendant::span[@class='filename-wrap']");
    public readonly allowUsersToModifyBannerToggle: Locator = this.page.locator("//div[@class='branding-toggle']/descendant::div[@class='react-switch-handle']");
    public readonly altTextTextarea: Locator = this.page.locator("//textarea[@id='alt-text']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
    public clickUploadFileButton(): GeneralBrandingAdminPage {
        uploadFileButton.click();
        return this;
}
    public uploadBannerImage(filePath: string): GeneralBrandingAdminPage {
      return uploadBannerImage(filePath, removeBannerButton, GeneralBrandingAdminPage);
    }

    public clickSaveChangesButton(): GeneralBrandingAdminPage {
        saveButton.click();
        this.pause(DEFAULT_TIMEOUT);
        return this;
    }

    public switchAllowUsersToModifyBannerToggle(): GeneralBrandingAdminPage {
        allowUsersToModifyBannerToggle.click();
        return this;
    }

    public fillInAltText(altText: string): GeneralBrandingAdminPage {
        altTextTextarea.clear();
        altTextTextarea.fill(altText);
        return this;
    }

    public clickRemoveBannerButton(): GeneralBrandingAdminPage {
        if (isVisible(removeBannerButton)) removeBannerButton.click();
        return this;
    }
}
