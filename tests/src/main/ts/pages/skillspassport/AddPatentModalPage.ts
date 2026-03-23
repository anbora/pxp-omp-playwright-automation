import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";

export class AddPatentModalPage extends BasePage {
  static pageModel = { pageName: "Add Badge Page", url: "/me/skills-passport" };

    private readonly patentName: Locator = this.page.locator("#patent-title");
    private patentInvestorName: Locator = this.page.locator("#patent-name");
    private descriptionInput: Locator = this.page.locator("#patent-description");
    private readonly patentURL: Locator = this.page.locator("#patent-url");
    public patentDate: Locator = this.page.locator("//span[text()='Date of Patent']/parent::div[@class='edit-modal-margin']/descendant::button[@id='date-range']");
    public patentDateSpan: Locator = this.page.locator("//span[text()='Date of Patent']/following-sibling::div/descendant::span");
    public fifteenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--015')]");
    private readonly saveButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[text()='Save']");
    private readonly editButton: Locator = this.page.locator("//button[@aria-label='Edit']");
    public patentCard: Locator = this.page.locator("//div[@class='ed-carousel-wrapper']");

    public patentInvestorNameError: Locator = this.page.locator("//span[@id='patent-inventor-name_error']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public addPatentTitle(name: string): AddPatentModalPage {
        patentName.fill(name);
        return this;
    }

    public selectInvestorsName(investorName: string): AddPatentModalPage {
        patentInvestorName.fill(investorName);
        return this;
    }

    public addDescriptionFromInput(description: string): AddPatentModalPage {
        descriptionInput.fill(description);
        return this;
    }

    public selectPatentURLFromInput(siteName: string): AddPatentModalPage {
        patentURL.fill(siteName);
        return this;
    }

    public chooseFifteenDayOfCurrentMonth(dataContainer: ResultContainer): AddPatentModalPage {
        patentDate.click();
        fifteenDay.click();
        dataContainer.setValue(patentDateSpan.textContent());
        return this;
    }

    public clickSaveButton(): AddPatentModalPage {
        saveButton.click();
        return this;
    }

    public editPatentCard(): AddPatentModalPage {
        editButton.click();
        return this;
    }

    public clickPatentCard(): AddPatentModalPage {
        this.pause(3000);
        patentCard.click();
        return this;
    }
}
