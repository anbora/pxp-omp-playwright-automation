// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class PollCardModal extends CreateSmartCardModal{

    public question(questionIndex: string): Locator {

      return this.getLocatorWithParam("//input[@placeholder = 'Question %s']" , questionIndex);

    }

    public option(questionIndex: string, optionIndex: string): Locator {

      return this.getLocatorWithParam("//div[@class='poll-question']/descendant::input[@placeholder='Question %s']/parent::div/parent::div/parent::div/parent::div/following-sibling::div/descendant::input[@placeholder='Poll Option %s']", questionIndex, optionIndex);

    }

    public addOption(questionIndex: string): Locator {

      return this.getLocatorWithParam("//input[@placeholder='Question %s']/ancestor::div/following-sibling::button", questionIndex);

    }

    public title: Locator = this.page.locator("//input[@id='pollQuestion']");
    public addAnotherQuestionButton: Locator = this.page.locator("//button[text() = 'Add Another Question']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public fillInTitle(text: string): PollCardModal {
        title.clear();
        title.fill(text);
        return this;
    }

    public fillInQuestion(questionIndex: string, questionText: string): PollCardModal {
        this.question(questionIndex).clear();
        this.question(questionIndex).fill(questionText);
        return this;
    }

    public clickAddAnotherQuestionButton(): PollCardModal {
        addAnotherQuestionButton.click();
        return this;
    }

    public fillInOption(questionIndex: string, optionIndex: string, text: string): PollCardModal {
        this.option(questionIndex, optionIndex).clear();
        this.option(questionIndex, optionIndex).fill(text);
        return this;
    }

    public clickAddOptionButton(questionIndex: string): PollCardModal {
        this.addOption(questionIndex).click();
        return this;
    }
}
