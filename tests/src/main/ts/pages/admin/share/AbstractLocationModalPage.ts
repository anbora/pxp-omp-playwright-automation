import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";

export abstract class AbstractLocationModalPage <T extends AbstractLocationModalPage> extends BasePage {

    public locationNameField: Locator = this.page.locator("//html//input[@id='locationName']");
    public saveButton: Locator = this.page.locator("//button[text()='Save']");
    public countryInput: Locator = this.page.locator("//div[contains(text(),'Select country')] | //div[contains(text(),'Select Country')]");
    public dropdownSelect(countrySelectOption: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", countrySelectOption);
    }

    abstract protected T thisReturnInstance();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public enterLocationName(locationName: string): T {
        locationNameField.click();
        locationNameField.fill(locationName);
        return this.thisReturnInstance();
    }

    public saveButton(): HrDataLocationPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataLocationPage);
    }

    public selectCountry(countrySelect: string): T {
        countryInput.click();
        countryInput.pressSequentially(countrySelect);
        this.dropdownSelect(countrySelect).click();
        return this.thisReturnInstance();
    }
}
