// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser } from "common/testing/playwright";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";
import { AbstractLocationModalPage } from "pages/admin/share/AbstractLocationModalPage";

export class CreateLocationPage extends AbstractLocationModalPage<CreateLocationPage> {

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    protected thisReturnInstance(): CreateLocationPage {

      return this;
    }

    public enterLocationName(locationName: string): CreateLocationPage {

      return super.enterLocationName(locationName);

    }

    public clickSaveButton(): HrDataLocationPage {

      return super.saveButton();

    }

    public selectCountry(countrySelect: string): CreateLocationPage {

      return super.selectCountry(countrySelect);

    }
}
