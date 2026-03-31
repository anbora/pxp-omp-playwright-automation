// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ContentMePage } from "pages/me/ContentMePage";
import { expect } from "common/testing/playwright";

export class MePageContentTabAssertions extends BaseAssertion<ContentMePage> {

    public assertThatCardNameInContentTabIsVisible(cardName: string): MePageContentTabAssertions {
        expect(this.page.firstCreatedCard(cardName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCardNameInContentTabIsNotVisible(): MePageContentTabAssertions {
        expect(this.page.sharedByMeEmpty.first()).toContainText("There are no available cards.", this.containsTextOptions);
        return this;
    }
}
