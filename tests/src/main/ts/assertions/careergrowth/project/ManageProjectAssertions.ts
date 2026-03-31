// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { expect } from "common/testing/playwright";

export class ManageProjectAssertions extends BaseAssertion<ManageProjectPage> {

    public assertUserNameDisplaysInAppliedList(userName: string): ManageProjectAssertions {
        expect(this.page.appliedUserName(userName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserNameAndTitleIsDisplayedInSuggestedCandidatesList(userName: string, title: string): ManageProjectAssertions {
        expect(this.page.suggestedCandidateName(userName).first()).toBeVisible(this.isVisibleOptions);
        expect(this.page.suggestedCandidateTitle(userName, title).first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertShareModalDisplaysSelectedUser(userName: string): ManageProjectAssertions {
        expect(this.page.suggestedCandidateShareModal).toBeVisible(this.isVisibleOptions);
        expect(this.page.suggestedCandidateShareModalUserName(userName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantAcceptedTextDisplays(): ManageProjectAssertions {
        expect(this.page.applicantAcceptedText).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantRejectedTextDisplays(): ManageProjectAssertions {
        expect(this.page.applicantRejectedText).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantStatusTextDisplays(statusText: string): ManageProjectAssertions {
        expect(this.page.applicantStatusText_alternative(statusText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertParticipantProjectStatusTextDisplays(projectStatusText: string): ManageProjectAssertions {
        expect(this.page.applicantStatusText(projectStatusText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertParticipantCompletedCount(numCount: string): ManageProjectAssertions {
        expect(this.page.participantCompletedCount(numCount)).toBeVisible(this.isVisibleOptions);
        return this;
    }


    public assertApplicantWithdrawnStatusTextDisplays(): ManageProjectAssertions {
        expect(this.page.applicantWithdrawnStatusText).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertOpeningsAvailableCount(numCount: string): ManageProjectAssertions {
        this.page.getPage().waitForLoadState();
        expect(this.page.openingsAvailableCount(numCount)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserIsDisplayedInSubscribedUserList(userName: string): ManageProjectAssertions {
        expect(this.page.subscribedUserName(userName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserIsNotDisplayedInSubscribedUserList(userName: string): ManageProjectAssertions {
        expect(this.page.subscribedUserName(userName)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertAddOpeningsButtonIsDisplayed(): ManageProjectAssertions {
        expect(this.page.addOpeningsButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertAddOpeningsButtonIsNotDisplayed(): ManageProjectAssertions {
        expect(this.page.addOpeningsButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertWithdrawCommentTextIsDisplayed(withdrawCommentText: string): ManageProjectAssertions {
        expect(this.page.viewMessageText(withdrawCommentText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertRejectApplicantConfirmationModalIsDisplayed(): ManageProjectAssertions {
        expect(this.page.rejectApplicantConfirmationModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertApplicantRejectToasterIsDisplayed(): ManageProjectAssertions {
        expect(this.page.applicantRejectedConfirmationToaster).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertShareProjectSuccessToasterIsDisplayed(): ManageProjectAssertions {
        expect(this.page.shareProjectSuccessToaster).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatApprovalStatusModalIsDisplayed(): ManageProjectAssertions {
        expect(this.page.approvalModalHeaderText).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectOwnerStatusIsDisplayed(statusText: string): ManageProjectAssertions {
        expect(this.page.projectOwnerApprovalStatusText(statusText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectOwnerNameIsDisplayed(ownerName: string): ManageProjectAssertions {
        expect(this.page.projectOwnerNameText(ownerName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectApproverStatusIsDisplayed(statusText1: string, statusText2: string): ManageProjectAssertions {
        expect(this.page.projectApprover1ApprovalStatusText(statusText1)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectApprover2ApprovalStatusText(statusText2)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCheckInsColumnIsVisible(): ManageProjectAssertions {
        expect(this.page.checkInColumnHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatExistingCheckInsIsLoadedForUser(userFullName: string): ManageProjectAssertions {
        expect(this.page.projectParticipantExistingCheckInsContainer(userFullName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateNewCheckInsButtonIsVisibleForUser(userFullName: string): ManageProjectAssertions {
        expect(this.page.projectParticipantCreateNewCheckInButton(userFullName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatManageCheckInsButtonIsVisibleForUser(userFullName: string): ManageProjectAssertions {
        expect(this.page.projectParticipantManageCheckInsButton(userFullName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCreateNewCheckInModalLoads(): ManageProjectAssertions {
        expect(this.page.createNewCheckInModalHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
