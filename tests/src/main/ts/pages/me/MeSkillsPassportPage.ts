// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { AddSkillModalPage } from "pages/careergrowth/jobs/AddSkillModalPage";
import { ConfirmDeleteModalPage } from "pages/careergrowth/profiles/ConfirmDeleteModalPage";
import { MePageProfile } from "pages/me/MePageProfile";

export class MeSkillsPassportPage extends MePageProfile {

    public readonly skillsPassportAddSkillButton: Locator = this.page.locator("//button[text()='Add More']");
    public addedSkill(skill: string): Locator {
      return this.getLocatorWithParam("//div[@class='card-detail']/descendant::div[text()='%s']", skill);
    }
    public readonly skillEditButton: Locator = this.page.locator("//div[@class='header-actions-container']/button[text() = 'Edit']");
    public readonly skillDeleteButton: Locator = this.page.locator("//div[@class='header-actions-container']/button[text()='Delete']");
    public skillCounter(skillCounter: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'icon-container']/following-sibling::p[text() = '%s']", skillCounter);
    }

    public readonly skillDescription: Locator = this.page.locator("//div[@class='view-description']/descendant::span[1]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickSkillsPassportAddSkillButton(): MeSkillsPassportPage {
        skillsPassportAddSkillButton.click();
        return this;
    }

    public openSkillDetails(skill: string): MeSkillsPassportPage {
        this.addedSkill(skill).click();
        return this;
    }

    public editSkillDetails(): AddSkillModalPage {
        skillEditButton.click();
        return this.getPageClassInstance(AddSkillModalPage);
    }

    public deleteSkill(): ConfirmDeleteModalPage {
        skillDeleteButton.click();
        return this.getPageClassInstance(ConfirmDeleteModalPage);
    }
}
