// @ts-nocheck
import { BasePage } from "common/BasePage";
import { ElementType } from "common/enums/ElementType";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { EditFieldModalPage } from "pages/admin/EditFieldModalPage";

export class LanguageModalPage extends BasePage {

    private static readonly MODAL_SELECTOR: string = ".modal-body";
    public languageSelect: Locator = this.page.locator("//div[text()='Select Language']/parent::div/following-sibling::div");
    public languageOption(language: string): Locator {
      return this.getLocatorWithParam("//div[contains(@id,'react-select')][contains(text(), '%s')]", language);
    }
    public addLanguageButton(): Locator {
      return this.aiLocator(MODAL_SELECTOR, "//div[@class='icon-fontello-plus-circled-1']", "Add language", ElementType.DIV);
    }
    public translatedTextInput(language: string): Locator {
      return this.getLocatorWithParam("//input[@value='%s']/parent::div/following-sibling::div/child::input[contains(@class, 'input-settings-field')]", language);
    }
    public setLanguagesButton: Locator = this.page.locator("//h4[@class='modal-title'][text() = 'Set Languages']/ancestor::div/descendant::button[text() = 'Set Languages']");
    public deleteTranslationButton(language: string): Locator {
      return this.getLocatorWithParam("//input[@value='%s']/parent::div/following-sibling::div/child::a", language);
    }

	public selectLanguage(language: string): LanguageModalPage {
        languageSelect.first().click();
        this.languageOption(language).first().click();
        return this;
    }

	public clickAddLanguage(): LanguageModalPage {
        this.addLanguageButton().first().click();
        return this;
    }

	public typeTranslation(language: string, translation: string): LanguageModalPage {
        this.translatedTextInput(language).fill(translation);
        return this;
    }

	public deleteTranslation(language: string): LanguageModalPage {
        if (deleteTranslationButton(language).isVisible()) {
            this.deleteTranslationButton(language).click();
        }
        return this;
    }

	public setLanguages(): EditFieldModalPage {
        setLanguagesButton.click();
        this.pause(2000);
        return this.getPageClassInstance(EditFieldModalPage);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
