import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { WebURLSmartCardModal } from "pages/smartcard/WebURLSmartCardModal";

export class CreateJourneyPage extends BasePage {
  static pageModel = { pageName: "Journey Page", url: "/journeys/new" };
    private static readonly PUBLISHING_BUTTON_XPATH: string = "//button[text()='Publishing']";
    public languageToSelect(langCode: string): Locator {
      return this.getLocatorWithParam("//div[@role='menuitemcheckbox' and @aria-labelledby='pl_label']/descendant::label", langCode);
    }
    public journeyTitle: Locator = this.page.locator("//label[@id='id-Journey-Title']/following-sibling::div/descendant::input");
    public journeyDescription: Locator = this.page.locator("#description");
    public addLanguagesButton: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::button/descendant::span[@alt='Add Language']");
    public selectLanguagesDropdown: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div");
    public selectLanguagesDropdownExpanded: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div[1]");
    public accordion(language: string): Locator {
      return this.getByRole(AriaRole.BUTTON, language).build();
    }
    public journeyNameInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::label[@class='ed-input-title']/following-sibling::div/descendant::input[@placeholder='Enter Journey title here']");
    public journeyDescriptionInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::div[@data-id='descriptions']/descendant::div[@id='message']");
    public defaultLanguageSelectInModal: Locator = this.page.locator("//div[@class='accordion-item ed-details']/following-sibling::div/descendant::select");
    public addLanguageButtonInModal: Locator = this.page.locator("#save-goal-btn");
    public continueButton: Locator = this.page.locator("//button[text()='Continue']");
    public publishButton: Locator = this.page.locator("//button[text()='Publish']");
    public addNewSmartCardForJourney: Locator = this.page.locator("//button[starts-with(@id, 'smart_card_button')]");
    public goToMyContentButton: Locator = this.page.locator("//button[text()='Go to My Content']");
    public openJourneyButton: Locator = this.page.locator("//button[text()='Open Journey']");
    public sectionTitle: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::input[@placeholder='Enter section title here']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public fillInJourneyTitle(title: string): CreateJourneyPage {
        journeyTitle.fill(title);
        return this;
    }

    public fillInJourneyDescription(description: string): CreateJourneyPage {
        journeyDescription.fill(description);
        return  this;
    }

    public clickAddLanguagesButton(): CreateJourneyPage {
        addLanguagesButton.click();
        return this;
    }

    public addLanguages(langCode: string): CreateJourneyPage {
        selectLanguagesDropdown.click();
        this.languageToSelect(langCode).click();
        return this;
    }

    public clickSelectLanguagesDropdown(): CreateJourneyPage {
        selectLanguagesDropdownExpanded.click();
        return this;
    }

    public openAccordion(language: string): CreateJourneyPage {
        this.accordion(language).click();
        return this;
    }

    public fillInJourneyNameInAccordion(name: string): CreateJourneyPage {
        journeyNameInAccordion.fill(name);
        return this;
    }
    public fillInJourneyDescriptionInAccordion(description: string): CreateJourneyPage {
        journeyDescriptionInAccordion.fill(description);
        return this;
    }

    public changeDefaultLanguage(language: string): CreateJourneyPage {
        defaultLanguageSelectInModal.selectOption(language);
        return this;
    }

    public clickAddLanguageInModal(): CreateJourneyPage {
        addLanguageButtonInModal.click();
        return this;
    }

    public clickContinueButton(): CreateJourneyPage {
        continueButton.click();
        return this;
    }

    public clickAddNewSmartCardButton(): WebURLSmartCardModal {
        addNewSmartCardForJourney.click();
        return this.getPageClassInstance(WebURLSmartCardModal);
    }

    public enterSectionTitle(section: string): CreateJourneyPage {
        sectionTitle.fill(section);
        return this;
    }

    public clickPublishJourneyButton(): ContentMePage {
        publishButton.click();
      while(null: this.page.querySelector(PUBLISHING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        goToMyContentButton.click();
        return this.getPageClassInstance(ContentMePage);
    }

    public clickPublishJourneyButtonAndGoToJourneyDetailsPage(): JourneyDetailsPage {
        publishButton.click();
      while(null: this.page.querySelector(PUBLISHING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        openJourneyButton.click();
        return this.getPageClassInstance(JourneyDetailsPage);
    }
}
