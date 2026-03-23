import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { AdminPanelPage } from "pages/admin/AdminPanelPage";
import { EditFieldModalPage } from "pages/admin/EditFieldModalPage";
import { LanguageModalPage } from "pages/admin/LanguageModalPage";
import { Interface1 } from "pages/careergrowth/jobs/Interface1";
import { HomePage } from "pages/other/HomePage";

export class OpportunityMarketplaceConfigurationPage extends BasePage implements Interface1{

    public opportunityMarketplaceEnablementSwitch: Locator = this.page.locator("//div[contains(@class, 'bootstrap-switch-talent_marketplace-switch')]");
    public jobRoleSwitch: Locator = this.page.locator("//div[contains(@class, 'bootstrap-switch-job_role-switch')]");
    public userDropdown: Locator = this.page.locator("//button[@aria-label='MyGuide']/following-sibling::div/descendant::button[@id='user-dropdown']");
    public homeOption: Locator = this.page.locator("//button[@aria-label='MyGuide']/following-sibling::div/descendant::ul[contains(@class,'dropdown-menu-right')]/child::li/child::a[text()='Home']");
    public enableSourcing: Locator = this.page.locator("//label[normalize-space()='Enable Sourcing']");
    public enableSourcingSwitch: Locator = this.page.locator("//span[text()='ON']");
    public clickOnSaveButton: Locator = this.page.locator("//div[@id='talent-marketplace-sourcing-configuration-tab']//button[@type='button'][normalize-space()='Save']");
    public saveValidationMessage: Locator = this.page.locator("//span[contains(text(), 'Saving customizations...')]");
    public opportunityMarketplaceTab(tab: string): Locator {
      return this.getLocatorWithParam("//a[contains(@id, 'talent-marketplace')][text()='%s']", tab);
    }
    public hrDataTab(tab: string): Locator {
      return this.getLocatorWithParam("//a[contains(@id, 'hr-data-configuration-tabs')][text()='%s']", tab);
    }
    public editButton(field: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div/descendant::button", field);
    }
    public availableOptionsForField(field: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/following-sibling::div[1]", field);
    }
    public usageForField(field: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/following-sibling::div[2]", field);
    }
    public typeForField(field: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/following-sibling::div[3]", field);
    }
    public setLanguageButton(defaultLabel: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/following-sibling::div/child::button", defaultLabel);
    }
    public saveButton: Locator = this.page.locator("//div[contains(@class,'active')]/descendant::button[text()='Save']");
    public submenu(menu: string): Locator {
      return this.getLocatorWithParam("//li[contains(@class, 'open')]/descendant::span[text()='%s']/parent::a", menu);
    }
    public skillLevelRadioButton(skillLevel: string): Locator {
      return this.getLocatorWithParam("//div[@class='config-skills-level-radioButton']/label[text()='%s']/preceding-sibling::input", skillLevel);
    }
    public skillsTab: Locator = this.page.locator("#talent-marketplace-job-vacancy-tabs-tab-3");

	public goToHomePage(): HomePage {
        userDropdown.click();
        return this.openPageInNewTab(homeOption, HomePage);
    }

	public openMenuForOpportunityMarketplace(menu: string): OpportunityMarketplaceConfigurationPage {
        this.submenu(menu).click();
        return this;
    }

	public clickOMSwitch(): OpportunityMarketplaceConfigurationPage {
        opportunityMarketplaceEnablementSwitch.click();
        return this;
    }

	public openOpportunityMarketplaceInnerTab(tab: string): OpportunityMarketplaceConfigurationPage {
        this.opportunityMarketplaceTab(tab).click();
        return this;
    }

    public openHrDataInnerTab(tab: string): OpportunityMarketplaceConfigurationPage {
        this.hrDataTab(tab).click();
        return this;
    }

	public editField(field: string): EditFieldModalPage {
        this.editButton(field).first().click();
        this.pause(1000);
        return this.getPageClassInstance(EditFieldModalPage);
    }

	public clickSetLanguage(defaultLabel: string): LanguageModalPage {
        this.setLanguageButton(defaultLabel).click();
        return this.getPageClassInstance(LanguageModalPage);
    }

	public refreshPage(): OpportunityMarketplaceConfigurationPage {
        this.page.reload();
        return this;
    }

	public clickSave(): OpportunityMarketplaceConfigurationPage {
        saveButton.click();
        this.pause(10000);
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickOnTurnEnableSourcing(): OpportunityMarketplaceConfigurationPage {
        enableSourcingSwitch.click();
        clickOnSaveButton.click();
        return this;
    }

    public changeContextToAdminPanel(): AdminPanelPage {

      return this.getPageClassInstance(AdminPanelPage);

    }

    public openSkillsTab(): OpportunityMarketplaceConfigurationPage {
        skillsTab.click();
        return this;
    }

    public getP(): Page {

      return getPage();

    }
}
