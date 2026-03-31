// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SmartCardDetailsPage } from "pages/insights/SmartCardDetailsPage";
import { expect } from "common/testing/playwright";

export class SmartCardDetailsAssertions extends BaseAssertion<SmartCardDetailsPage> {

    public assertThatCardNameContains(cardName: string): SmartCardDetailsAssertions {
        expect(this.page.cardName).toContainText(cardName, this.containsTextOptions);
        return this;
    }

    public assertThatCardTypeContains(cardType: string): SmartCardDetailsAssertions {
        expect(this.page.cardType).toContainText(cardType, this.containsTextOptions);
        return this;
    }

    public assertThatCardLevelContains(cardLevel: string): SmartCardDetailsAssertions {
        expect(this.page.cardLevel).toContainText(cardLevel, this.containsTextOptions);
        return this;
    }
}
