import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJobRolePage } from "pages/admin/CreateJobRolePage";

export class HrDataPage extends BasePage {

    public sidebar: Locator = this.page.locator("//span/parent::a/parent::li");
    public addJobRoleButton: Locator = this.page.locator("//button[text()='Add Job Role']");
    public jobRoleSearch: Locator = this.page.locator("//h4[text()='Manage Job Roles']/parent::div/parent::div/descendant::input[@class='search__input']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

	public addJobRole(): CreateJobRolePage {
        addJobRoleButton.click();
        return this.getPageClassInstance(CreateJobRolePage);
    }

    public searchForJobRole(roleName: string): CreateJobRolePage {
        jobRoleSearch.click();
        jobRoleSearch.fill(roleName);
        jobRoleSearch.press("Enter");
        return this.getPageClassInstance(CreateJobRolePage);
    }
}
