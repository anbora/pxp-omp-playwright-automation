// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";

export class MatchingAnalysisModalPage extends BasePage {

    public matchModalHeader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/child::h1");
    public matchModalDescription: Locator = this.locator("//h3[@class='tm__match-modal--description']/child::span");
    public matchModalTab(tabName: string): Locator {
      return this.getLocatorWithParam("//label[@class='title'][text()='%s']/parent::button", tabName);
    }
    public matchModalTabTitle(label: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__match-modal-tabs']/descendant::label[@class='title'][text()='%s']", label);
    }
    public matchModalTabIcon(tabName: string): Locator {
      return this.getLocatorWithParam("//label[@class='title'][text()='%s']/preceding-sibling::div", tabName);
    }
    public matchModalTabDescription(tabName: string): Locator {
      return this.getLocatorWithParam("//label[@class='title'][text()='%s']/following-sibling::label", tabName);
    }
    public noDataContainerDescription: Locator = this.page.locator("//div[@class='tm__match-modal-nodata-container']/child::span");
    public skillStatusLabel(skillName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div/parent::td/following-sibling::td[1]/descendant::span", skillName);
    }
    public skillStatusIcon(skillName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div/parent::td/following-sibling::td[1]/descendant::i", skillName);
    }
    public skillYourLevelLabel(skillName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div/parent::td/following-sibling::td[2]/descendant::p", skillName);
    }
    public skillTargetLevelLabel(skillName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div/parent::td/following-sibling::td[3]/descendant::p", skillName);
    }
    public preference(preferenceName: string): Locator {
      return this.getLocatorWithParam("//span[@class='cell-title'][text()='%s']/parent::p", preferenceName);
    }
    public preferenceStatus(preferenceName: string): Locator {
      return this.getLocatorWithParam("//span[@class='cell-title'][text()='%s']/ancestor::td/following-sibling::td/descendant::span", preferenceName);
    }
    public experienceDescription: Locator = this.page.locator("//div[@class='tm__match-modal-table-container table-experience']/descendant::p[1]");
    public experienceStatus: Locator = this.page.locator("//div[@class='tm__match-modal-table-container table-experience']/descendant::p[2]");
    public experienceStatusIcon: Locator = this.page.locator("//div[@class='tm__match-modal-table-container table-experience']/descendant::i");
    public experienceCheckStatusIcon: Locator = this.page.locator("//label[text()='Experience']/preceding-sibling::div[@class='progress-tab-icon primary-color icon-check']");
    public numberOfPossessedSkills: Locator = this.page.locator("//label[text()='Skills']/parent::button/label[@class='desc']");
    public addSkillsToPassportButton: Locator = this.page.locator("//div[@class='tm__match-modal-nodata-container']/child::button[contains(@class,'ed-btn ed-btn-primary')][text()='Add skills to passport']");
    public updateYourSkillsButton: Locator = this.getByRole(AriaRole.BUTTON, "Update your skills");
    public addPreferencesButton: Locator = this.page.locator("//div[@class='tm__match-modal-nodata-container']/child::button[contains(@class,'ed-btn ed-btn-primary')][text()='Add preferences']");
    public addExperienceButton: Locator = this.page.locator("//div[@class='tm__match-modal-nodata-container']/child::button[contains(@class,'ed-btn ed-btn-primary')][text()='Add experience']");
    public searchAspirationalJobRoleButton: Locator = this.page.locator("//div[@class='tm__match-modal-nodata-container']/child::button[contains(@class,'ed-btn ed-btn-primary')][text()='Search aspirational Job Role']");
    public updateButton: Locator = this.page.locator("//button[contains(@class,'tm__match-modal-link ed-link-secondary')]");
    public buttonClose: Locator = this.page.locator(".ed-dialog-modal-footer  button");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectTab(tabName: string): MatchingAnalysisModalPage {
        this.matchModalTab(tabName).click();
        return this;
    }

    public addSkillsToPassport(): SkillsCareerProfileModalPage {
        addSkillsToPassportButton.click();
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }

    public updateSkills(): SkillsCareerProfileModalPage {
        updateYourSkillsButton.click();
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }

    public addPreferences(): PreferencesCareerProfileModalPage {
        addPreferencesButton.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public addExperience(): ExperienceCareerProfileModalPage {
        addExperienceButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public searchAspirationalJobRole(): CareerPathPage_New {
        searchAspirationalJobRoleButton.click();
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public clickCLose(): JobVacancyDetailsPage {
        buttonClose.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }
}
