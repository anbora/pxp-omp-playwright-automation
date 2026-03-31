// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { NotificationPage } from "pages/other/NotificationPage";
import { expect } from "common/testing/playwright";

export class NotificationPageAssertions extends BaseAssertion<NotificationPage> {

    public assertThatNoNotificationLabelContains(message: string): NotificationPageAssertions {
        expect(this.page.noNotificationLabel).toContainText(message, this.containsTextOptions);
        return this;
    }

    public assertThatNotificationMessageContains(message: string): NotificationPageAssertions {
        expect(this.page.notificationMessage).toContainText(message, this.containsTextOptions);
        return this;
    }

    public assertThatFirstNotificationContains(message: string): NotificationPageAssertions {
        expect(this.page.notificationMessage.first()).toContainText(message, this.containsTextOptions);
        return this;
    }
}
