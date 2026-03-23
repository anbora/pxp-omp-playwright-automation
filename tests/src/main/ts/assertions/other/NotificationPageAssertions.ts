import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { NotificationPage } from "pages/other/NotificationPage";

export class NotificationPageAssertions extends BaseAssertion<NotificationPage> {

    public assertThatNoNotificationLabelContains(message: string): NotificationPageAssertions {
        this.assertThat(this.page.noNotificationLabel).containsText(message, this.containsTextOptions);
        return this;
    }

    public assertThatNotificationMessageContains(message: string): NotificationPageAssertions {
        this.assertThat(this.page.notificationMessage).containsText(message, this.containsTextOptions);
        return this;
    }

    public assertThatFirstNotificationContains(message: string): NotificationPageAssertions {
        this.assertThat(this.page.notificationMessage.first()).containsText(message, this.containsTextOptions);
        return this;
    }
}
