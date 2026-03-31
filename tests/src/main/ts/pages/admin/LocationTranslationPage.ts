// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";

export class LocationTranslationPage extends BasePage {

    public language: Locator = this.page.locator("//div[@class='css-1hwfws3']");
    public dropdownSelect: Locator = this.page.locator("//div[@class='css-dpec0i-option']");
    public locationName: Locator = this.page.locator("//label[text()='Location name']/following-sibling::input");
    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLocationTranslationDropdown(): LocationTranslationPage {
        language.click();
        dropdownSelect.click();
        return this;
    }

    public typeEnterLocationName(Location: string): LocationTranslationPage {
        locationName.click();
        locationName.type(Location);
        return this;
    }

    public clickSaveButton(): HrDataLocationPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataLocationPage);
    }
}
