// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";
import { expect } from "common/testing/playwright";

export class GroupDetailsAssertions extends BaseAssertion<GroupDetailsPage> {

    public assertThatFileUploadNotificationTextIs(notification: string): GroupDetailsAssertions {
        expect(this.page.getUploadFileNotification()).toContainText(notification);
        this.page.logger.info("Successfully verified that upload file notification text is as expected");
        return this;
    }

    public assertThatGroupNotificationIs(notification: string): GroupDetailsAssertions {
        expect(this.page.getGroupNotification()).toContainText(notification);
        this.page.logger.info("Successfully verified that group notification text is as expected");
        return this;
    }

    public assertThatSharedJourneyContentTitleIs(title: string): GroupDetailsAssertions {
        expect(this.page.getSharedJourneyTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that shared content title is as expected");
        return this;
    }

    public assertThatSharedPathwayContentTitleIs(title: string): GroupDetailsAssertions {
        expect(this.page.getSharedPathwayTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that shared content title is as expected");
        return this;
    }

    public assertThatGroupTitleIs(title: string): GroupDetailsAssertions {
        expect(this.page.getGroupTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that group title is as expected");
        return this;
    }

    public assertThatCardListIsEmpty(): GroupDetailsAssertions {
        expect(this.page.sharedJourneyTitle).not.toBeVisible();
        this.page.logger.info("Successfully verified that card list is empty");
        return this;
    }
}
