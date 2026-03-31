// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ChannelDetailsPage } from "pages/channels/ChannelDetailsPage";
import { expect } from "common/testing/playwright";

export class ChannelDetailsPageAssertions extends BaseAssertion<ChannelDetailsPage> {

    public assertThatChannelNotificationIs(notification: string): ChannelDetailsPageAssertions {
        expect(this.page.getChannelNotification()).toContainText(notification);
        this.page.logger.info("Successfully verified that channel notification text is as expected");
        return this;
    }

    public assertThatChannelTitleIs(title: string): ChannelDetailsPageAssertions {
        expect(this.page.getChannelTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that channel title is as expected");
        return this;
    }

    public assertThatCardTitleIs(title: string): ChannelDetailsPageAssertions {
        expect(this.page.getCardTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that card title is as expected");
        return this;
    }

    public assertThatCardListIsEmpty(): ChannelDetailsPageAssertions {
        expect(this.page.cardTitle).not.toBeVisible();
        this.page.logger.info("Successfully verified that card list is empty");
        return this;
    }
}
