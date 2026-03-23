import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ChannelDetailsPage } from "pages/channels/ChannelDetailsPage";

export class ChannelDetailsPageAssertions extends BaseAssertion<ChannelDetailsPage> {

    public assertThatChannelNotificationIs(notification: string): ChannelDetailsPageAssertions {
        this.assertThat(this.page.getChannelNotification()).containsText(notification);
        this.page.logger.info("Successfully verified that channel notification text is as expected");
        return this;
    }

    public assertThatChannelTitleIs(title: string): ChannelDetailsPageAssertions {
        this.assertThat(this.page.getChannelTitle()).containsText(title);
        this.page.logger.info("Successfully verified that channel title is as expected");
        return this;
    }

    public assertThatCardTitleIs(title: string): ChannelDetailsPageAssertions {
        this.assertThat(this.page.getCardTitle()).containsText(title);
        this.page.logger.info("Successfully verified that card title is as expected");
        return this;
    }

    public assertThatCardListIsEmpty(): ChannelDetailsPageAssertions {
        this.assertThat(this.page.cardTitle).not().isVisible();
        this.page.logger.info("Successfully verified that card list is empty");
        return this;
    }
}
