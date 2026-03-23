import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";

/**
 * New flexible, proficiency levels are used in a several places where the same component is used, therefore
 * support for common actions has been extracted to this helper class.
 */
export class ProficiencySkillsLevelsHandler  {
    public static readonly SKILLS_CONTAINER: string = "//div[contains(@class, 'ed-skill-sectio')][descendant::h3[text()='%s']]/descendant::div[contains(@class, 'ed-tag-container')]";
    public static readonly FILTERED_OPTION_XPATH: string = "//div[@tabindex = '-1'][text()='%s']";
    private envelopingPage: Page;
    private skillsInput: Locator;
    private levelSelector: Locator;
    private addButton: Locator;

    constructor(envelopingPage: Page) {
        this.envelopingPage = envelopingPage;
      let skillsInput:  = envelopingPage.locator("input#skill-search");
      let levelSelector:  = envelopingPage.locator("select.ed-select");
      let addButton:  = envelopingPage.locator(".project-form-field .ed-btn-primary");
    }

    public setSkillName(skillName: string): ProficiencySkillsLevelsHandler {
        skillsInput.first().waitFor(new Locator.WaitForOptions().setTimeout(10000).setState(WaitForSelectorState.VISIBLE));
        skillsInput.fill(skillName);
        return this;
    }
    public selectLevel(level: string): ProficiencySkillsLevelsHandler {
        levelSelector.selectOption(level);
        return this;
    }

    public clickAdd(): ProficiencySkillsLevelsHandler {
        addButton.click();
        return this;
    }

    public clickFilteredValue(skillName: string): ProficiencySkillsLevelsHandler {
        envelopingPage.locator(String.format(FILTERED_OPTION_XPATH, skillName)).click();
        return this;
    }

    public addSkillToLevel(skillName: string, level: string): ProficiencySkillsLevelsHandler {
        this.setSkillName(skillName)
                .clickFilteredValue(skillName)
                .selectLevel(level)
                .clickAdd();
        return this;
    }

    public getSkillsContainerOfLevel(level: string): Locator {

      return envelopingPage.locator(String.format(SKILLS_CONTAINER, level));

    }

    public removeSkillFromLevel(skillName: string, level: string): ProficiencySkillsLevelsHandler {
        this.getSkillsContainerOfLevel(level).all()
                .stream()
                .filter(chips=>chips.textContent().equalsIgnoreCase(skillName))
                .findFirst()
                .get()
                .locator("button")
                .click();

        return this;
    }
}
