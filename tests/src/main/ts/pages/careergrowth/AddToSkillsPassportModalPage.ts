import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";

export class AddToSkillsPassportModalPage extends BasePage {

    public skillCheckbox(skillLabel: string): Locator {

      return this.getLocatorWithParam("//span[text()='%s']/ancestor::label/input", skillLabel);

    }
    public allSkillsCheckbox: Locator = this.page.locator("//input[@aria-label='Select all skills']");
    public passportSkillsColumn(skillLabel: string, columnNumber: number): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/ancestor::tr/td[%s]", skillLabel,String.valueOf(columnNumber));
    }
    public addSkillButton: Locator = this.page.locator(".ed-dialog-modal-footer button.ed-btn-primary");
    public saveButton: Locator = this.page.locator(".ed-dialog-modal-footer button.ed-btn-primary");
    public closeAddSkillToPassportButton: Locator = this.page.locator(".ed-dialog-modal-footer button.ed-btn-neutral");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public markSkill(skillLabel: string): AddToSkillsPassportModalPage {
        this.skillCheckbox(skillLabel).first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.skillCheckbox(skillLabel).click();
        this.pause(3000);
        return this;
    }

    public markAllSkill(): AddToSkillsPassportModalPage {
        this.pause(1000);
        allSkillsCheckbox.click();
        this.pause(3000);
        return this;
    }

    public selectLevelForSkill(skillLabel: string, level: string): AddToSkillsPassportModalPage {
        this.pause(2000);
        this.passportSkillsColumn(skillLabel, 3).locator("//select").selectOption(level);
        return this;
    }

    public clickAddSkills(): JobVacancyDetailsPage {
        addSkillButton.click();
        this.page.locator(".success").first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public clickSave(): JobVacancyDetailsPage {
        saveButton.click();
        this.pause(6000);
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public clickClose(): JobVacancyDetailsPage {
        closeAddSkillToPassportButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }
}
