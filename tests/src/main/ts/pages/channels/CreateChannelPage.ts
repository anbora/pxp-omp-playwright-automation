import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ChannelDetailsPage } from "pages/channels/ChannelDetailsPage";
import { EditGroupPage } from "pages/groups/EditGroupPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";

export class CreateChannelPage extends BasePage {
  static pageModel = { pageName: "Create channel page", url: "/channels/new" };

    private static readonly CREATING_BUTTON_XPATH: string = "//button[text()='Creating']";
    public languageToSelect(langCode: string): Locator {
      return this.getLocatorWithParam("//div[@role='menuitemcheckbox' and @aria-labelledby='pl_label']/descendant::label", langCode);
    }

    public channelName: Locator = this.page.locator("//label[text()= 'Channel Name']/parent::div/descendant::input");
    public channelDescription: Locator = this.page.locator("//label[text()= 'About']/parent::div/descendant::textarea");
    public addLanguagesButton: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::button/descendant::span[@alt='Add Language']");
    public selectLanguagesDropdown: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div");
    public selectLanguagesDropdownExpanded: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div[1]");
    public accordion(language: string): Locator {
      return this.getByRole(AriaRole.BUTTON, language).build();
    }

    public channelNameInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::input[@placeholder='Enter channel name here']");
    public channelDescriptionInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::textarea");
    public defaultLanguageSelectInModal: Locator = this.page.locator("//select[@class='ed-select']");
    public addLanguageButtonInModal: Locator = this.page.locator("#save-goal-btn");
    public createChannelButton: Locator = this.page.locator("//button[text()='Create Channel']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public fillInChannelName(name: string): CreateChannelPage {
        this.channelName.fill(name);
        return this;
    }

    public fillInChannelDescription(description: string): CreateChannelPage {
        this.channelDescription.fill(description);
        return this;
    }

    public clickAddLanguagesButton(): CreateChannelPage {
        this.addLanguagesButton.click();
        return this;
    }

    public addLanguages(langCode: string): CreateChannelPage {
        this.selectLanguagesDropdown.click();
        this.languageToSelect(langCode).click();
        return this;
    }

    public clickSelectLanguageDropdown(): CreateChannelPage {
        this.selectLanguagesDropdownExpanded.click();
        return this;
    }

    public openAccordion(language: string): CreateChannelPage {
        this.pause(CreateChannelPage.DEFAULT_TIMEOUT);
        this.accordion(language).click();
        return this;
    }

    public fillInChannelNameInAccordion(name: string): CreateChannelPage {
        this.channelNameInAccordion.fill(name);
        return this;
    }
    public fillInChannelDescriptionInAccordion(description: string): CreateChannelPage {
        this.channelDescriptionInAccordion.fill(description);
        return this;
    }

    public changeDefaultLanguage(language: string): CreateChannelPage {
        this.defaultLanguageSelectInModal.selectOption(language);
        return this;
    }

    public clickAddLanguageInModal(): CreateChannelPage {
        this.addLanguageButtonInModal.click();
        return this;
    }

    public clickCreateChannelButton(): ChannelDetailsPage {
        this.createChannelButton.click();
      while(null: this.page.querySelector(CREATING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(ChannelDetailsPage);
    }
}
