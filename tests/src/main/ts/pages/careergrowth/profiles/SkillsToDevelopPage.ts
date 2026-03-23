import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";

export class SkillsToDevelopPage extends UpdateCareerProfilePage {

    public skillToLowerCase(skill: string): string {

      return String.format("[translate(text(),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')=translate('%s','abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')]", skill);

    }
    public xButton: Locator = this.page.locator("//button[@class = 'close-btn']");
    public readonly saveButton: Locator = this.page.locator("//button[text()='Save']");
    public optionToSelect(skill: string): Locator {
      return this.getLocatorWithParam("//div[@tabindex = '-1']" + skillToLowerCase(skill));
    }
    public skillOfLevelInput(skillLevel: string): Locator {
      return this.getLocatorWithParam("//input[@id='skill-search-%s']", skillLevel);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickSkipForNowButton(): PreferencesCareerProfileModalPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        skipForNow.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        skipForNow.click();
        this.pause(2000);
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public clickXButton(): WelcomePage_New {

      return clickXButton(WelcomePage_New);

    }

    public <T extends BasePage> clickXButton(clazz: Class<T>): T {
        this.pause(2500);
        xButton.click();
        return this.getPageClassInstance(clazz);
    }

    public clickSaveButton(): WelcomePage_New {
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveButton.click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public searchForSkill(skillLabel: string, skillLevel: string): SkillsToDevelopPage {
        this.skillOfLevelInput(skillLevel).fill(skillLabel);
        return this;
    }

    public selectOptionFromSkillsDropdown(skill: string): SkillsToDevelopPage {
        this.optionToSelect(skill).first().click();
        return this;
    }

    public clickSaveAndContinueButton(): PreferencesCareerProfileModalPage {
        this.pause(2000);
        this.saveAndContinue().first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.saveAndContinue().click();
        this.pause(2000);
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }
}
