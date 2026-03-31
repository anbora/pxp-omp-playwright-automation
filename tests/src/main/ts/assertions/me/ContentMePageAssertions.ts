// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ContentMePage } from "pages/me/ContentMePage";
import { expect } from "common/testing/playwright";

export class ContentMePageAssertions extends BaseAssertion<ContentMePage> {

    public assertThatCardNotificationIs(notification: string): ContentMePageAssertions {
        expect(this.page.cardNotification).toContainText(notification);
        this.page.logger.info("Successfully verified that notification text is as expected");
        return this;
    }

    public assertThatCardTitleIsAsExpected(title: string): ContentMePageAssertions {
        expect(this.page.cardTile).toContainText(title);
        this.page.logger.info("Successfully verified that title is as expected");
        return this;
    }
}
