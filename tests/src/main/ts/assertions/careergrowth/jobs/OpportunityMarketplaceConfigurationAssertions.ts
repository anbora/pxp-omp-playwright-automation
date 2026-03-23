import { BaseAssertion } from "common/BaseAssertion";
import { Locator, WaitForSelectorState } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
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
        this.assertThat(this.page.availableOptionsForField(field)).containsText(options, this.containsTextOptions);
//        this.page.availableOptionsForField(field).should('contain.text', options)
        return this;
    }

	public assertThatUsageForFieldContain(field: string, usage: string): OpportunityMarketplaceConfigurationAssertions {
        this.assertThat(this.page.usageForField(field)).containsText(usage, this.containsTextOptions);
//        this.page.usageForField(field).should('contain.text', usage)
        return this;
    }

	public assertThatTypeForFieldContain(field: string, type: string): OpportunityMarketplaceConfigurationAssertions {
        this.assertThat(this.page.typeForField(field)).containsText(type, this.containsTextOptions);
//        this.page.typeForField(field).should('contain.text', type)
        return this;
    }

    public assertDefaultLevelForJobVacancySkillsDetection(expectedDefaultLevel: string): OpportunityMarketplaceConfigurationAssertions {
        this.assertThat(this.page.defaultSkillLevelSelect()).hasValue(expectedDefaultLevel);
        return this;
    }

    public assertThatEnableSourcingSwitchIsDisplayed(): OpportunityMarketplaceConfigurationAssertions {
        Assert.assertTrue(this.page.enableSourcingSwitch.first().getAttribute("class").contains("bootstrap-switch-handle-on"));
        return this;
    }

    public assertThatEnableSourcingTextFieldIsDisplayed(field: string): OpportunityMarketplaceConfigurationAssertions {
        this.assertThat(this.page.enableSourcing).containsText(field, this.containsTextOptions);
        return this;
    }

    public assertSaveConfigurationForCustomSetting(actualMessage: string, failedMessage: string): OpportunityMarketplaceConfigurationAssertions {
        this.page.saveValidationMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertEquals(this.page.saveValidationMessage.textContent(), actualMessage, failedMessage);
        return this;
    }
}
