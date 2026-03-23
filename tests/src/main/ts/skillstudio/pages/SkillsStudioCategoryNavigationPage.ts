import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export abstract class SkillsStudioCategoryNavigationPage extends SkillsStudioGlobalNavigationPage{

    public New_Category_Type_Loc: Locator = this.page.locator("//button[text()='New Category Type']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    constructor(browser: Browser, pageHandler: PageHandler, url: string, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, url, logger, portalIndex);

    }

    public <T extends BasePage> navigateToNewCategoryTypeLink(clazz: Class<T>): T {
        New_Category_Type_Loc.click();
        return this.getPageClassInstance(clazz);
    }

}
