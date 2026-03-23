import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class JourneyDetailsPage extends BasePage {
  static pageModel = { pageName: "Journey Details Page", url: "" };
    public channelToBeSelectedCheckbox(channelName: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/preceding-sibling::input", channelName);
    }

    public journeyTitle: Locator = this.page.locator("//h1[@class='card-title-header']");
    public threeDotsMenu: Locator = this.page.locator ("//button[starts-with(@id, 'card-insight')]");
    public postToChannelMenuOption: Locator = this.page.locator("//ul[@role='menu']/li[contains(text(), 'Post to Channel')]");
    public searchChannelInput: Locator = this.page.locator("//input[@placeholder='Search Channel']");
    public searchIcon: Locator = this.page.locator("//button[@aria-label='Search']");
    public postButton: Locator = this.page.locator("//button[text() = ' Post']");
    public journeyNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public languageDropdown: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::select");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickThreeDotsMenu(): JourneyDetailsPage {
        threeDotsMenu.click();
        return this;
    }

    public clickPostToChannel(): JourneyDetailsPage {
        postToChannelMenuOption.click();
        return this;
    }

    public searchForChannels(channelName: string): JourneyDetailsPage {
        searchChannelInput.fill(channelName);
        return this;
    }

    public clickSearchIcon(): JourneyDetailsPage {
        searchIcon.click();
        return this;
    }

    public selectSpecificChannel(channelName: string): JourneyDetailsPage {
        this.channelToBeSelectedCheckbox(channelName).click();
        return this;
    }

    public clickPostButton(): JourneyDetailsPage {
        postButton.click();
        return this;
    }
}
