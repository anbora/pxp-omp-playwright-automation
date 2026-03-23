import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SmartSearchPage } from "pages/other/SmartSearchPage";

export class SmartSearchPageAssertions extends BaseAssertion<SmartSearchPage>{

    public assertThatUnfollowButtonIsDisplayed(): SmartSearchPageAssertions {
        this.assertThat(this.page.unfollowButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Unfollow button is visible");
        return this;
    }
}
