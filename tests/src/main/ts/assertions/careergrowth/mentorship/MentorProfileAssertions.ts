import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MentorProfilePage } from "pages/careergrowth/mentorship/MentorProfilePage";

export class MentorProfileAssertions extends BaseAssertion<MentorProfilePage> {

    public assertMentorProfilePageLoadsAllFieldsForMentee(mentorName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorProfileMentorTitleText).isVisible(this.isVisibleOptions);
        if (!mentorName.isEmpty()) {
            this.assertThat(this.page.mentorProfileName(mentorName)).isVisible(this.isVisibleOptions);
        }
        this.assertThat(this.page.mentorProfileAvatar).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorAboutSectionHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorSkillsSectionHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorDetails).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorProfilePageLoadsAllFieldsForMentor(mentorName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorProfileMentorTitleText).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorProfileName(mentorName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorProfileAvatar).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorAboutSectionHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorSkillsSectionHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorDetails).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.availableToMentorToggle).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorProfileActionLoads(actionName: string): MentorProfileAssertions {
        this.page.mentorProfileActionsDropdownButton.click();
        this.assertThat(this.page.mentorProfileAction(actionName)).isVisible(this.isVisibleOptions);
        this.page.mentorProfileActionsDropdownButton.click();
        return this;
    }

    public assertMentorMentorshipStatus(mentorshipStatus: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorMentorshipStatus(mentorshipStatus)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertmentorProfileDescriptionContainsText(descriptionText: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorProfileDescriptionText(descriptionText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorEditProfileModalLoads(): MentorProfileAssertions {
        this.assertThat(this.page.mentorEditMentorProfileHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorUserProfilePageLoads(userName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorUserProfileInfo(userName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorDetailsLocationLoads(locationName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorLocationText(locationName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertEditMentorProfileModalLocationLoads(locationName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorEditMentorProfileLocationText(locationName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorSkillNameAndLevelIsDisplayed(skillLevel: string, skillName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorSkillLevelAndNameText(skillLevel, skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorSkillIsNotDisplayed(skillLevel: string, skillName: string): MentorProfileAssertions {
        this.assertThat(this.page.mentorSkillLevelAndNameText(skillLevel, skillName)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }
}
