import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

import pages.me.ContentMePage;@Getter
export class QuizCardModal extends CreateSmartCardModal {
    private static readonly SAVING_BUTTON_XPATH: string = "//button[text()='Saving']";

    public languageCheckbox(langCode: string): Locator {

      return this.getLocatorWithParam("//div[@role='menuitemcheckbox']/descendant::input[@id='%s']", langCode);

    }

    public multilingualTitle(langCode: string): Locator {

      return this.getLocatorWithParam("//input[@name='%s_title']", langCode);

    }

    public multilingualQuestion(langCode: string, label: string): Locator {

      return this.getLocatorWithParam("//input[starts-with(@id, '%s_question') and @placeholder='%s']", langCode, label);

    }

    public multilingualQuestionValidationError(langCode: string, label: string): Locator {

      return this.getLocatorWithParam("//input[starts-with(@id, '%s_question') and @placeholder='%s']/parent::div/parent::div/descendant::span[@class='input-error']", langCode, label);

    }

    public multiLingualOption(langCodeForQuestion: string, questionlabel: string, langCodeForOption: string, optionLabel: string): Locator {

      return this.getLocatorWithParam("//input[starts-with(@id, '%s_question') and @placeholder='%s']/ancestor::div[5]/descendant::input[starts-with(@id, '%s_option') and @placeholder='%s']", langCodeForQuestion, questionlabel, langCodeForOption,optionLabel);

    }

    public multiLingualOptionValidationError(langCode: string, questionLabel: string, langCodeForOption: string, optionLabel: string): Locator {

      return this.getLocatorWithParam("//input[starts-with(@id, '%s_question') and @placeholder='%s']/ancestor::div[5]/descendant::input[starts-with(@id, '%s_option') and @placeholder='%s']//parent::div/parent::div/descendant::span[@class='input-error']", langCode, questionLabel, langCodeForOption, optionLabel);

    }

    public correctOptionValidation(langCode: string, label: string): Locator {

      return this.getLocatorWithParam("//input[starts-with(@id, '%s_question') and @placeholder='%s']/ancestor::div/descendant::div[@class='quiz-no-correct-option-error-container quiz-with-relative-top']/descendant::label", langCode, label);

    }

    public correctOption(optionValue: string): Locator {

      return this.getLocatorWithParam("//input[@value='%s']/ancestor::div[3]/descendant::input[@type='checkbox']", optionValue);

    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectLanguageDropdown: Locator = this.page.locator("//span[text()='Select Language']");
    public createCardButton: Locator = this.page.locator("button#create-card-btn");
    public singleLanguageTitle: Locator = this.page.locator("#quizTitle");
    public addOptionButton: Locator = this.page.locator("//button[text()='Add option']");
    public addAnotherQuestionButton: Locator = this.page.locator("//button[text()='Add Another Question']");
    public addQuizQuestionInput: Locator = this.page.locator("//div[@class='input-group']/descendant::input[@placeholder='Question 1']");
    public addFirstQuizOptionInput: Locator = this.page.locator("//div[@class='input-group']/descendant::input[@placeholder='Option 1']");
    public addSecondQuizOptionInput: Locator = this.page.locator("//div[@class='input-group']/descendant::input[@placeholder='Option 2']");
    public archiveContentCheckbox: Locator = this.page.locator("//input[contains(@aria-label,'Archive this content')]");
    public archiveDate: Locator = this.page.locator("//span[@class='date-range-placeholder']");
    public nextMonth: Locator = this.page.locator("//button[@class='react-datepicker__navigation react-datepicker__navigation--next']");
    public seventeenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--017')]");
    public eighteenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--018')]");
    public threeDotsCardMenu: Locator = this.page.locator("//button[@class='cursor-pointer insight-dropdown-button']");
    public editSmartCard: Locator = this.page.locator("//ul[@role='menu']/descendant::li[contains(text(), 'Edit')]");
    public accordion(language: string): Locator {
      return this.getByRole(AriaRole.BUTTON, language).build();
    }

    public clickLanguageDropdown(): QuizCardModal {
        selectLanguageDropdown.click();
        return this;
    }

    public chooseLanguage(languageCode: string): QuizCardModal {
        this.languageCheckbox(languageCode).click();
        this.clickLanguageDropdown();
        return this;
    }

    public fillInSingleLanguageTitle(title: string): QuizCardModal {
        singleLanguageTitle.fill(title);
        return this;
    }

    public fillInSingleLanguageQuizQuestion(questionText: string): QuizCardModal {
        addQuizQuestionInput.fill(questionText);
        return this;
    }

    public fillInFirstSingleLanguageQuizQption(questionText: string): QuizCardModal {
        addFirstQuizOptionInput.fill(questionText);
        return this;
    }
    public fillInSecondSingleLanguageQuizQption(questionText: string): QuizCardModal {
        addSecondQuizOptionInput.fill(questionText);
        return this;
    }

    public fillInMultilingualTitle(languageCode: string, title: string): QuizCardModal {
        this.multilingualTitle(languageCode).fill(title);
        this.pause(DEFAULT_TIMEOUT);
        return this;
    }

    public openAccordion(language: string): QuizCardModal {
        this.accordion(language).click();
        this.pause(DEFAULT_TIMEOUT);
        return this;
    }

    public fillInMultilingualQuizQuestion(langCode: string, questionLabel: string, questionText: string): QuizCardModal {
        this.multilingualQuestion(langCode, questionLabel).fill(questionText);
        return this;
    }

    public fillInMultilingualQuizOption(langCode: string, questionLabel: string, langCodeForOption: string, optionLabel: string, optionText: string): QuizCardModal {
        this.multiLingualOption(langCode, questionLabel, langCodeForOption, optionLabel).fill(optionText);
        return this;
    }

    public selectCorrectOption(optionValue: string): QuizCardModal {
       this.correctOption(optionValue).click();
       return this;
    }

    public clickCreateCardButton(): ContentMePage {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(ContentMePage);
    }

    public clickCreateCardButtonWithValidationTriggered(): QuizCardModal {
        createCardButton.click();
        return this;
    }

    public clickUpdateCardButtonWithValidationTriggered(): QuizCardModal {
       updateCardButton.click();
        return this;
    }

    public clickAddOptionButton(): QuizCardModal {
        addOptionButton.click();
        return this;
    }

    public clickAddQuestionButton(): QuizCardModal {
        addAnotherQuestionButton.click();
        return this;
    }

    public clickArchiveContentCheckbox(): QuizCardModal {
        archiveContentCheckbox.click();
        return this;
    }

    public chooseSeventeenDayOfNextMonth(dataContainer: ResultContainer): QuizCardModal {
        archiveDate.click();
        nextMonth.click();
        seventeenDay.click();
        dataContainer.setValue(archiveDate.textContent());
        return this;
    }
    public chooseEighteenDayOfNextMonth(dataContainer: ResultContainer): QuizCardModal {
        archiveDate.click();
        nextMonth.click();
        eighteenDay.click();
        dataContainer.setValue(archiveDate.textContent());
        return this;
    }

    public clickUpdateQuizCardButton(): QuizCardModal {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(QuizCardModal);
    }

    public editQuizSmartCard(): QuizCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(QuizCardModal);
    }
}
