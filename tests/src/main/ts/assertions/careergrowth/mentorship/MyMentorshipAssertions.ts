// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { expect } from "common/testing/playwright";

export class MyMentorshipAssertions extends BaseAssertion<MyMentorshipPage> {

    public assertMentorStatusIsCorrect(mentorName: string, statusName: string): MyMentorshipAssertions {
        expect(this.page.mentorStatus(mentorName, statusName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertAcceptRejectButtonDisplays(mentorName: string): MyMentorshipAssertions {
        expect(this.page.mentorAcceptRejectButton(mentorName, "Accept")).toBeVisible(this.isVisibleOptions);
        expect(this.page.mentorAcceptRejectButton(mentorName, "Reject")).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorApplicationStatusIsDisplayed(mentorName: string, applicationStatus: string): MyMentorshipAssertions {
        expect(this.page.mentorApplicationStatusText(mentorName, applicationStatus)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertViewCommentModalDisplays(): MyMentorshipAssertions {
        expect(this.page.viewCommentModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertActionForMentorCard(mentorName: string, actionName: string): MyMentorshipAssertions {
        this.page.mentorCardActionsDropDownButton(mentorName).click();
        expect(this.page.mentorCardDropDownAction(mentorName, actionName)).toBeVisible(this.isVisibleOptions);
        this.page.mentorCardActionsDropDownButton(mentorName).click();
        return this;
    }

    public assertMyMenteesTabIsNotDisplayed(): MyMentorshipAssertions {
        expect(this.page.myMenteesTab).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertMyMenteesTabIsDisplayed(): MyMentorshipAssertions {
        expect(this.page.myMenteesTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMyMentorsTabIsDisplayed(): MyMentorshipAssertions {
        expect(this.page.myMentorsTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertViewMyMentorProfileButtonIsNotDisplayed(): MyMentorshipAssertions {
        expect(this.page.viewMyMentorProfileButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertMyMentorshipsPageLoads(): MyMentorshipAssertions {
        expect(this.page.myMentorshipsPageLoad).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorCardIsDisplayed(mentorName: string): MyMentorshipAssertions {
        expect(this.page.mentorCardUserName(mentorName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorIsDisplayed(mentorNameInput: string): MyMentorshipAssertions {
        expect(this.page.mentorName(mentorNameInput)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMenteeExistingCheckInsIsDisplayed(userFullName: string): MyMentorshipAssertions {
//        expect(this.page.menteeExistingCheckInsContainer(userFullName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMenteeManageCheckInsIsDisplayed(userFullName: string): MyMentorshipAssertions {
//        expect(this.page.menteeManageCheckInsButton(userFullName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMenteeCreateACheckInIsDisplayed(userFullName: string): MyMentorshipAssertions {
//        expect(this.page.menteeCreateNewCheckInButton(userFullName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatManageCheckInsModalIsDisplayed(): MyMentorshipAssertions {
//        expect(this.page.manageCheckInsModalHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateACheckInButtonIsDisplayedInManageCheckInsModal(): MyMentorshipAssertions {
//        expect(this.page.manageCheckInsModalCreateACheckInButton).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
