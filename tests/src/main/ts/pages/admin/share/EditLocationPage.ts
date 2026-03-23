import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";
import { AbstractLocationModalPage } from "pages/admin/share/AbstractLocationModalPage";

export class EditLocationPage extends AbstractLocationModalPage<EditLocationPage> {

    public clearButton: Locator = this.page.locator("//div[6]//div[@class='css-1wy0on6']/div[1]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    protected thisReturnInstance(): EditLocationPage {

      return this;
    }

    public enterLocationName(locationName: string): EditLocationPage {

      return super.enterLocationName(locationName);

    }

    public clickSaveButton(): HrDataLocationPage {

      return super.saveButton();

    }

    public selectCountry(countrySelect: string): EditLocationPage {

      return super.selectCountry(countrySelect);

    }

    public clickClearButton(): EditLocationPage {
        clearButton.click();
        return this.getPageClassInstance(EditLocationPage);
    }
}
