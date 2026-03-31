// @ts-nocheck
import { JourneyDetailsPageAssertions } from "assertions/journeys/JourneyDetailsPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { PathwayDetailsPage } from "pages/pathways/PathwayDetailsPage";
import { expect } from "common/testing/playwright";

export class PathwayDetailsPageAssertions extends BaseAssertion<PathwayDetailsPage> {
    public assertThatPathwayTitleIs(title: string): PathwayDetailsPageAssertions {
        expect(this.page.getJourneyTitle()).toContainText(title);
        this.page.logger.info("Successfully verified that journey title is as expected");
        return this;
    }

    public assertThatPathwayNotificationIs(notification: string): PathwayDetailsPageAssertions {
        expect(this.page.getJourneyNotification()).toContainText(notification);
        this.page.logger.info("Successfully verified that journey notification text is as expected");
        return this;
    }

    public assertThatSelectedLanguageIs(language: string): PathwayDetailsPageAssertions {
        let selectedLanguage: string = this.page.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(language));
        return this;
    }
}
