import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";

export class ProfileDetailsAssertions extends BaseAssertion<ProfileDetailsPage> {

    public assertThatCurrentRoleNameIsVisibleInUI(role: string): ProfileDetailsAssertions {
        this.assertThat(this.page.currentRoleName(role)).isVisible(this.isVisibleOptions);
//        this.page.currentRoleName(role).should('exist')
        return this;
    }

    public assertThatBannerIsNotDisplayed(filename: string): ProfileDetailsAssertions {
        this.assertThat(this.page.bannerImageLink(filename)).not().isVisible();
        this.page.logger.info("Successfully verified that default banner is not visible");
        return this;
    }

    public assertThatBannerIsDisplayed(filename: string): ProfileDetailsAssertions {
        this.assertThat(this.page.bannerImageLink(filename)).isVisible();
        this.page.logger.info("Successfully verified that banner is visible");
        return this;
    }

    public assertThatChangeBannerImageButtonIsDisplayed(): ProfileDetailsAssertions {
        this.assertThat(this.page.editBannerImageButton).isVisible();
        this.page.logger.info("Successfully verified that change banner image button is displayed");
        return this;
    }

    public assertThatChangeBannerImageButtonIsNotDisplayed(): ProfileDetailsAssertions {
        this.assertThat(this.page.editBannerImageButton).not().isVisible();
        this.page.logger.info("Successfully verified that change banner image button is not displayed");
        return this;
    }

    public assertThatRemoveBannerImageButtonIsDisplayed(): ProfileDetailsAssertions {
        this.assertThat(this.page.removeBannerButton).isVisible();
        this.page.logger.info("Successfully verified that remove banner button is displayed");
        return this;
    }

    public assertThatRemoveBannerImageButtonIsNotDisplayed(): ProfileDetailsAssertions {
        this.assertThat(this.page.removeBannerButton).not().isVisible();
        this.page.logger.info("Successfully verified that remove banner button is not displayed");
        return this;
    }

    public assertThatLocationIsVisibleForUserProfile(): ProfileDetailsAssertions {
        this.assertThat(this.page.userProfileLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForUserProfile(): ProfileDetailsAssertions {
        this.assertThat(this.page.userProfileLocation).isHidden();
        return this;
    }
}
