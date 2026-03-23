import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { UserModel } from "models/user/UserModel";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";

export class NewProfilePageAssertions extends BaseAssertion<NewProfilePage> {

    public assertThatFollowersButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.followersButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Followers button is visible");
        return this;
    }

    public assertThatFollowersButtonContainsCounter(): NewProfilePageAssertions {
        this.assertThat(this.page.followingButton).hasCount(1);
        this.page.logger.info("Successfully verified, that Following button is visible");
        return this;
    }

    public assertThatFollowingButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.followingButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Following button is visible");
        return this;
    }

    public assertThatFollowingButtonContainsFollowingCounter(): NewProfilePageAssertions {
        this.assertThat(this.page.followingButton).hasCount(1);
        this.page.logger.info("Successfully verified, that Following button is visible");
        return this;
    }

    public assertThatContactInfoButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.contactInfoButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Contact Info button is visible");
        return this;
    }

    public assertThatContactInfoButtonIsNotDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.contactInfoButton).isHidden();
        this.page.logger.info("Successfully verified, that Contact Info button is not visible");
        return this;
    }

    public assertThatShowMoreDetailButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.showMoreDetailButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Show More Detail button is visible");
        return this;
    }

    public assertThatShowMoreDetailButtonIsNotDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.showMoreDetailButton).isHidden();
        this.page.logger.info("Successfully verified, that Show More Detail button is not visible");
        return this;
    }

    public assertThatAddProfileSectionButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.addProfileSectionButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Add Profile Section button is visible");
        return this;
    }

    public assertThatViewPublicProfileButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.viewPublicProfileButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that View Public Profile button is visible");
        return this;
    }

    public assertThatShowOrganizationButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.showOrganizationButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Show Organization button is visible");
        return this;
    }

    public assertThatPencilIconIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.pencilIcon).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Pencil icon is visible");
        return this;
    }

    public assertThatPrivateToYouSwitchForContactInfoModalIsEnabled(): NewProfilePageAssertions {
        this.assertThat(this.page.privateToYouIconForContactInfoModal).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Private To You switch for Contact Info is enabled");
        return this;
    }

    public assertThatPrivateToYouSwitchForShowMoreDetailModalIsDisabled(): NewProfilePageAssertions {
        this.assertThat(this.page.privateToYouIconForShowMoreDetailModal).isHidden();
        this.page.logger.info("Successfully verified, that Private To You switch for Show More Detail is disabled");
        return this;
    }

    public assertThatPrivateToYouSwitchForContactInfoModalIsDisabled(): NewProfilePageAssertions {
        this.assertThat(this.page.privateToYouIconForContactInfoModal).isHidden();
        this.page.logger.info("Successfully verified, that Private To You switch for Contact Info is disabled");
        return this;
    }

    public assertThatPrivateToYouSwitchForShowMoreDetailModalIsEnabled(): NewProfilePageAssertions {
        this.assertThat(this.page.privateToYouIconForShowMoreDetailModal).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Private To You switch for Show More Detail is enabled");
        return this;
    }

    public assertThatUsernameIsVisible(user: UserModel): NewProfilePageAssertions {
        this.assertThat(this.page.username(user)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorProfileButtonIsDisplayed(): NewProfilePageAssertions {
        this.assertThat(this.page.mentorProfileButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Mentor Profile button is visible");
        return this;

    }
}
