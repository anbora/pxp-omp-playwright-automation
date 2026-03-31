// @ts-nocheck
import { PathwayDetailsPageAssertions } from "assertions/pathways/PathwayDetailsPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { expect } from "common/testing/playwright";

export class JourneyDetailsPageAssertions extends BaseAssertion<JourneyDetailsPage> {
    public assertThatJourneyTitleIs(title: string): JourneyDetailsPageAssertions {
        expect(this.page.getJourneyTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that journey title is as expected");
        return this;
    }

    public assertThatJourneyNotificationIs(notification: string): JourneyDetailsPageAssertions {
        expect(this.page.getJourneyNotification()).toContainText(notification);
        this.page.logger.info("Successfully verified that journey notification text is as expected");
        return this;
    }

    public assertThatSelectedLanguageIs(language: string): JourneyDetailsPageAssertions {
        let selectedLanguage: string = this.page.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(language));
        return this;
    }
}
