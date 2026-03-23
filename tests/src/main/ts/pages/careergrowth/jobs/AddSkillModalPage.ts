import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";

export class AddSkillModalPage extends BasePage {

    private skillOptionsRadioButton(skill: string): Locator {

      return this.getLocatorWithParam("//span[text()='%s']", skill);

    }
    private workHistoryRadioButton: Locator = this.page.locator("//span[text()='Work History']");
    private readonly skillInputName: Locator = this.page.locator("//div[@class='edit-modal-margin']/descendant::div[text() = 'Start typing to filter skills']/following-sibling::div/input");
    private optionToSelect(skill: string): Locator {
      return this.getLocatorWithParam("//div[@tabindex = '-1'][contains(text(), '%s')]", skill);
    }
    private skillLevel(skill: string): Locator {
      return this.getLocatorWithParam("//input[@value='%s']", skill);
    }
    private readonly skillInput: Locator = this.page.locator("//input[@value='skill']");
    private skillLevel: Locator = this.page.locator("#skill_level");
    private readonly experienceYears: Locator = this.page.locator("select#SelectYears");
    private readonly experienceMonths: Locator = this.page.locator("select#SelectMonths");
    private yearValue(year: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']", year);
    }
    private monthValue(month: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']", month);
    }
    private readonly saveButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[text()='Save']");
    private readonly descriptionInput: Locator = this.page.locator("textarea#skill-description");
    private readonly closeButton: Locator = this.page.locator("//button[text()='Close']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectSkillType(): AddSkillModalPage {
        skillInput.click();
        return this;
    }

	public selectSkillFromInput(skill: string, skillName: string): AddSkillModalPage {
        skillInputName.fill(skill);
        this.optionToSelect(skillName).click();
        return this;
    }

	public selectYearValue(year: string): AddSkillModalPage {
        experienceYears.selectOption(year);
//        yearValue(year).click();
        return this;
    }

	public selectMonthValue(month: string): AddSkillModalPage {
        experienceMonths.selectOption(month);
//        monthValue(month).click();
        return this;
    }

	public selectSkillValue(skill: string): AddSkillModalPage {
        this.skillOptionsRadioButton(skill).click();
        return this;
    }

	public selectSkillLevel(level: string): AddSkillModalPage {
        skillLevel.selectOption(level);
        return this;

    }

	public clickSaveButton(): SkillsPassportMePage {
        saveButton.click();
        saveButton.waitFor(new Locator.WaitForOptions().setTimeout(3000).setState(WaitForSelectorState.HIDDEN));
        return this.getPageClassInstance(SkillsPassportMePage);
    }

	public addDescription(description: string): AddSkillModalPage {
        descriptionInput.fill(description);
        return this;
    }

    public selectWorkHistory(): ExperienceCareerProfileModalPage {
        workHistoryRadioButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public clickCloseButton(): SkillsPassportMePage {
        closeButton.click();
        return this.getPageClassInstance(SkillsPassportMePage);
    }
}
