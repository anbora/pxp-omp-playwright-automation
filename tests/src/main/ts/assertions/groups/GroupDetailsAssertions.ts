import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";

export class GroupDetailsAssertions extends BaseAssertion<GroupDetailsPage> {

    public assertThatFileUploadNotificationTextIs(notification: string): GroupDetailsAssertions {
        this.assertThat(this.page.getUploadFileNotification()).containsText(notification);
        this.page.logger.info("Successfully verified that upload file notification text is as expected");
        return this;
    }

    public assertThatGroupNotificationIs(notification: string): GroupDetailsAssertions {
        this.assertThat(this.page.getGroupNotification()).containsText(notification);
        this.page.logger.info("Successfully verified that group notification text is as expected");
        return this;
    }

    public assertThatSharedJourneyContentTitleIs(title: string): GroupDetailsAssertions {
        this.assertThat(this.page.getSharedJourneyTitle()).containsText(title);
        this.page.logger.info("Successfully verified that shared content title is as expected");
        return this;
    }

    public assertThatSharedPathwayContentTitleIs(title: string): GroupDetailsAssertions {
        this.assertThat(this.page.getSharedPathwayTitle()).containsText(title);
        this.page.logger.info("Successfully verified that shared content title is as expected");
        return this;
    }

    public assertThatGroupTitleIs(title: string): GroupDetailsAssertions {
        this.assertThat(this.page.getGroupTitle()).containsText(title);
        this.page.logger.info("Successfully verified that group title is as expected");
        return this;
    }

    public assertThatCardListIsEmpty(): GroupDetailsAssertions {
        this.assertThat(this.page.sharedJourneyTitle).not().isVisible();
        this.page.logger.info("Successfully verified that card list is empty");
        return this;
    }
}
