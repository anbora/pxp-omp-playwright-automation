import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class OpportunityMarketplaceProjectPage extends BasePage {

    public labelsTab: Locator = this.page.locator("//div[@id='talent-marketplace-project-tabs']/ul[@role='tablist']/li[2]/a[@role='tab']");
    public standardFieldsTab: Locator = this.page.locator("//div[@id='talent-marketplace-project-tabs']/ul[@role='tablist']/li[3]/a[@role='tab']");
    public enableProject: Locator = this.page.locator("//label[text()='Enable Project']");
    public project: Locator = this.page.locator("//div[text()='Project']");
    public projects: Locator = this.page.locator("//div[text()='Projects']");
    public expandYourKnowledge: Locator = this.page.locator("//div[text()='Expand your knowledge by taking on another project']");
    public requireApplicantMessage: Locator = this.page.locator("//label[@for='projects_require_application_message-switch']");
    public showManagerPermission: Locator = this.page.locator("//label[@for='projects_require_manager_consent-switch']");
    public showManagerPermissionToggledOn: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-on bootstrap-switch-small bootstrap-switch-projects_require_manager_consent-switch bootstrap-switch-animate']");
    public requireApplicantMessageToggledOff: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-off bootstrap-switch-small bootstrap-switch-projects_require_application_message-switch bootstrap-switch-animate']");
    public requireApplicantMessageToggledOn: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-on bootstrap-switch-small bootstrap-switch-projects_require_application_message-switch bootstrap-switch-animate']");
    public showManagerPermissionToggledOff: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-off bootstrap-switch-small bootstrap-switch-projects_require_manager_consent-switch bootstrap-switch-animate']");
    public saveButtonConfigTab: Locator = this.page.locator("//div[@id='talent-marketplace-project-tabs-pane-1']/div/div/div/div/div/div/button[text()='Save']");
    public saveButtonStandardFieldsTab: Locator = this.page.locator("//div[@id='talent-marketplace-project-tabs-pane-3']/div/div/div/div/div/div/button[text()='Save']");
    public timezonesShowHideToggledOn: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-on bootstrap-switch-small bootstrap-switch-Timezones-show-hide-switch']");
    public timezonesShowHideToggledOff: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-off bootstrap-switch-small bootstrap-switch-Timezones-show-hide-switch']");
    public timeCommitmentRequiredToggledOff: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-off bootstrap-switch-small bootstrap-switch-Time commitment-required-switch bootstrap-switch-animate']");
    public timeCommitmentRequiredToggledOn: Locator = this.page.locator("//div[@class='bootstrap-switch wrapper bootstrap-switch-on bootstrap-switch-small bootstrap-switch-Time commitment-required-switch bootstrap-switch-animate']");
    public projectConfigShowHideColumHeader: Locator = this.page.locator("//div[@class='col-xs-3']/strong[text()='Show/Hide']");
    public projectConfigRequiredColumHeader: Locator = this.page.locator("//div[@class='col-xs-3']/strong[text()='Required']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickLabelsButton(): OpportunityMarketplaceProjectPage {
        labelsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceProjectPage);
    }

    public clickStandardFieldsButton(): OpportunityMarketplaceProjectPage {
        standardFieldsTab.click();
        return this.getPageClassInstance(OpportunityMarketplaceProjectPage);
    }

    public toggleRequireApplicantMessageToOn(): OpportunityMarketplaceProjectPage {
      if(requireApplicantMessageToggledOff.isVisible(): ):  {
            requireApplicantMessageToggledOff.click();
            this.pause(3000);
        }
        return this;
    }

    public toggleRequireApplicantMessageToOff(): OpportunityMarketplaceProjectPage {
      if(requireApplicantMessageToggledOn.isVisible(): ):  {
            requireApplicantMessageToggledOn.click();
            this.pause(3000);
        }
        return this;
    }

    public toggleShowManagerPermissionToOff(): OpportunityMarketplaceProjectPage {
      if(showManagerPermissionToggledOn.isVisible(): ):  {
            showManagerPermissionToggledOn.click();
            this.pause(3000);
        }
        return this;
    }

    public toggleShowManagerPermissionToOn(): OpportunityMarketplaceProjectPage {
      if(showManagerPermissionToggledOff.isVisible(): ):  {
            showManagerPermissionToggledOff.click();
            this.pause(3000);
        }
        return this;
    }

    public clickSaveButtonConfigTab(): OpportunityMarketplaceProjectPage {
        this.pause(5000);
        saveButtonConfigTab.click();
        return this;
    }

    public toggleTimezonesFieldShowHideToOff(): OpportunityMarketplaceProjectPage {
        if(timezonesShowHideToggledOn.isVisible())
        {
            timezonesShowHideToggledOn.click();
            this.pause(3000);
        }
        return this;
    }

    public toggleTimezonesFieldShowHideToOn(): OpportunityMarketplaceProjectPage {
        if(timezonesShowHideToggledOff.isVisible())
        {
            timezonesShowHideToggledOff.click();
            this.pause(3000);
        }
        return this;
    }

    public toggleTimeCommitmentRequiredToOn(): OpportunityMarketplaceProjectPage {
        if(timeCommitmentRequiredToggledOff.isVisible())
        {
            timeCommitmentRequiredToggledOff.click();
            this.pause(3000);
        }
        return this;
    }

    public toggleTimeCommitmentRequiredToOff(): OpportunityMarketplaceProjectPage {
        if(timeCommitmentRequiredToggledOn.isVisible())
        {
            timeCommitmentRequiredToggledOn.click();
            this.pause(3000);
        }
        return this;
    }

    public clickSaveButtonStandardFieldTab(): OpportunityMarketplaceProjectPage {
        saveButtonStandardFieldsTab.click();
        this.pause(3000);
        return this;
    }
}
