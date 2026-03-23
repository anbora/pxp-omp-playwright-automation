import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";
import { LanguageModalPage } from "pages/admin/LanguageModalPage";
import { OpportunityMarketplaceConfigurationPage } from "pages/careergrowth/jobs/OpportunityMarketplaceConfigurationPage";

export class EditFieldModalPage extends BasePage {

    public addNewOptionButton: Locator = this.page.locator("//button[text()='Add new option']");
    public enableDisableVisibilityButton(defaultLabel: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/preceding-sibling::div/child::div[contains(@class,'switch')]", defaultLabel);
    }
    public setLanguageButton(defaultLabel: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/following-sibling::div/child::button", defaultLabel);
    }
    public newLabelInput(defaultLabel: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/following-sibling::div/child::input[@placeholder='Enter new label']", defaultLabel);
    }
    public saveButton: Locator = this.page.locator("//div[@class='modal-content']/descendant::button[text()='Save']");
    public newLabel: Locator = this.page.locator("//div[text()='Custom Lov Item']/preceding-sibling::div/child::div[contains(@class,'bootstrap-switch-on')]");
    public usageAreaSelect: Locator = this.page.locator("//div[@class='Select-control']/descendant::span[@class='Select-arrow']");
    public usageAreaOption(area: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'Select-option')][@aria-label='%s']", area);
    }
    public usageAreaRemoveButton(area: string): Locator {
      return this.getLocatorWithParam("//span[@class='Select-value-label'][text()='%s']/preceding-sibling::span", area);
    }
    public closeButton: Locator = this.page.locator("button.close");
    public submenu(menu: string): Locator {
      return this.getLocatorWithParam("//li/descendant::span[text()='%s']/parent::a", menu);
    }
    public firstRowDefaultLabel(label: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'modal-body']/div/descendant::div[@class = 'tabled row'][2]/div[contains(text(), '%s')]", label);
    }
    public firstRowKey(label: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'modal-body']/div/descendant::div[@class = 'tabled row'][2]/div/input[contains(@value, '%s')]", label);
    }
    public firstRowEnabled: Locator = this.page.locator("//div[@class = 'modal-body']/div/descendant::div[@class = 'tabled row'][2]/div/descendant::span[contains(text(), 'ON')]");
    public rowOrderIcon(rowIndex: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'modal-body']/div/descendant::div[@class = 'tabled row'][%s]/div/descendant::div[contains(@class, 'icon-fontello-align-justify')]", rowIndex);
    }
    public rowDefaultLabel(rowIndex: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'modal-body']/div/descendant::div[@class = 'tabled row'][%s]/descendant::div[contains(@class, 'multi-rows-data')]", rowIndex);
    }
    public deleteJobRoleEngagement: Locator = this.page.locator("//div[3]/div[text() = 'Job Role']/following-sibling::div[@class='css-1alnv5e']");
    public saveButtonEditLevelModal: Locator = this.page.locator("//div[@class='modal-footer']/button[text()='Save']");
    public jobRoleEngagementField: Locator = this.page.locator("//div[@role='document']/div/div[3]//div[@class='css-1hwfws3']");
    public jobRoleUsageOption: Locator = this.page.locator("//div[@class='css-kj6f9i-menu']/div/child::div[text()='Job Role']");
    public rankOne: Locator = this.page.locator("//div[@class='container-fluid']/div[3]/div[2]/div/div//div[@class='css-1p1cok9']/div[@class='css-16pqwjk-indicatorContainer']");
    public rankTwo: Locator = this.page.locator("//div[3]/div/div/div[4]/div[@class='css-1pcexqc-container']/div[@class='css-15irvef-control']/div[@class='css-1p1cok9']/div[@class='css-16pqwjk-indicatorContainer']");
    public rankNumber: Locator = this.page.locator("//div[@class='css-xo7z33-option']");
    public rankValueOne: Locator = this.page.locator("//div[@class='css-1pcexqc-container']/div[@class='css-15irvef-control']/div[@class='css-1gc0yoq']/div[text()='1']");
    public rankValueTwo: Locator = this.page.locator("//div[@class='css-1pcexqc-container']/div[@class='css-15irvef-control']/div[@class='css-1gc0yoq']/div[text()='2']");

	public addNewOption(): EditFieldModalPage {
        addNewOptionButton.click();
        return this;
    }

	public enableVisibility(defaultLabel: string): EditFieldModalPage {
        if (enableDisableVisibilityButton(defaultLabel).last().getAttribute("class").contains("bootstrap-switch-off")) {
            this.enableDisableVisibilityButton(defaultLabel).last().click();
        }
        this.pause(1000);
        return this;
    }

	public disableVisibility(defaultLabel: string): EditFieldModalPage {
        if (enableDisableVisibilityButton(defaultLabel).last().getAttribute("class").contains("bootstrap-switch-on")) {
            this.enableDisableVisibilityButton(defaultLabel).last().click();
        }
        this.pause(1000);
        return this;
    }

	public clickSetLanguage(defaultLabel: string): LanguageModalPage {
        this.setLanguageButton(defaultLabel).last().click();
        return this.getPageClassInstance(LanguageModalPage);
    }

	public typeNewLabel(defaultLabel: string, label: string): EditFieldModalPage {
        this.newLabelInput(defaultLabel).last().clear();
        this.newLabelInput(defaultLabel).last().click();
        this.newLabelInput(defaultLabel).last().fill(label);
        return this;
    }

	public addUsageArea(area: string): EditFieldModalPage {
        usageAreaSelect.click();
        this.usageAreaOption(area).click();
        return this;
    }

	public removeUsageArea(area: string): EditFieldModalPage {
        this.usageAreaRemoveButton(area).click();
        return this;
    }

	public clickSave(): OpportunityMarketplaceConfigurationPage {
        saveButton.click();
        this.pause(3000);
        return this.getPageClassInstance(OpportunityMarketplaceConfigurationPage);
    }

    public <T extends BasePage> clickSave(clazz: Class<T>): T {
        saveButton.click();
        this.pause(3000);
        return this.getPageClassInstance(clazz);
    }

	public closeModal(): OpportunityMarketplaceConfigurationPage {
        closeButton.click();
        return this.getPageClassInstance(OpportunityMarketplaceConfigurationPage);
    }

    public <T extends BasePage> closeModal(clazz: Class<T>): T {
        closeButton.click();
        this.pause(2000);
        return this.getPageClassInstance(clazz);
    }

    public openMenuForOpportunityMarketplace(menu: string): OpportunityMarketplaceConfigurationPage {
        this.submenu(menu).click();
        return this.getPageClassInstance(OpportunityMarketplaceConfigurationPage);
    }

    public changeOrderOfTheElements(index1: string, index2: string): EditFieldModalPage {
        this.rowOrderIcon(index1).dragTo(rowOrderIcon(index2));
        this.pause(2000);
        return this;
    }

    public getElementDefaultValueByIndex(resultContainer: ResultContainer, index: string): EditFieldModalPage {
        resultContainer.setValue(rowDefaultLabel(index).textContent());
        return this;
    }

    public clickDeleteJobRoleEngagement(): EditFieldModalPage {
        deleteJobRoleEngagement.click();
        return this.getPageClassInstance(EditFieldModalPage);
    }

    public clickAddJobRoleEngagement(): EditFieldModalPage {
        jobRoleEngagementField.click();
        jobRoleUsageOption.click();
        return this.getPageClassInstance(EditFieldModalPage);
    }

    public clickSaveButtonEditLevelModal(): HrDataConfigurationStandardFieldPage {
        saveButtonEditLevelModal.click();
        return this.getPageClassInstance(HrDataConfigurationStandardFieldPage);
    }

    public selectFirstRank(): EditFieldModalPage {
        rankOne.click();
        rankNumber.click();
        return this;
    }

    public selectSecondRank(): EditFieldModalPage {
        rankTwo.click();
        rankNumber.click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
