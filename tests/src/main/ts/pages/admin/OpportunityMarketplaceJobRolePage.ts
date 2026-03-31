// @ts-nocheck
import { S } from "com/redis/S";
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class OpportunityMarketplaceJobRolePage extends BasePage {

    public enableJobRoles: Locator = this.page.locator("//label[text()='Enable Job Roles']");
    public enableShowUserCarousel: Locator = this.page.locator("//label[text()='Enable Show User Carousel']");
    public maxAspirationalRoles: Locator = this.page.locator("//label[text()='Max Aspirational Roles']");
    public jobRoleLabel: Locator = this.page.locator("//div[text()='Job Role']");
    public jobRolesLabel: Locator = this.page.locator("//div[text()='Job Roles']");
    public browseJobRolesLabel: Locator = this.page.locator("//div[text()='Browse Job Roles to see in demand skills and personalized learning plans']");
    public SelectRoleLabel: Locator = this.page.locator("//div[text()='Select a role which interest you and we can help you with a learning plan to get there.']");
    public careerExplorationLabel: Locator = this.page.locator("//div[text()='Career Exploration']");
    public discoverOpportunitiesLabel: Locator = this.page.locator("//div[text()='Discover Opportunities to enhance your career']");
    public levelRankRestrictionsHeader: Locator = this.page.locator("//div[@class='talent-marketplace-config-level-rank']/p[text()='Level Rank Restrictions']");
    public numberOfLevelRanksHigher: Locator = this.page.locator("//div[@class='talent-marketplace-config-level-rank']/div[1]/label[@class='control-label']");
    public numberOfLevelRanksLower: Locator = this.page.locator("//div[@class='talent-marketplace-config-level-rank']/div[2]/label[@class='control-label']");
    public labelsTab: Locator = this.page.locator("//div[@id='talent-marketplace-job-role-tabs']/ul[@role='tablist']/li[2]/a[@role='tab']");
    public recommendationsTab: Locator = this.page.locator("//div[@id='talent-marketplace-job-role-tabs']/ul[@role='tablist']/li[3]/a[@role='tab']");
    public levelRanksHigherSelect: Locator = this.page.locator("//label[contains(text(), 'level ranks higher')]/parent::div/div[contains(@class, 'level-rank-select')]/descendant::div[contains(@class, 'singleValue')]");
    public levelRanksLowerSelect: Locator = this.page.locator("//label[contains(text(), 'level ranks lower')]/parent::div/div[contains(@class, 'level-rank-select')]/descendant::div[contains(@class, 'singleValue')]");
    public levelRanksOption(option: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", option);
    }
    public locationRestrictionCheckbox: Locator = this.page.locator("#location_restriction");
    public locationRestrictionAction: Locator = this.page.locator("#location_restriction + .automatic-assign-job-slider");
    public saveButton: Locator = this.page.locator("//button[text() = 'Save']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLabelsButton(): OpportunityMarketplaceJobRolePage {
        labelsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceJobRolePage);
    }

    public clickRecommendationsButton(): OpportunityMarketplaceJobRolePage {
        recommendationsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceJobRolePage);
    }

    public selectLevelRanksHigher(levelRank: string): OpportunityMarketplaceJobRolePage {
        levelRanksHigherSelect.click();
        this.levelRanksOption(levelRank).click();
        return this;
    }

    public selectLevelRanksLower(levelRank: string): OpportunityMarketplaceJobRolePage {
        levelRanksLowerSelect.click();
        this.levelRanksOption(levelRank).click();
        return this;
    }

    public clickSaveButton(): OpportunityMarketplaceJobRolePage {
        saveButton.last().click();
        this.pause(2000);
        return this;
    }

    public enableOrDisableLocationPreferences(enable: boolean): OpportunityMarketplaceJobRolePage {
        if (!locationRestrictionCheckbox.isChecked(new Locator.IsCheckedOptions().setTimeout(10000)) && enable) {
            locationRestrictionAction.click();
        } else if (locationRestrictionCheckbox.isChecked(new Locator.IsCheckedOptions().setTimeout(10000)) && !enable){
            locationRestrictionAction.click();
        }
        return this;
    }
}
