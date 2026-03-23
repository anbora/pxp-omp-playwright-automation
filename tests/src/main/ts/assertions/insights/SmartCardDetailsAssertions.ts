import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SmartCardDetailsPage } from "pages/insights/SmartCardDetailsPage";

export class SmartCardDetailsAssertions extends BaseAssertion<SmartCardDetailsPage> {

    public assertThatCardNameContains(cardName: string): SmartCardDetailsAssertions {
        this.assertThat(this.page.cardName).containsText(cardName, this.containsTextOptions);
        return this;
    }

    public assertThatCardTypeContains(cardType: string): SmartCardDetailsAssertions {
        this.assertThat(this.page.cardType).containsText(cardType, this.containsTextOptions);
        return this;
    }

    public assertThatCardLevelContains(cardLevel: string): SmartCardDetailsAssertions {
        this.assertThat(this.page.cardLevel).containsText(cardLevel, this.containsTextOptions);
        return this;
    }
}
