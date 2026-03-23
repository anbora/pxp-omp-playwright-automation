import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { NewProfileFollowingModalPage } from "pages/newprofile/NewProfileFollowingModalPage";

export class NewProfileFollowingModalPageAssertions extends BaseAssertion<NewProfileFollowingModalPage> {

    public assertThatFollowingNameIsDisplayed(text: string): NewProfileFollowingModalPageAssertions {
        this.assertThat(this.page.followingNameIcon(text)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Following Name is visible");
        return this;
    }

    public assertThatFollowerNameIsDisplayed(text: string): NewProfileFollowingModalPageAssertions {
        this.assertThat(this.page.followerNameIcon(text)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Follower Name is visible");
        return this;
    }
}
