import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { PathwayDetailsPage } from "pages/pathways/PathwayDetailsPage";

export class ChannelDetailsPage extends BasePage {
  static pageModel = { pageName: "Channel details page", url: "/channel/%s" };

    public channelNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public cardTitle: Locator = this.page.locator("//div[starts-with(@id, 'card-title')]/descendant::span[2]");
    public channelTitle: Locator = this.page.locator("//div[contains(@class, 'title-name')]/descendant::h1");
    public changeLanguageFilter: Locator = this.page.locator("//select[@aria-label='Select Language to filter content']");
    public changeLanguageFilterSpanish: Locator = this.page.locator("//select[@aria-label='Seleccione el idioma para filtrar el contenido']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public changeLanguageInFilter(langCode: string): ChannelDetailsPage {
        this.changeLanguageFilter.selectOption(langCode);
        return this;
    }

    public changeLanguageInFilterInSpanish(langCode: string): ChannelDetailsPage {
        this.changeLanguageFilterSpanish.selectOption(langCode);
        return this;
    }

    public clickPathwayTitle(): PathwayDetailsPage {
        this.cardTitle.click();
        return this.getPageClassInstance(PathwayDetailsPage);
        }

    public clickJourneyTitle(): JourneyDetailsPage {
        this.cardTitle.click();
        this.pause(2000);
        return this.getPageClassInstance(JourneyDetailsPage);
    }
}
