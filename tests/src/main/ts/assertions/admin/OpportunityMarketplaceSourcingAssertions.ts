import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OpportunityMarketplaceSourcingPage } from "pages/admin/OpportunityMarketplaceSourcingPage";

export class OpportunityMarketplaceSourcingAssertions extends BaseAssertion <OpportunityMarketplaceSourcingPage>{

    public assertThatEnableSourcingIsVisible(): OpportunityMarketplaceSourcingAssertions {
        this.assertThat(this.page.enableSourcing).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable sourcing is visible");
        return this;
    }
    public assertThatSourcingIsOn(): OpportunityMarketplaceSourcingAssertions {
        this.assertThat(this.page.sourcingON).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Sourcing is ON");
        return this;
    }
}
