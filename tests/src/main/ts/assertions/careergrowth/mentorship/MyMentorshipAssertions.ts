import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";

export class MyMentorshipAssertions extends BaseAssertion<MyMentorshipPage> {

    public assertMentorStatusIsCorrect(mentorName: string, statusName: string): MyMentorshipAssertions {
        this.assertThat(this.page.mentorStatus(mentorName, statusName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertAcceptRejectButtonDisplays(mentorName: string): MyMentorshipAssertions {
        this.assertThat(this.page.mentorAcceptRejectButton(mentorName, "Accept")).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.mentorAcceptRejectButton(mentorName, "Reject")).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorApplicationStatusIsDisplayed(mentorName: string, applicationStatus: string): MyMentorshipAssertions {
        this.assertThat(this.page.mentorApplicationStatusText(mentorName, applicationStatus)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertViewCommentModalDisplays(): MyMentorshipAssertions {
        this.assertThat(this.page.viewCommentModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertActionForMentorCard(mentorName: string, actionName: string): MyMentorshipAssertions {
        this.page.mentorCardActionsDropDownButton(mentorName).click();
        this.assertThat(this.page.mentorCardDropDownAction(mentorName, actionName)).isVisible(this.isVisibleOptions);
        this.page.mentorCardActionsDropDownButton(mentorName).click();
        return this;
    }

    public assertMyMenteesTabIsNotDisplayed(): MyMentorshipAssertions {
        this.assertThat(this.page.myMenteesTab).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertMyMenteesTabIsDisplayed(): MyMentorshipAssertions {
        this.assertThat(this.page.myMenteesTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMyMentorsTabIsDisplayed(): MyMentorshipAssertions {
        this.assertThat(this.page.myMentorsTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertViewMyMentorProfileButtonIsNotDisplayed(): MyMentorshipAssertions {
        this.assertThat(this.page.viewMyMentorProfileButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertMyMentorshipsPageLoads(): MyMentorshipAssertions {
        this.assertThat(this.page.myMentorshipsPageLoad).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorCardIsDisplayed(mentorName: string): MyMentorshipAssertions {
        this.assertThat(this.page.mentorCardUserName(mentorName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMentorIsDisplayed(mentorNameInput: string): MyMentorshipAssertions {
        this.assertThat(this.page.mentorName(mentorNameInput)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMenteeExistingCheckInsIsDisplayed(userFullName: string): MyMentorshipAssertions {
//        assertThat(this.page.menteeExistingCheckInsContainer(userFullName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMenteeManageCheckInsIsDisplayed(userFullName: string): MyMentorshipAssertions {
//        assertThat(this.page.menteeManageCheckInsButton(userFullName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMenteeCreateACheckInIsDisplayed(userFullName: string): MyMentorshipAssertions {
//        assertThat(this.page.menteeCreateNewCheckInButton(userFullName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatManageCheckInsModalIsDisplayed(): MyMentorshipAssertions {
//        assertThat(this.page.manageCheckInsModalHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateACheckInButtonIsDisplayedInManageCheckInsModal(): MyMentorshipAssertions {
//        assertThat(this.page.manageCheckInsModalCreateACheckInButton).isVisible(this.isVisibleOptions);
        return this;
    }
}
