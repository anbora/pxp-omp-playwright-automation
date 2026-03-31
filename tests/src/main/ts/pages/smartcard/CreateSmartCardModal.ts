// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ContentMePage } from "pages/me/ContentMePage";
import { LiveEventCardModal } from "pages/smartcard/LiveEventCardModal";
import { PollCardModal } from "pages/smartcard/PollCardModal";
import { ProjectCardModal } from "pages/smartcard/ProjectCardModal";
import { QuizCardModal } from "pages/smartcard/QuizCardModal";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";
import { TextSmartCardModal } from "pages/smartcard/TextSmartCardModal";

export abstract class CreateSmartCardModal extends BasePage {

    public smartCardTab(tabName: string): Locator {

      return this.getLocatorWithParam("//span[@class = 'tab-label'][text() = '%s']", tabName);

    }
    public webURLTab: Locator = smartCardTab("Web URL");
    public uploadedContentTab: Locator = smartCardTab("Uploaded Content");
    public pollTab: Locator = smartCardTab("Poll");
    public quizTab: Locator = smartCardTab("Quiz");
    public textCardTab: Locator = smartCardTab("Text Card");
    public scormFileTab: Locator = smartCardTab("SCORM File");
    public projectTab: Locator = smartCardTab("Project");
    public liveEventTab: Locator = smartCardTab("Live Event");
    public createCardButton: Locator = this.page.locator("button#create-card-btn");

    public updateCardButton: Locator = this.page.locator("//button[text()='Update Card']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public goToTextSmartCardTab(): TextSmartCardModal {
        textCardTab.click();
        return this.getPageClassInstance(TextSmartCardModal);
    }

    public clickCreateCardButton(): ContentMePage {
        createCardButton.click();
        this.pause(2000);
        return this.getPageClassInstance(ContentMePage);
    }

    public clickUpdateCardButton(): ContentMePage {
        updateCardButton.click();
        return this.getPageClassInstance(ContentMePage);
    }
    public clickUpdateCardButtonFromStandaloneView(): SmartCardStandAlonePage {
        updateCardButton.click();
        return this.getPageClassInstance(SmartCardStandAlonePage);
    }

    public goToLiveEventSmartCardTab(): LiveEventCardModal {
        liveEventTab.click();
        return this.getPageClassInstance(LiveEventCardModal);
    }

    public goToQuizSmartCardTab(): QuizCardModal {
        quizTab.click();
        return this.getPageClassInstance(QuizCardModal);
    }

    public goToPollSmartCardTab(): PollCardModal {
        pollTab.click();
        return this.getPageClassInstance(PollCardModal);
    }

    public goToProjectSmartCardTab(): ProjectCardModal {
        projectTab.click();
        return this.getPageClassInstance(ProjectCardModal);
    }

}
