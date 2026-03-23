import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export class OrganizationOperationPage extends SkillsStudioGlobalNavigationPage{

    public Change_Organization_Button_Loc: Locator = this.page.locator("//button[text()='Change Organization']");
    public select_organization_loc(org_name: string): Locator {
      return this.getLocatorWithParam("//li[text()='%s']", org_name);
    }
    public verification_organization_name_loc(org_name: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']", org_name);
    }
    public verification_super_admin_role: Locator = this.page.locator("//span[text()='superadmin']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public changeOrganization(org_name: string): OrganizationOperationPage {
        Change_Organization_Button_Loc.click();
        this.selectOrganization(org_name, OrganizationOperationPage);
        return this;
    }
}
