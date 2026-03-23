import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { MatchLevelRecommendationConfigPage } from "pages/admin/MatchLevelRecommendationConfigPage";

export class OpportunityMarketplaceGeneralPage extends BasePage {

    public enableOpportunityMarketplace: Locator = this.page.locator("//label[text()='Enable Talent Marketplace']");
    public enableLandingPage: Locator = this.page.locator("//label[text()='Enable Landing Page (Beta)']");
    public labelsTab: Locator = this.page.locator("//div[@id='talent-marketplace-general-tabs']/ul[@role='tablist']/li[2]/a[@role='tab']");
    public standardFieldsTab: Locator = this.page.locator("//div[@id='talent-marketplace-general-tabs']/ul[@role='tablist']/li[3]/a[@role='tab']");
    public welcomeLabel: Locator = this.page.locator("//div[text()='Welcome']");
    public welcomeToOpportunityMarketplaceLabel: Locator = this.page.locator("//div[text()='Welcome to Talent Marketplace!']");
    public jabFamilyLabel: Locator = this.page.locator("//div[text()='Job Family']");
    public suggestionsLabel: Locator = this.page.locator("//div[text()='Suggestions']");
    public justForYouLabel: Locator = this.page.locator("//div[text()='Just for you! Suggestions based on your profile and preference']");
    public letUsKnowLabel: Locator = this.page.locator("//div[text()='Let us know if you are open to hear about opportunities']");
    public workplaceModelLabel: Locator = this.page.locator("//div[text()='Workplace Model']");
    public jobTypeLabel: Locator = this.page.locator("//div[text()='Job Type']");
    public scheduleLabel: Locator = this.page.locator("//div[text()='Schedule']");
    public careerGoalLabel: Locator = this.page.locator("//div[text()='Career Goal']");
    public openToOffersLabel: Locator = this.page.locator("//div[text()='Open to offers']");
    public matchRecommendationConfigurationTab: Locator = this.page.locator("//a[text()='Match/Recommendation configuration']");
    public matchLevelAction(matchLevel: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/preceding-sibling::div/child::div", matchLevel);
    }
    public iconSetRadiobutton(iconSet: string): Locator {
      return this.getLocatorWithParam("//input[@type='radio'][@id='%s']", iconSet);
    }
    public disableTalentMarketPlaceToggle: Locator = this.page.locator("//div[@class='bootstrap-switch-container']");
    public clickSaveButton: Locator = this.page.locator("//div[@id='talent-marketplace-general-configuration-tab']/descendant::button[text()='Save']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLabelsButton(): OpportunityMarketplaceGeneralPage {
        labelsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceGeneralPage);
    }

    public clickStandardFieldsButton(): OpportunityMarketplaceGeneralPage {
        standardFieldsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceGeneralPage);
    }

    public clickMatchRecommendationConfigurationButton(): OpportunityMarketplaceGeneralPage {
        matchRecommendationConfigurationTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceGeneralPage);
    }

    public clickActionButton(match: string): MatchLevelRecommendationConfigPage {
        this.matchLevelAction(match).click();
        return this.getPageClassInstance(MatchLevelRecommendationConfigPage);
    }

    public disableTalentMarketPlace(): OpportunityMarketplaceGeneralPage {
        disableTalentMarketPlaceToggle.click();
        clickSaveButton.click();
        this.pause(5000);
        return this.getPageClassInstance(OpportunityMarketplaceGeneralPage);
    }
}
