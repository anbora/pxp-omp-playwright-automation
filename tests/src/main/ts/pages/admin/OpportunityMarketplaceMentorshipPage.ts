import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class OpportunityMarketplaceMentorshipPage extends BasePage {

    public labelsTab: Locator = this.page.locator("//div[@id='talent-marketplace-mentorship-tabs']/ul[@role='tablist']/li[2]/a[@role='tab']");
    public enableMentorship: Locator = this.page.locator("//label[text()='Enable Mentorship']");
    public mentorshipLabel: Locator = this.page.locator("//div[text()='Mentorship']");
    public mentorshipsLabel: Locator = this.page.locator("//div[text()='Mentorships']");
    public beMentoredBySomeoneLabel: Locator = this.page.locator("//div[text()='Be mentored by someone you admire']");
    public menteeLabel: Locator = this.page.locator("//div[text()='Mentee']");
    public menteesLabel: Locator = this.page.locator("//div[text()='Mentees']");
    public mentorLabel: Locator = this.page.locator("//div[text()='Mentor']");
    public mentorsLabel: Locator = this.page.locator("//div[text()='Mentors']");
    public disableMentorshipToggle: Locator = this.page.locator("//div[@class='bootstrap-switch-container']");
    public clickSaveButton: Locator = this.page.locator("//div[@id='talent-marketplace-mentorship-configuration-tab']/descendant::button[text()='Save']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLabelsButton(): OpportunityMarketplaceMentorshipPage {
        labelsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceMentorshipPage);
    }

    public disableMentorship(): OpportunityMarketplaceMentorshipPage {
        disableMentorshipToggle.click();
        clickSaveButton.click();
        this.pause(5000);
        return this.getPageClassInstance(OpportunityMarketplaceMentorshipPage);
    }
}
