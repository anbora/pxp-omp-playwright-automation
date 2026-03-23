import { JourneyDetailsPageAssertions } from "assertions/journeys/JourneyDetailsPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { PathwayDetailsPage } from "pages/pathways/PathwayDetailsPage";

export class PathwayDetailsPageAssertions extends BaseAssertion<PathwayDetailsPage> {
    public assertThatPathwayTitleIs(title: string): PathwayDetailsPageAssertions {
        this.assertThat(this.page.getJourneyTitle()).containsText(title);
        this.page.logger.info("Successfully verified that journey title is as expected");
        return this;
    }

    public assertThatPathwayNotificationIs(notification: string): PathwayDetailsPageAssertions {
        this.assertThat(this.page.getJourneyNotification()).containsText(notification);
        this.page.logger.info("Successfully verified that journey notification text is as expected");
        return this;
    }

    public assertThatSelectedLanguageIs(language: string): PathwayDetailsPageAssertions {
        let selectedLanguage: string = this.page.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(language));
        return this;
    }
}
