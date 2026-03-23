import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class SmartCardDetailsPage extends BasePage {

    public cardName: Locator = this.page.locator("h1.card-title-header");
    public cardType: Locator = this.page.locator("span.card-type");
    public cardLevel: Locator = cardType.locator("//following-sibling::div/span");
    public cardImage: Locator = this.page.locator("div.thumbnail-resource-wrapper img");
    public getCardNameDescription: Locator = this.page.locator("div.card-std-resource-description > span");
    public authorName: Locator = this.page.locator("span.author-std-name");
    public publishedDate: Locator = this.page.locator("span.published-date");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
