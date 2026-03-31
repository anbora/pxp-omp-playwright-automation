// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { NewProfileFollowingModalPage } from "pages/newprofile/NewProfileFollowingModalPage";
import { expect } from "common/testing/playwright";

export class NewProfileFollowingModalPageAssertions extends BaseAssertion<NewProfileFollowingModalPage> {

    public assertThatFollowingNameIsDisplayed(text: string): NewProfileFollowingModalPageAssertions {
        expect(this.page.followingNameIcon(text)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Following Name is visible");
        return this;
    }

    public assertThatFollowerNameIsDisplayed(text: string): NewProfileFollowingModalPageAssertions {
        expect(this.page.followerNameIcon(text)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Follower Name is visible");
        return this;
    }
}
