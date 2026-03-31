// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { JobRoleMarkedAsAspirationalModal } from "pages/careergrowth/roles/JobRoleMarkedAsAspirationalModal";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";

export class SetYourLerningGoalsModalPage extends RoleDetailsPage {
    public skillCheckbox(skillLabel: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/ancestor::label/input", skillLabel);
    }
    public learningGoalColumn(skillLabel: string, columnNumber: number): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/ancestor::tr/td[%s]", skillLabel,String.valueOf(columnNumber));
    }
    public addLearningGoalButton: Locator = this.page.locator("button[aria-label='Add']");
    public closeLearningGoalButton: Locator = this.page.locator("//div[@role='dialog']//button[@class='ed-btn ed-btn-neutral']");
    public optionallyAddSkillsCloseModal: Locator = this.page.locator("//div[@role='dialog']//button[@class='ed-btn ed-btn-neutral']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
    public markSkill(skillLabel: string): SetYourLerningGoalsModalPage {
        this.skillCheckbox(skillLabel).click();
        this.pause(1000);
        return this;
    }

    public closeLearningGoalModal(): SetYourLerningGoalsModalPage {
        closeLearningGoalButton.click();
        return this.getPageClassInstance(JobRoleMarkedAsAspirationalModal);
    }
    public selectLearningTargetLevelForSkill(skillLabel: string, level: string): SetYourLerningGoalsModalPage {
        this.learningGoalColumn(skillLabel, 3).locator("//select").selectOption(level);
        return this;
    }
//    public <T extends RoleDetailsPage> T clickAdd(){
//        addLearningGoalButton.click();
//        return (T) getPageClassInstance(RoleDetailsPage);
//    }

    public optionallyAddSkillsCloseModal(): SetYourLerningGoalsModalPage {
        optionallyAddSkillsCloseModal.click();
        return this;
    }
}
