import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";
import { LiveEventCardModal } from "pages/smartcard/LiveEventCardModal";
import { PollCardModal } from "pages/smartcard/PollCardModal";
import { ProjectCardModal } from "pages/smartcard/ProjectCardModal";
import { QuizCardModal } from "pages/smartcard/QuizCardModal";

export class SmartCardStandAlonePage extends BasePage {

    private static readonly SUBMITTING_BUTTON_XPATH: string = "//button[text()='Submitting']";
    public smartCardQuestion(question: string): Locator {
      return this.getLocatorWithParam("//div[@class='question-layout']/descendant::span[text()='%s']", question);
    }
    public pollCardQuestion(question: string): Locator {
      return this.getLocatorWithParam("//span[@class='poll-question-label'][text()= '%s']", question);
    }
    public smartCardOption(option: string): Locator {
      return this.getLocatorWithParam("//input[@type='radio']/parent::label/descendant::span[2][text()='%s']", option);
    }
    public pollCardOption(option: string): Locator {
      return this.getLocatorWithParam("//button[@role='radio']/descendant::span[text()='%s']", option);
    }
    public smartCardOptionRadiobutton(option: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/parent::span/parent::label/descendant::input", option);
    }
    public pollOption(option: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']", option);
    }
    public answeredPollOption(option: string): Locator {
      return this.getLocatorWithParam("//span[text()= '%s']/parent::li/descendant::div[3]", option);
    }
    public smartCardTitle: Locator = this.page.locator("//div[starts-with(@id, 'card-title')]/descendant::h1");
    public languageDropdown: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::select");
    public eclIdElement: Locator = this.page.locator("#hidden-ecl-id-for-tests");
    public threeDotsCardMenu: Locator = this.page.locator("//button[@class='cursor-pointer insight-dropdown-button']");
    public editSmartCard: Locator = this.page.locator("//ul[@role='menu']/descendant::li[contains(text(), 'Edit')]");
    public secondPositionMetadataValue: Locator = this.page.locator("//div[@class='additional-metadata-project-card']/descendant::div[4]/descendant::span");
    public passingGradeLabel: Locator = this.page.locator("//div[@class='additional-metadata-project-card']/descendant::div[4][text() = 'Passing Grade']");
    public maximumReattemptsLabel: Locator = this.page.locator("//div[@class='additional-metadata-project-card']/descendant::div[4][text() = 'Maximum Reattempts']");
    public shareButton: Locator = this.page.locator("//button[starts-with(@aria-label, 'Share')]");
    public smartCardNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public submitSmartCard: Locator = this.page.locator("//button[text()='Submit']");
    public submittedSmartCardButton: Locator = this.page.locator("//button[text()='Submitted']");
    public markAsCompletedButton: Locator = this.page.locator("//button[starts-with(@id, 'card-markAsComplete-')]/descendant::span");
    public cardNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public voteButton: Locator = getByRole(AriaRole.BUTTON, "Vote").build();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public changeLanguage(langCode: string): SmartCardStandAlonePage {
        languageDropdown.selectOption(langCode);
        return this;
    }

    public getECLUniqueId(eclId: ResultContainer): SmartCardStandAlonePage {
        eclId.setValue(eclIdElement.textContent());
        System.out.println(eclId.getValue());
        return this;
    }

    public editProjectSmartCard(): ProjectCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(ProjectCardModal);
    }

    public editQuizSmartCard(): QuizCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(QuizCardModal);
    }
    public editLiveEventSmartCard(): LiveEventCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(LiveEventCardModal);
    }

    public editPollSmartCard(): PollCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(PollCardModal);
    }

    public clickShareContentButton(): ShareContentModalPage {
        shareButton.click();
        return this.getPageClassInstance(ShareContentModalPage);
    }

    public clickThreeDotsCardMenu(): SmartCardStandAlonePage {
        threeDotsCardMenu.click();
        return this;
    }
    public selectCorrectOption(option: string): SmartCardStandAlonePage {
        this.smartCardOptionRadiobutton(option).click();
        return this;
    }

    public submitCardAnswers(): SmartCardStandAlonePage {
        submitSmartCard.click();
      while(null: this.page.querySelector(SUBMITTING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this;
    }

    public answerPoll(option: string): SmartCardStandAlonePage {
        this.pollOption(option).click();
        return this;
    }

    public clickVotePoll(): SmartCardStandAlonePage {
        voteButton.click();
        return this;
    }
}
