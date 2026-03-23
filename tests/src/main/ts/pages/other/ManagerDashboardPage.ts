import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class ManagerDashboardPage extends BasePage {

    public rateSkillsButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Rate skills']");
    public teamMatrixHeader: Locator = this.page.locator("//div[@class='team-matrix-title']");
    public teamMembersColumnTitle: Locator = this.page.locator("//span[@class='label ' and contains(text(),'Team members')]");
    public filtersIcon: Locator = this.page.locator("//div[@class='toolbar-container']/div/button/b/i[@class='icon-filter']");
    public legendIcon: Locator = this.page.locator("//div[@class='toolbar-container']/div[@class='icon-button border-left']/button/b/following-sibling::span/b[text()='Legend']");
    public rateSkillsModalHeader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Review and rate your team']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickRateSkills(): ManagerDashboardPage {
        this.page.waitForLoadState();
        rateSkillsButton.click();
        return this;
    }

}
