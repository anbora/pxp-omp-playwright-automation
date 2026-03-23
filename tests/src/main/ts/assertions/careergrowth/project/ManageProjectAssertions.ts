import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";

export class ManageProjectAssertions extends BaseAssertion<ManageProjectPage> {

    public assertUserNameDisplaysInAppliedList(userName: string): ManageProjectAssertions {
        this.assertThat(this.page.appliedUserName(userName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserNameAndTitleIsDisplayedInSuggestedCandidatesList(userName: string, title: string): ManageProjectAssertions {
        this.assertThat(this.page.suggestedCandidateName(userName).first()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.suggestedCandidateTitle(userName, title).first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertShareModalDisplaysSelectedUser(userName: string): ManageProjectAssertions {
        this.assertThat(this.page.suggestedCandidateShareModal).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.suggestedCandidateShareModalUserName(userName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantAcceptedTextDisplays(): ManageProjectAssertions {
        this.assertThat(this.page.applicantAcceptedText).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantRejectedTextDisplays(): ManageProjectAssertions {
        this.assertThat(this.page.applicantRejectedText).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantStatusTextDisplays(statusText: string): ManageProjectAssertions {
        this.assertThat(this.page.applicantStatusText_alternative(statusText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertParticipantProjectStatusTextDisplays(projectStatusText: string): ManageProjectAssertions {
        this.assertThat(this.page.applicantStatusText(projectStatusText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertParticipantCompletedCount(numCount: string): ManageProjectAssertions {
        this.assertThat(this.page.participantCompletedCount(numCount)).isVisible(this.isVisibleOptions);
        return this;
    }


    public assertApplicantWithdrawnStatusTextDisplays(): ManageProjectAssertions {
        this.assertThat(this.page.applicantWithdrawnStatusText).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertOpeningsAvailableCount(numCount: string): ManageProjectAssertions {
        this.page.getPage().waitForLoadState();
        this.assertThat(this.page.openingsAvailableCount(numCount)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserIsDisplayedInSubscribedUserList(userName: string): ManageProjectAssertions {
        this.assertThat(this.page.subscribedUserName(userName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserIsNotDisplayedInSubscribedUserList(userName: string): ManageProjectAssertions {
        this.assertThat(this.page.subscribedUserName(userName)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertAddOpeningsButtonIsDisplayed(): ManageProjectAssertions {
        this.assertThat(this.page.addOpeningsButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertAddOpeningsButtonIsNotDisplayed(): ManageProjectAssertions {
        this.assertThat(this.page.addOpeningsButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertWithdrawCommentTextIsDisplayed(withdrawCommentText: string): ManageProjectAssertions {
        this.assertThat(this.page.viewMessageText(withdrawCommentText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertRejectApplicantConfirmationModalIsDisplayed(): ManageProjectAssertions {
        this.assertThat(this.page.rejectApplicantConfirmationModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantRejectToasterIsDisplayed(): ManageProjectAssertions {
        this.assertThat(this.page.applicantRejectedConfirmationToaster).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertShareProjectSuccessToasterIsDisplayed(): ManageProjectAssertions {
        this.assertThat(this.page.shareProjectSuccessToaster).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatApprovalStatusModalIsDisplayed(): ManageProjectAssertions {
        this.assertThat(this.page.approvalModalHeaderText).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectOwnerStatusIsDisplayed(statusText: string): ManageProjectAssertions {
        this.assertThat(this.page.projectOwnerApprovalStatusText(statusText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectOwnerNameIsDisplayed(ownerName: string): ManageProjectAssertions {
        this.assertThat(this.page.projectOwnerNameText(ownerName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectApproverStatusIsDisplayed(statusText1: string, statusText2: string): ManageProjectAssertions {
        this.assertThat(this.page.projectApprover1ApprovalStatusText(statusText1)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectApprover2ApprovalStatusText(statusText2)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCheckInsColumnIsVisible(): ManageProjectAssertions {
        this.assertThat(this.page.checkInColumnHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatExistingCheckInsIsLoadedForUser(userFullName: string): ManageProjectAssertions {
        this.assertThat(this.page.projectParticipantExistingCheckInsContainer(userFullName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateNewCheckInsButtonIsVisibleForUser(userFullName: string): ManageProjectAssertions {
        this.assertThat(this.page.projectParticipantCreateNewCheckInButton(userFullName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatManageCheckInsButtonIsVisibleForUser(userFullName: string): ManageProjectAssertions {
        this.assertThat(this.page.projectParticipantManageCheckInsButton(userFullName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateNewCheckInModalLoads(): ManageProjectAssertions {
        this.assertThat(this.page.createNewCheckInModalHeader).isVisible(this.isVisibleOptions);
        return this;
    }
}
