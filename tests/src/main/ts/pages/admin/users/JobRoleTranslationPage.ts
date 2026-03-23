import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";

export class JobRoleTranslationPage extends BasePage {

    public language: Locator = this.page.locator("//div[@class='css-1hwfws3']");
    public dropdownSelect(language: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']", language);
    }
    public roleName: Locator = this.page.locator("div:nth-of-type(3) > input");
    public enterRoleDescription: Locator = this.page.locator(".form-horizontal [class='col-sm-12']:nth-of-type(5) [contenteditable]");
    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");
    public translationSummary: Locator = this.page.locator("//div/label[text()='Role Summary (Optional)']/parent::div/div/div/div/div/div");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickTranslationDropdown(selectLanguage: string): JobRoleTranslationPage {
        language.click();
        this.dropdownSelect(selectLanguage).click();
        return this;
    }
    public typeEnterRoleName(RoleName: string): JobRoleTranslationPage {
        roleName.click();
        roleName.fill(RoleName);
        return this;
    }
    public typeEnterRoleDescription(RoleDescriptionTranslation: string): JobRoleTranslationPage {
        enterRoleDescription.click();
        enterRoleDescription.fill(RoleDescriptionTranslation);
        return this;
    }
    public clickSaveButton(): HrDataJobRolesPage {
        saveButton.click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }
        }
