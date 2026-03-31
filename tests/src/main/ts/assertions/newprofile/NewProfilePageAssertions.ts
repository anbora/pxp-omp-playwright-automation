// @ts-nocheck
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { UserModel } from "models/user/UserModel";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { expect } from "common/testing/playwright";

export class NewProfilePageAssertions extends BaseAssertion<NewProfilePage> {

    public assertThatFollowersButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.followersButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Followers button is visible");
        return this;
    }

    public assertThatFollowersButtonContainsCounter(): NewProfilePageAssertions {
        expect(this.page.followingButton).toHaveCount(1);
        this.page.logger.info("Successfully verified, that Following button is visible");
        return this;
    }

    public assertThatFollowingButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.followingButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Following button is visible");
        return this;
    }

    public assertThatFollowingButtonContainsFollowingCounter(): NewProfilePageAssertions {
        expect(this.page.followingButton).toHaveCount(1);
        this.page.logger.info("Successfully verified, that Following button is visible");
        return this;
    }

    public assertThatContactInfoButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.contactInfoButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Contact Info button is visible");
        return this;
    }

    public assertThatContactInfoButtonIsNotDisplayed(): NewProfilePageAssertions {
        expect(this.page.contactInfoButton).toBeHidden();
        this.page.logger.info("Successfully verified, that Contact Info button is not visible");
        return this;
    }

    public assertThatShowMoreDetailButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.showMoreDetailButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Show More Detail button is visible");
        return this;
    }

    public assertThatShowMoreDetailButtonIsNotDisplayed(): NewProfilePageAssertions {
        expect(this.page.showMoreDetailButton).toBeHidden();
        this.page.logger.info("Successfully verified, that Show More Detail button is not visible");
        return this;
    }

    public assertThatAddProfileSectionButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.addProfileSectionButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Add Profile Section button is visible");
        return this;
    }

    public assertThatViewPublicProfileButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.viewPublicProfileButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that View Public Profile button is visible");
        return this;
    }

    public assertThatShowOrganizationButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.showOrganizationButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Show Organization button is visible");
        return this;
    }

    public assertThatPencilIconIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.pencilIcon).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Pencil icon is visible");
        return this;
    }

    public assertThatPrivateToYouSwitchForContactInfoModalIsEnabled(): NewProfilePageAssertions {
        expect(this.page.privateToYouIconForContactInfoModal).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Private To You switch for Contact Info is enabled");
        return this;
    }

    public assertThatPrivateToYouSwitchForShowMoreDetailModalIsDisabled(): NewProfilePageAssertions {
        expect(this.page.privateToYouIconForShowMoreDetailModal).toBeHidden();
        this.page.logger.info("Successfully verified, that Private To You switch for Show More Detail is disabled");
        return this;
    }

    public assertThatPrivateToYouSwitchForContactInfoModalIsDisabled(): NewProfilePageAssertions {
        expect(this.page.privateToYouIconForContactInfoModal).toBeHidden();
        this.page.logger.info("Successfully verified, that Private To You switch for Contact Info is disabled");
        return this;
    }

    public assertThatPrivateToYouSwitchForShowMoreDetailModalIsEnabled(): NewProfilePageAssertions {
        expect(this.page.privateToYouIconForShowMoreDetailModal).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Private To You switch for Show More Detail is enabled");
        return this;
    }

    public assertThatUsernameIsVisible(user: UserModel): NewProfilePageAssertions {
        expect(this.page.username(user)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorProfileButtonIsDisplayed(): NewProfilePageAssertions {
        expect(this.page.mentorProfileButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified, that Mentor Profile button is visible");
        return this;

    }
}
