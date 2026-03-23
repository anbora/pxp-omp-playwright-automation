import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ContentMePage } from "pages/me/ContentMePage";

export class ContentMePageAssertions extends BaseAssertion<ContentMePage> {

    public assertThatCardNotificationIs(notification: string): ContentMePageAssertions {
        this.assertThat(this.page.cardNotification).containsText(notification);
        this.page.logger.info("Successfully verified that notification text is as expected");
        return this;
    }

    public assertThatCardTitleIsAsExpected(title: string): ContentMePageAssertions {
        this.assertThat(this.page.cardTile).containsText(title);
        this.page.logger.info("Successfully verified that title is as expected");
        return this;
    }
}
