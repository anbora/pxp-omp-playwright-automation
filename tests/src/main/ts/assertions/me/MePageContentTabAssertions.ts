import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ContentMePage } from "pages/me/ContentMePage";

export class MePageContentTabAssertions extends BaseAssertion<ContentMePage> {

    public assertThatCardNameInContentTabIsVisible(cardName: string): MePageContentTabAssertions {
        this.assertThat(this.page.firstCreatedCard(cardName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCardNameInContentTabIsNotVisible(): MePageContentTabAssertions {
        this.assertThat(this.page.sharedByMeEmpty.first()).containsText("There are no available cards.", this.containsTextOptions);
        return this;
    }
}
