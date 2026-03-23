import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ContentMePage } from "pages/me/ContentMePage";
import { PathwayDetailsPage } from "pages/pathways/PathwayDetailsPage";
import { WebURLSmartCardModal } from "pages/smartcard/WebURLSmartCardModal";

export class CreatePathwayPage extends BasePage {
  static pageModel = { pageName: "Home Page", url: "/pathways/new" };

    private static readonly PUBLISHING_BUTTON_XPATH: string = "//button[text()='Publishing']";
    public languageToSelect(langCode: string): Locator {
      return this.getLocatorWithParam("//div[@role='menuitemcheckbox' and @aria-labelledby='pl_label']/descendant::label", langCode);
    }
    public pathwayTitle: Locator = this.page.locator("//label[@id='id-Pathway-Title']/following-sibling::div/descendant::input");
    public pathwayDescription: Locator = this.page.locator("#description");
    public addLanguagesButton: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::button/descendant::span[@alt='Add Language']");
    public selectLanguagesDropdown: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div");
    public selectLanguagesDropdownExpanded: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div[1]");
    public accordion(language: string): Locator {
      return this.getByRole(AriaRole.BUTTON, language).build();
    }
    public pathwayNameInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::label[@class='ed-input-title']/following-sibling::div/descendant::input[@placeholder='Enter Pathway title here']");
    public pathwayDescriptionInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::div[@data-id='descriptions']/descendant::div[@id='message']");
    public defaultLanguageSelectInModal: Locator = this.page.locator("//div[@class='accordion-item ed-details']/following-sibling::div/descendant::select");
    public addLanguageButtonInModal: Locator = this.page.locator("#save-goal-btn");
    public continueButton: Locator = this.page.locator("//button[text()='Continue']");
    public publishButton: Locator = this.page.locator("//button[text()='Publish']");
    public addNewSmartCardForPathway: Locator = this.page.locator("//div[starts-with(@class, 'empty-card')]/descendant::button");
    public goToMyContentButton: Locator = this.page.locator("//button[text()='Go to My Content']");
    public openPathwayButton: Locator = this.page.locator("//button[text()='Open Pathway']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public fillInPathwayTitle(title: string): CreatePathwayPage {
        pathwayTitle.fill(title);
        return this;
    }

    public fillInPathwayDescription(description: string): CreatePathwayPage {
        pathwayDescription.fill(description);
        return  this;
    }

    public clickAddLanguagesButton(): CreatePathwayPage {
        addLanguagesButton.click();
        return this;
    }

    public addLanguages(langCode: string): CreatePathwayPage {
        selectLanguagesDropdown.click();
        this.languageToSelect(langCode).click();
        return this;
    }

    public clickSelectLanguagesDropdown(): CreatePathwayPage {
        selectLanguagesDropdownExpanded.click();
        return this;
    }

    public openAccordion(language: string): CreatePathwayPage {
        this.accordion(language).click();
        return this;
    }

    public fillInPathwayNameInAccordion(name: string): CreatePathwayPage {
        pathwayNameInAccordion.fill(name);
        return this;
    }
    public fillInPathwayDescriptionInAccordion(description: string): CreatePathwayPage {
        pathwayDescriptionInAccordion.fill(description);
        return this;
    }

    public changeDefaultLanguage(language: string): CreatePathwayPage {
        defaultLanguageSelectInModal.selectOption(language);
        return this;
    }

    public clickAddLanguageInModal(): CreatePathwayPage {
        addLanguageButtonInModal.click();
        return this;
    }

    public clickContinueButton(): CreatePathwayPage {
        continueButton.click();
        return this;
    }

    public clickAddNewSmartCardButton(): WebURLSmartCardModal {
        addNewSmartCardForPathway.click();
        return this.getPageClassInstance(WebURLSmartCardModal);
    }

    public clickPublishPathwayButton(): ContentMePage {
        publishButton.click();
      while(null: this.page.querySelector(PUBLISHING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        goToMyContentButton.click();
        return this.getPageClassInstance(ContentMePage);
    }

    public clickPublishPathwayButtonAndGoToPathwayDetailsPage(): PathwayDetailsPage {
        publishButton.click();
      while(null: this.page.querySelector(PUBLISHING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        openPathwayButton.click();
        return this.getPageClassInstance(PathwayDetailsPage);
    }
}
