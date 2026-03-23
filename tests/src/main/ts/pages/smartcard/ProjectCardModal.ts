import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class ProjectCardModal extends CreateSmartCardModal {

    private static readonly SAVING_BUTTON_XPATH: string = "//button[text()='Saving']";

    public multilingualTitle(langCode: string): Locator {

      return this.getLocatorWithParam("//input[@name='%s_title']", langCode);

    }
    public showPassingGradeCheckbox: Locator = this.page.locator("#passingGrade");
    public gradingScaleSelector: Locator = this.page.locator("#gradingScale");
    public selectPassingGrade: Locator = this.page.locator("//div[contains(@class, 'passing-score-field')]/descendant::select");
    public showNumberOfReattemptsToLearnerCheckbox: Locator = this.page.locator("#reattempts");
    public singleLanguageTitle: Locator = this.page.locator("//input[contains(@name,'title')]");
    public numberOfReAttemptsInput: Locator = this.page.locator("//input[@type ='number']");
    public archiveContentCheckbox: Locator = this.page.locator("//input[contains(@aria-label,'Archive this content')]");
    public nextMonth: Locator = this.page.locator("//button[@class='react-datepicker__navigation react-datepicker__navigation--next']");
    public archiveDate: Locator = this.page.locator("//span[@class='date-range-placeholder']");
    public seventeenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--017')]");
    public eighteenDay: Locator = this.page.locator("//div[starts-with(@class, 'react-datepicker__day react-datepicker__day--018')]");
    public threeDotsCardMenu: Locator = this.page.locator("//button[@class='cursor-pointer insight-dropdown-button']");
    public editSmartCard: Locator = this.page.locator("//ul[@role='menu']/descendant::li[contains(text(), 'Edit')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public fillInSingleLanguageTitle(title: string): ProjectCardModal {
       singleLanguageTitle.fill(title);
        return this;
    }

    public selectPassingGrade(grade: string): ProjectCardModal {
        selectPassingGrade.selectOption(grade);
        return this;
    }

    public clickShowPassingGradeCheckbox(): ProjectCardModal {
        showPassingGradeCheckbox.click();
        return this;
    }

    public selectGradingScale(scale: string): ProjectCardModal {
        gradingScaleSelector.selectOption(scale);
        return this;
    }

    public clickShowNumberOfReattemptsToLearnerCheckbox(): ProjectCardModal {
        showNumberOfReattemptsToLearnerCheckbox.click();
        return this;
    }

    public fillInNumberOfReattempts(number: string): ProjectCardModal {
    numberOfReAttemptsInput.fill(number);
    return this;
    }

    public clickArchiveContentCheckbox(): ProjectCardModal {
        archiveContentCheckbox.click();
        return this;
    }

    public chooseFifteenDayOfCurrentMonth(dataContainer: ResultContainer): ProjectCardModal {
        archiveDate.click();
        nextMonth.click();
        seventeenDay.click();
        dataContainer.setValue(archiveDate.textContent());
        return this;
    }

    public chooseEighteenDayOfNextMonth(dataContainer: ResultContainer): ProjectCardModal {
        archiveDate.click();
        nextMonth.click();
        eighteenDay.click();
        dataContainer.setValue(archiveDate.textContent());
        return this;
    }

    public clickUpdateProjectCardButton(): ProjectCardModal {
        createCardButton.click();
      while(null: this.page.querySelector(SAVING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(ProjectCardModal);
    }

    public editProjectSmartCard(): ProjectCardModal {
        threeDotsCardMenu.click();
        editSmartCard.click();
        return this.getPageClassInstance(ProjectCardModal);
    }
}
