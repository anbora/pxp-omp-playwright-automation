// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { MentorProfilePage } from "pages/careergrowth/mentorship/MentorProfilePage";
import { expect } from "common/testing/playwright";

export class MentorProfileAssertions extends BaseAssertion<MentorProfilePage> {

    public assertMentorProfilePageLoadsAllFieldsForMentee(mentorName: string): MentorProfileAssertions {
        expect(this.page.mentorProfileMentorTitleText).toBeVisible(this.isVisibleOptions);
        if (!mentorName.isEmpty()) {
            expect(this.page.mentorProfileName(mentorName)).toBeVisible(this.isVisibleOptions);
        }
        expect(this.page.mentorProfileAvatar).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorAboutSectionHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorSkillsSectionHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorDetails).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorProfilePageLoadsAllFieldsForMentor(mentorName: string): MentorProfileAssertions {
        expect(this.page.mentorProfileMentorTitleText).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorProfileName(mentorName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorProfileAvatar).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorAboutSectionHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorSkillsSectionHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorDetails).toBeVisible(this.isVisibleOptions);
        expect(this.page.availableToMentorToggle).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorProfileActionLoads(actionName: string): MentorProfileAssertions {
        this.page.mentorProfileActionsDropdownButton.click();
        expect(this.page.mentorProfileAction(actionName)).toBeVisible(this.isVisibleOptions);
        this.page.mentorProfileActionsDropdownButton.click();
        return this;
    }

    public assertMentorMentorshipStatus(mentorshipStatus: string): MentorProfileAssertions {
        expect(this.page.mentorMentorshipStatus(mentorshipStatus)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertmentorProfileDescriptionContainsText(descriptionText: string): MentorProfileAssertions {
        expect(this.page.mentorProfileDescriptionText(descriptionText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorEditProfileModalLoads(): MentorProfileAssertions {
        expect(this.page.mentorEditMentorProfileHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorUserProfilePageLoads(userName: string): MentorProfileAssertions {
        expect(this.page.mentorUserProfileInfo(userName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorDetailsLocationLoads(locationName: string): MentorProfileAssertions {
        expect(this.page.mentorLocationText(locationName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertEditMentorProfileModalLocationLoads(locationName: string): MentorProfileAssertions {
        expect(this.page.mentorEditMentorProfileLocationText(locationName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorSkillNameAndLevelIsDisplayed(skillLevel: string, skillName: string): MentorProfileAssertions {
        expect(this.page.mentorSkillLevelAndNameText(skillLevel, skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorSkillIsNotDisplayed(skillLevel: string, skillName: string): MentorProfileAssertions {
        expect(this.page.mentorSkillLevelAndNameText(skillLevel, skillName)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }
}
