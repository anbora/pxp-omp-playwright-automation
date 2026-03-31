// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";

export class PathwayDetailsPage extends BasePage {
  static pageModel = { pageName: "Pathway Details Page", url: "" };

    public channelToBeSelectedCheckbox(channelName: string): Locator {

      return this.getLocatorWithParam("//span[text()='%s']/preceding-sibling::input", channelName);

    }
    public threeDotsMenuForPathway(pathwayTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='insight-dropdown']//button[contains(@aria-label, '%s')]", pathwayTitle);
    }

    public journeyTitle: Locator = this.page.locator("//h1[@class='card-title-header']");

    public postToChannelMenuOption: Locator = this.page.locator("//ul[@role='menu']/li[contains(text(), 'Post to Channel')]");
    public searchChannelInput: Locator = this.page.locator("//input[@placeholder='Search Channel']");
    public searchIcon: Locator = this.page.locator("//button[@aria-label='Search']");
    public postButton: Locator = this.page.locator("//button[text() = ' Post']");
    public journeyNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public languageDropdown: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::select");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickThreeDotsMenu(pathwayTitle: string): PathwayDetailsPage {
        this.threeDotsMenuForPathway(pathwayTitle).click();
        return this;
    }

    public clickPostToChannel(): PathwayDetailsPage {
        postToChannelMenuOption.click();
        return this;
    }

    public searchForChannels(channelName: string): PathwayDetailsPage {
        searchChannelInput.fill(channelName);
        return this;
    }

    public clickSearchIcon(): PathwayDetailsPage {
        searchIcon.click();
        return this;
    }

    public selectSpecificChannel(channelName: string): PathwayDetailsPage {
        this.channelToBeSelectedCheckbox(channelName).click();
        return this;
    }

    public clickPostButton(): PathwayDetailsPage {
        postButton.click();
        return this;
    }
}
