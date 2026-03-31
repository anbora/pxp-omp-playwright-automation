// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { expect } from "common/testing/playwright";

export class ProfileDetailsAssertions extends BaseAssertion<ProfileDetailsPage> {

    public assertThatCurrentRoleNameIsVisibleInUI(role: string): ProfileDetailsAssertions {
        expect(this.page.currentRoleName(role)).toBeVisible(this.isVisibleOptions);
//        this.page.currentRoleName(role).should('exist')
        return this;
    }

    public assertThatBannerIsNotDisplayed(filename: string): ProfileDetailsAssertions {
        expect(this.page.bannerImageLink(filename)).not.toBeVisible();
        this.page.logger.info("Successfully verified that default banner is not visible");
        return this;
    }

    public assertThatBannerIsDisplayed(filename: string): ProfileDetailsAssertions {
        expect(this.page.bannerImageLink(filename)).toBeVisible();
        this.page.logger.info("Successfully verified that banner is visible");
        return this;
    }

    public assertThatChangeBannerImageButtonIsDisplayed(): ProfileDetailsAssertions {
        expect(this.page.editBannerImageButton).toBeVisible();
        this.page.logger.info("Successfully verified that change banner image button is displayed");
        return this;
    }

    public assertThatChangeBannerImageButtonIsNotDisplayed(): ProfileDetailsAssertions {
        expect(this.page.editBannerImageButton).not.toBeVisible();
        this.page.logger.info("Successfully verified that change banner image button is not displayed");
        return this;
    }

    public assertThatRemoveBannerImageButtonIsDisplayed(): ProfileDetailsAssertions {
        expect(this.page.removeBannerButton).toBeVisible();
        this.page.logger.info("Successfully verified that remove banner button is displayed");
        return this;
    }

    public assertThatRemoveBannerImageButtonIsNotDisplayed(): ProfileDetailsAssertions {
        expect(this.page.removeBannerButton).not.toBeVisible();
        this.page.logger.info("Successfully verified that remove banner button is not displayed");
        return this;
    }

    public assertThatLocationIsVisibleForUserProfile(): ProfileDetailsAssertions {
        expect(this.page.userProfileLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForUserProfile(): ProfileDetailsAssertions {
        expect(this.page.userProfileLocation).toBeHidden();
        return this;
    }
}
