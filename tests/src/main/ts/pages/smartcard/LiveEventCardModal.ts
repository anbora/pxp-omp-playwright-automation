import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { ContentMePage } from "pages/me/ContentMePage";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class LiveEventCardModal extends CreateSmartCardModal {

    private static readonly SAVING_BUTTON_XPATH: string = "//button[text()='Saving']";

    public languageCheckbox(langCode: string): Locator {

      return this.getLocatorWithParam("//div[@role='menuitemcheckbox']/descendant::input[@id='%s']", langCode);

    }

    public multilingualTitle(langCode: string): Locator {

      return this.getLocatorWithParam("//input[@id='%s_liveEventTitle']", langCode);

    }

    public meetingLink: Locator = this.page.locator("#meeting_details");
    public singleLanguageTitle: Locator = this.page.locator("//input[contains(@name,'title')]");
    public startDate: Locator = this.page.locator("//span[@aria-label='Start date']/descendant::button[@id='date-range']");
    public nextMonth: Locator = this.page.locator("//button[@class='react-datepicker__navigation react-datepicker__navigation--next']");
    public fifteenthDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--015')]");
    public seventeenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--017')]");
    public eighteenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--018')]");
    public selectLanguageDropdown: Locator = this.page.locator("//span[text()='Select Language']");
    public createCardButton: Locator = this.page.locator("button#create-card-btn");
    public timezone: Locator = this.page.locator("#timezone");
    public archiveContentCheckbox: Locator = this.page.locator("//input[contains(@aria-label,'Archive this content')]");
    public archiveDate: Locator = this.page.locator("//span[@class='date-range-placeholder']");
    public threeDotsCardMenu: Locator = this.page.locator("//button[@class='cursor-pointer insight-dropdown-button']");
    public editSmartCard: Locator = this.page.locator("//ul[@role='menu']/descendant::li[contains(text(), 'Edit')]");
    public accordion(language: string): Locator {
      return this.getByRole(AriaRole.BUTTON, language).build();
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLanguageDropdown(): LiveEventCardModal {
        selectLanguageDropdown.click();
        return this;
    }

    public chooseLanguage(languageCode: string): LiveEventCardModal {
        this.languageCheckbox(languageCode).click();
        this.clickLanguageDropdown();
        return this;
    }

    public fillInSingleLanguageTitle(title: string): LiveEventCardModal {
        singleLanguageTitle.fill(title);
        return this;
    }

    public fillInMultilingualTitle(languageCode: string, title: string): LiveEventCardModal {
        this.multilingualTitle(languageCode).fill(title);
        this.pause(DEFAULT_TIMEOUT);
        return this;
    }

    public openAccordion(language: string): LiveEventCardModal {
        this.accordion(language).click();
        this.pause(DEFAULT_TIMEOUT);
        return this;
    }

    public fillInMeetingLink(link: string): LiveEventCardModal {
        meetingLink.fill(link);
        return this;
    }

    public chooseFifteenthDayOfNextMonth(): LiveEventCardModal {
        startDate.click();
        nextMonth.click();
        fifteenthDay.click();
        return this;
    }

    public selectTimezone(timezoneValue: string): LiveEventCardModal {
        timezone.selectOption(timezoneValue);
        return this;
    }

    public clickCreateCardButton(): ContentMePage {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(ContentMePage);
    }

    public clickUpdateLiveCardButton(): LiveEventCardModal {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(LiveEventCardModal);
    }

    public clickArchiveContentCheckbox(): LiveEventCardModal {
        archiveContentCheckbox.click();
        return this;
    }

    public chooseSeventeenDayOfNextMonth(dataContainer: ResultContainer): LiveEventCardModal {
        archiveDate.click();
        nextMonth.click();
        seventeenDay.click();
        dataContainer.setValue(archiveDate.textContent());
        return this;
    }

    public chooseEighteenDayOfNextMonth(dataContainer: ResultContainer): LiveEventCardModal {
        archiveDate.click();
        nextMonth.click();
        eighteenDay.click();
        dataContainer.setValue(archiveDate.textContent());
        return this;
    }

    public editLiveEventSmartCard(): LiveEventCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(LiveEventCardModal);
    }
}
