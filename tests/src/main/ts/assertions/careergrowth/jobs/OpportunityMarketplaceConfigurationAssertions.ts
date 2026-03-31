// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { OpportunityMarketplaceConfigurationPage } from "pages/careergrowth/jobs/OpportunityMarketplaceConfigurationPage";

export class OpportunityMarketplaceConfigurationAssertions extends BaseAssertion<OpportunityMarketplaceConfigurationPage> {

    public assertThatOpportunityMarketplaceIsEnabled(): OpportunityMarketplaceConfigurationAssertions {
        Assert.assertTrue(this.page.opportunityMarketplaceEnablementSwitch.getAttribute("class").contains("bootstrap-switch-on"));
//        this.page.opportunityMarketplaceEnablementSwitch().should('have', 'bootstrap-switch-on')
        return this;
    }

	public assertThatOpportunityMarketplaceIsDisabled(): OpportunityMarketplaceConfigurationAssertions {
        Assert.assertTrue(this.page.opportunityMarketplaceEnablementSwitch.getAttribute("class").contains("bootstrap-switch-off"));
//        this.page.opportunityMarketplaceEnablementSwitch().should('have', 'bootstrap-switch-off')
        return this;
    }

	public assertThatJobRoleIsEnabled(): OpportunityMarketplaceConfigurationAssertions {
        Assert.assertTrue(this.page.jobRoleSwitch.getAttribute("class").contains("bootstrap-switch-on"));
//        this.page.jobRoleSwitch().should('have', 'bootstrap-switch-on')
        return this;
    }

	public assertThatAvailableOptionsForFieldContain(field: string, options: string): OpportunityMarketplaceConfigurationAssertions {
        expect(this.page.availableOptionsForField(field)).toContainText(options, this.containsTextOptions);
//        this.page.availableOptionsForField(field).should('contain.text', options)
        return this;
    }

	public assertThatUsageForFieldContain(field: string, usage: string): OpportunityMarketplaceConfigurationAssertions {
        expect(this.page.usageForField(field)).toContainText(usage, this.containsTextOptions);
//        this.page.usageForField(field).should('contain.text', usage)
        return this;
    }

	public assertThatTypeForFieldContain(field: string, type: string): OpportunityMarketplaceConfigurationAssertions {
        expect(this.page.typeForField(field)).toContainText(type, this.containsTextOptions);
//        this.page.typeForField(field).should('contain.text', type)
        return this;
    }

    public assertDefaultLevelForJobVacancySkillsDetection(expectedDefaultLevel: string): OpportunityMarketplaceConfigurationAssertions {
        expect(this.page.defaultSkillLevelSelect()).toHaveValue(expectedDefaultLevel);
        return this;
    }

    public assertThatEnableSourcingSwitchIsDisplayed(): OpportunityMarketplaceConfigurationAssertions {
        Assert.assertTrue(this.page.enableSourcingSwitch.first().getAttribute("class").contains("bootstrap-switch-handle-on"));
        return this;
    }

    public assertThatEnableSourcingTextFieldIsDisplayed(field: string): OpportunityMarketplaceConfigurationAssertions {
        expect(this.page.enableSourcing).toContainText(field, this.containsTextOptions);
        return this;
    }

    public assertSaveConfigurationForCustomSetting(actualMessage: string, failedMessage: string): OpportunityMarketplaceConfigurationAssertions {
        this.page.saveValidationMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertEquals(this.page.saveValidationMessage.textContent(), actualMessage, failedMessage);
        return this;
    }
}
