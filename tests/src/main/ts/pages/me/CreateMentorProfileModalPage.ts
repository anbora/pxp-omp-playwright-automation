import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { MePageProfile } from "pages/me/MePageProfile";

export class CreateMentorProfileModalPage extends MePageProfile {

    public addSkillsInput: Locator = this.page.locator("//input[@class ='ed-multi-select__input']");
    public addDescriptionInput: Locator = this.page.locator("//div[@id='mentorship-description']");
    public createProfileButton: Locator = this.page.locator("//button[contains(text(),'Create Profile')]");
    public skillSelectFromSearchResults(skillName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'ed-multi-select__option') and text()='%s']", skillName);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
    public clickAddSkillsToSkillsPassportButton(skillName: string): CreateMentorProfileModalPage {
        addSkillsInput.click();
        addSkillsInput.fill(skillName);
        this.skillSelectFromSearchResults(skillName).click();
        return this;
    }
    public addDescription(description: string): CreateMentorProfileModalPage {
        addDescriptionInput.click();
        addDescriptionInput.fill(description);
        this.page.keyboard().press("Backspace");
        return this;
    }
    public createProfile(): MePageProfile {
        createProfileButton.click();
        return this.getPageClassInstance(MePageProfile);
    }
}
