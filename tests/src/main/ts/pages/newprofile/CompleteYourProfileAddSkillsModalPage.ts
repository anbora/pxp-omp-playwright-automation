// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { MePageProfile } from "pages/me/MePageProfile";

export class CompleteYourProfileAddSkillsModalPage extends MePageProfile {

    public addSkillTag: Locator = this.page.locator("//div[@class='user-skill-tag'][1]");
    public selectSkillLevel: Locator = this.page.locator("//button[contains(text(), 'Novice')]");
    public saveButton: Locator = this.page.locator("//button[contains(text(), 'Save')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddSkillTag(): CompleteYourProfileAddSkillsModalPage {
        addSkillTag.click();
        return this;
    }

    public selectSkillLevel(): CompleteYourProfileAddSkillsModalPage {
        selectSkillLevel.click();
        return this;
    }

    public clickSaveButton(): CompleteYourProfileAddSkillsModalPage {
        saveButton.click();
        return this;
    }
}
