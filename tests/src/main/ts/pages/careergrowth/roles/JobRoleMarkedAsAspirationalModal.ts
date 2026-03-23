import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { SetYourLerningGoalsModalPage } from "pages/careergrowth/SetYourLerningGoalsModalPage";

export class JobRoleMarkedAsAspirationalModal extends SetYourLerningGoalsModalPage {
    public header: Locator = this.page.locator(".goals-modal-content-for-aspirational__text");
    public warning: Locator = this.page.locator(".goals-modal-content-for-aspirational__warning");
    public addSkillsCustomerService: Locator = this.page.locator("//tr[4]/td[1]/div/div/label/span[@class='ed-checkbox-label ltr-direction']");
    public optionallyAddSkillsAddModal: Locator = this.page.locator("//div[@role='dialog']//button[@class='ed-btn ed-btn-primary']");
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public optionallyAddSkillsSelectModal(skillLabel: string): JobRoleMarkedAsAspirationalModal {
        this.skillCheckbox(skillLabel).click();
        return this;
    }
    public optionallyAddSkillsAddModal(): RoleDetailsPage {
        optionallyAddSkillsAddModal.click();
        return this.getPageClassInstance(RoleDetailsPage);
    }
}
