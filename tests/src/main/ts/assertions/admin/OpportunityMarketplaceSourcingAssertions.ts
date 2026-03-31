// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OpportunityMarketplaceSourcingPage } from "pages/admin/OpportunityMarketplaceSourcingPage";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceSourcingAssertions extends BaseAssertion <OpportunityMarketplaceSourcingPage>{

    public assertThatEnableSourcingIsVisible(): OpportunityMarketplaceSourcingAssertions {
        expect(this.page.enableSourcing).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable sourcing is visible");
        return this;
    }
    public assertThatSourcingIsOn(): OpportunityMarketplaceSourcingAssertions {
        expect(this.page.sourcingON).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Sourcing is ON");
        return this;
    }
}
