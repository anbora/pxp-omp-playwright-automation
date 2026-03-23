import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { AddToSkillsPassportModalPage } from "pages/careergrowth/AddToSkillsPassportModalPage";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";

export class JobVacancySkillModalPage extends BasePage {

    public skillsPassportNumberOfSkills(userSkills: string): Locator {

      return this.getLocatorWithParam("//h3[contains(text(), 'You have %s out of')][contains(text(), ' skills in your skill passport.')]", userSkills);

    }
    public skillsPassportNumberOfSkills_SkillLevel(userSkills: string): Locator {
      return this.getLocatorWithParam("//button[contains(text(), 'You have %s out of')][contains(text(), ' of the desired skills based on your profile')]", userSkills);
    }
    public addSkillToPassport: Locator = this.page.locator("//div[@class='vertical-spacing-large']/descendant::a[1]");
    public addToSkillPassportElement(skill: string): Locator {
      return this.getLocatorWithParam("//span[@class='skill-title'][text()='%s']/following-sibling::button", skill);
    }
    public skillCheckbox_SkillLevel(skill: string): Locator {
      return this.getLocatorWithParam("//input[@aria-label='%s']", skill);
    }
    public allSkillsCheckbox: Locator = getByRole(AriaRole.TEXTBOX, "Select all skills").build();
    public skillCheckbox(skill: string): Locator {
      return this.getByRole(AriaRole.CHECKBOX, skill, true).build();
    }
    public levelOption(skill: string): Locator {
      return this.getByRole(AriaRole.ROW, skill + " " + skill).getByRole(AriaRole.COMBOBOX).build();
    }
    public addIntermediateSkillLevel: Locator = this.page.locator("//input[@value='intermediate']");
    public addButton: Locator = getByRole(AriaRole.BUTTON, "Add", true).build();
    public addSkillButton_SkillLevel: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/child::button[contains(text(), 'Add')]");
    public saveButton: Locator = getByRole(AriaRole.TEXTBOX, "Save").build();
    public closeButton: Locator = this.page.locator("//button[contains(text(), 'Close')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public addFirstSkillOnTheListToPassport(): JobVacancySkillModalPage {
        addSkillToPassport.click();
        return this;
    }

    public addToSkillPassport(skill: string): JobVacancySkillModalPage {
        this.addToSkillPassportElement(skill).click();
        return this;
    }

    public selectSkill(skill: string): JobVacancySkillModalPage {
        this.skillCheckbox_SkillLevel(skill).click();
        return this;
    }

    public selectLevel(skill: string, level: string): JobVacancySkillModalPage {
        this.skillCheckbox(skill).click();
        this.levelOption(skill).selectOption(level);
        return this;
    }

    public addSkill(): JobVacancyDetailsPage {
        addButton.click();
        this.pause(2000);
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public selectAllSKills(): JobVacancySkillModalPage {
        allSkillsCheckbox.click();
        return this;
    }

    public clickSaveButton(): JobVacancyDetailsPage {
        saveButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

	public closeAddSkillModal(): JobVacancyDetailsPage {
        closeButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }
}
