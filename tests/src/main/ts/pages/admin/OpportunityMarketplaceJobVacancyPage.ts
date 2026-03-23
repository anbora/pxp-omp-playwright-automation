import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class OpportunityMarketplaceJobVacancyPage extends BasePage {

    public labelsTab: Locator = this.page.locator("//div[@id='talent-marketplace-job-vacancy-tabs']/ul[@role='tablist']/li[2]/a[@role='tab']");
    public recommendationsTab: Locator = this.page.locator("//div[@id='talent-marketplace-job-vacancy-tabs']/ul[@role='tablist']/li[4]/a[@role='tab']");
    public skillsTab: Locator = this.page.locator("//div[@id='talent-marketplace-job-vacancy-tabs']/ul[@role='tablist']/li[3]/a[@role='tab']");
    public enableJobVacancy: Locator = this.page.locator("//label[text()='Enable Job Vacancy']");
    public jobVacancy: Locator = this.page.locator("//div[text()='Job Vacancy']");
    public jobVacancies: Locator = this.page.locator("//div[text()='Job Vacancies']");
    public browseCurrentInternal: Locator = this.page.locator("//div[text()='Browse current internal Job Vacancies']");
    public automaticallyAssignSkills: Locator = this.page.locator("//div[2]/div[@class='col-xs-6']/label[@class='control-label']");
    public overrideDetectedSkills: Locator = this.page.locator("//div[3]/div[@class='col-xs-6']/label[@class='control-label']");
    public detectedSkillsLevelHeader: Locator = this.page.locator("//div[@class='talent-marketplace-config-radio-skills']/p[text()='Detected skills level']");
    public detectedSkillsLevelText: Locator = this.page.locator("//div/span[text()='All detected skills will be set to the value you choose here']");
    public maximumNumberOfSkills: Locator = this.page.locator("//div/label[text()='Maximum number of skills assigned to job vacancy']");
    public levelRankRestrictionsHeader: Locator = this.page.locator("//div[@class='talent-marketplace-config-level-rank']/p[text()='Level Rank Restrictions']");
    public numberOfLevelRanksHigher: Locator = this.page.locator("//div[@class='talent-marketplace-config-level-rank']/div[1]/label[@class='control-label']");
    public numberOfLevelRanksLower: Locator = this.page.locator("//div[2]/label[@class='control-label']");
    public levelRanksHigherSelect: Locator = this.page.locator("//label[contains(text(), 'level ranks higher')]/parent::div/div[contains(@class, 'level-rank-select')]/descendant::div[contains(@class, 'singleValue')]");
    public levelRanksLowerSelect: Locator = this.page.locator("//label[contains(text(), 'level ranks lower')]/parent::div/div[contains(@class, 'level-rank-select')]/descendant::div[contains(@class, 'singleValue')]");
    public levelRanksOption(option: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", option);
    }
    public saveButton: Locator = this.page.locator("//button[text() = 'Save']");
    public locationRestrictionCheckbox: Locator = this.page.locator("#location_restriction");
    public locationRestrictionAction: Locator = this.page.locator("#location_restriction + .automatic-assign-job-slider");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLabelsButton(): OpportunityMarketplaceJobVacancyPage {
        labelsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceJobVacancyPage);
    }

    public clickSkillsButton(): OpportunityMarketplaceJobVacancyPage {
        skillsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceJobVacancyPage);
    }

    public clickRecommendationsButton(): OpportunityMarketplaceJobVacancyPage {
        recommendationsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceJobVacancyPage);
    }

    public selectLevelRanksHigher(levelRank: string): OpportunityMarketplaceJobVacancyPage {
        levelRanksHigherSelect.click();
        this.levelRanksOption(levelRank).click();
        return this;
    }

    public selectLevelRanksLower(levelRank: string): OpportunityMarketplaceJobVacancyPage {
        levelRanksLowerSelect.click();
        this.levelRanksOption(levelRank).click();
        return this;
    }

    public enableOrDisableLocationPreferences(enable: boolean): OpportunityMarketplaceJobVacancyPage {
        if (!locationRestrictionCheckbox.isChecked(new Locator.IsCheckedOptions().setTimeout(10000)) && enable) {
            locationRestrictionAction.click();
        } else if (locationRestrictionCheckbox.isChecked(new Locator.IsCheckedOptions().setTimeout(10000)) && !enable){
            locationRestrictionAction.click();
        }
        return this;
    }

    public enableOrDisableOrganizationPreferences(enable: boolean): OpportunityMarketplaceJobVacancyPage {
        if (!locationRestrictionCheckbox.isChecked(new Locator.IsCheckedOptions().setTimeout(10000)) && enable) {
            locationRestrictionAction.click();
        } else if (locationRestrictionCheckbox.isChecked(new Locator.IsCheckedOptions().setTimeout(10000)) && !enable){
            locationRestrictionAction.click();
        }
        return this;
    }

    public clickSaveButton(): OpportunityMarketplaceJobVacancyPage {
        saveButton.last().click();
        this.pause(2000);
        return this;
    }
}
