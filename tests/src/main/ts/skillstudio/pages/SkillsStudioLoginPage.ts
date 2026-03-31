// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";
import { SkillStudioPopup } from "skillstudio/pages/SkillStudioPopup";

export class SkillsStudioLoginPage extends SkillsStudioGlobalNavigationPage {

    public emailInput: Locator = this.page.locator("#email");
    public passwordInput: Locator = this.page.locator("#password");
    public loginButton: Locator = this.page.locator("//button[@type='submit']");
    public verification_admin_role: Locator = this.page.locator("//span[text()='admin']");
    public Change_Organization_Button_Loc: Locator = this.page.locator("//button[text()='Change Space']");
    public HomepageMoreButtonLoc: Locator = this.page.locator("//div[@class='dropdown-wrapper ed-header--more']");
    public SkillStudioButtonLoc: Locator = this.page.locator("//label[text()='Skills Studio']");

    constructor(browser: Browser, pageHandler: PageHandler, url: string, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, url, logger, portalIndex);

    }

    public loginToSkillStudio(Username: string, Password: string): SkillsStudioLoginPage {
        emailInput.fill(Username);
        passwordInput.fill(Password);
        loginButton.click();
        return this;
    }

    public loginToEdcastQASkillsOrg(Username: string, Password: string): SkillsStudioLoginPage {
        emailInput.fill(Username);
        passwordInput.fill(Password);
        //loginCheckBoxLoc.check();
        loginButton.click();
        return this;
    }

    public launchSkillStudio(): SkillStudioPopup {
        HomepageMoreButtonLoc.click();
        return this.openPageInNewTab(SkillStudioButtonLoc, SkillStudioPopup);
    }
}
