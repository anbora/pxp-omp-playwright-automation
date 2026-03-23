import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { LocationTranslationPage } from "pages/admin/LocationTranslationPage";
import { CreateLocationPage } from "pages/admin/share/CreateLocationPage";
import { EditLocationPage } from "pages/admin/share/EditLocationPage";

export class HrDataLocationPage extends BasePage {

    public addLocationButton: Locator = this.page.locator("//button[contains(text(),'Add Location')]");
    public searchInput: Locator = this.page.locator("//div[@class='pull-left search__container__hr_data']/input");
    public searchIcon: Locator = this.page.locator(".search__container__hr_data > span");
    public locationName: Locator = this.page.locator("tr.new-table-row > td:nth-of-type(2)");
    public countryName: Locator = this.page.locator("//div[@class='rubix-panel-body']//table/tbody/tr[1]");
    public editLocationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Edit']");
    public locationTranslationButton: Locator = this.page.locator("tbody .new-table-row:nth-of-type(1) [title='Translation']");
    public language: Locator = this.page.locator("//div[@class='css-1hwfws3']");
    public dropdownSelect: Locator = this.page.locator("[class='css-11unzgr'] [tabindex='-1']:nth-of-type(1)");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddLocationButton(): CreateLocationPage {
        addLocationButton.click();
        return this.getPageClassInstance(CreateLocationPage);
    }

    public clickSearchLocation(locationName: string): HrDataLocationPage {
        searchInput.fill(locationName);
        searchIcon.click();
        return this;
    }

    public clickEditLocationButton(): EditLocationPage {
        editLocationButton.click();
        return this.getPageClassInstance(EditLocationPage);
    }

    public clickTranslationButton(): LocationTranslationPage {
        locationTranslationButton.click();
        return this.getPageClassInstance(LocationTranslationPage);
    }
}
