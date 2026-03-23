import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJourneyPage } from "pages/journeys/CreateJourneyPage";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { CreatePathwayPage } from "pages/pathways/CreatePathwayPage";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class TextSmartCardModal extends CreateSmartCardModal {
    private static readonly SAVING_BUTTON_XPATH: string = "//button[text()='Saving']";
    public titleInput: Locator = this.page.locator("input[placeholder = 'Enter SmartCard title here']");
    public levelDropDown: Locator = this.page.locator("//label[text() = 'Level']/following-sibling::select");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public fillInTitle(title: string): TextSmartCardModal {
        titleInput.fill(title);
        return this;
    }

    public selectLevel(level: string): TextSmartCardModal {
        levelDropDown.selectOption(level);
        return this;
    }

    public clickCreateCardButtonInPathway(): CreatePathwayPage {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(CreatePathwayPage);
    }

    public clickCreateCardButtonInJourney(): CreateJourneyPage {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(CreateJourneyPage);
    }

}
