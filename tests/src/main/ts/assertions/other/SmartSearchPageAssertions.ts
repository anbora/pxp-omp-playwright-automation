// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SmartSearchPage } from "pages/other/SmartSearchPage";
import { expect } from "common/testing/playwright";

export class SmartSearchPageAssertions extends BaseAssertion<SmartSearchPage>{

    public assertThatUnfollowButtonIsDisplayed(): SmartSearchPageAssertions {
        expect(this.page.unfollowButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Unfollow button is visible");
        return this;
    }
}
