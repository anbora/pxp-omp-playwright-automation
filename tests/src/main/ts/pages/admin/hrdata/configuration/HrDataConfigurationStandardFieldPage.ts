import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { EditFieldModalPage } from "pages/admin/EditFieldModalPage";

export class HrDataConfigurationStandardFieldPage extends BasePage {

    private readonly COUNTRY_FIELD: string = "//div[text() = 'Country']";
    public countryFieldLabel: Locator = this.page.locator(COUNTRY_FIELD);
    public countryFieldEditIcon: Locator = this.page.locator(COUNTRY_FIELD + "/preceding-sibling::div/button");
    private readonly LEVEL_FIELD: string = "//div[text() = 'Level']";
    public levelFieldLabel: Locator = this.page.locator(LEVEL_FIELD);
    public levelFieldEditIcon: Locator = this.page.locator(LEVEL_FIELD + "/preceding-sibling::div/button");
    public saveButtonStandardFieldsTab: Locator = this.page.locator("//div[@class='col-xs-3 col-xs-offset-9']/button[text()='Save']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickInCountryFieldEditIcon(): EditFieldModalPage {
        countryFieldEditIcon.click();
        return this.getPageClassInstance(EditFieldModalPage);
    }

    public clickInLevelFieldEditIcon(): EditFieldModalPage {
        levelFieldEditIcon.click();
        return this.getPageClassInstance(EditFieldModalPage);
    }

    public clickSaveButtonStandardFieldsTab(): HrDataConfigurationStandardFieldPage {
        saveButtonStandardFieldsTab.click();
        return this;
    }
}
