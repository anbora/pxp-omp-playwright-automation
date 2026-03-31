// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";

export class SuggestedSkillsModalPage extends BasePage {
    public skillRow(skillLabel: string): Locator {
      return this.getLocatorWithParam("//table//tr//span[text()='%s']/ancestor::tr", skillLabel);
    }
    public readonly addButton: Locator = this.page.locator(".skills-suggested-for-user button.ed-btn-primary");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public markSkill(skillLabel: string): SuggestedSkillsModalPage {
        this.skillRow(skillLabel).locator("//input[@type='checkbox']").click();
        return this;
    }

    public selectLevelForSkill(skillLabel: string, skillLevel: string): SuggestedSkillsModalPage {
        this.skillRow(skillLabel).locator("//select").selectOption(skillLevel);
        return this;
    }

    public clickAdd(): SkillsCareerProfileModalPage {
        addButton.click();
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }
}
