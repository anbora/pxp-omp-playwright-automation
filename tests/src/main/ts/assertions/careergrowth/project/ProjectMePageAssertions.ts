// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { expect } from "common/testing/playwright";

export class ProjectMePageAssertions extends BaseAssertion<ProjectsMePage> {

    public assertProjectIsDisplayed(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectTitleMePage(projectTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.projectTitleMePage(projectTitle).should('exist')
        return this;
    }

    public assertProjectIsDisplayedInMyProjectsTab(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectTitleMyProjectsPage(projectTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.projectTitleMyProjectsPage(projectTitle).should('exist')
        return this;
    }

    public assertProjectIsNotDisplayedInMyProjectsTab(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectTitleMyProjectsPage(projectTitle)).toBeHidden();
//        this.page.projectTitleMyProjectsPage(projectTitle).should('not.exist')
        return this;
    }

    public assertOpeningsCountMatches(projectTitle: string, openingsCount: string): ProjectMePageAssertions {
        expect(this.page.projectOpeningsCountField(projectTitle, openingsCount)).toBeVisible(this.isVisibleOptions);
//        this.page.projectOpeningsCountField(projectTitle,openingsCount).should('exist')
        return this;
    }

    public assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.ownedByMeHorizontalCardProjectTitle(projectTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.ownedByMeHorizontalCardProjectTitle(projectTitle).should('exist')
        return this;
    }

    public assertProjectIsDisplayedInSharedWithMe(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectTitleSharedWithMePage(projectTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertPublishedTabIsDisplayed(): ProjectMePageAssertions {
        expect(this.page.publishedLeftTab).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertSharedByUserIsExpected(projectTitle: string, userName: string): ProjectMePageAssertions {
        expect(this.page.projectSharedByUserName(projectTitle, userName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertShareMessageIsDisplayed(shareMessage: string): ProjectMePageAssertions {
        expect(this.page.shareProjectViewMessageModalHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.shareProjectMessageText(shareMessage)).toBeVisible(this.isVisibleOptions);
        this.page.shareProjectViewMessageCloseModal.click();
        return this;
    }

    public assertMyProjectsRejectMessageIsDisplayed(rejectMessage: string, senderUserName: string): ProjectMePageAssertions {
        expect(this.page.myProjectsViewMessageModalHeader(senderUserName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.myProjectsViewRejectionMessageText(rejectMessage)).toBeVisible(this.isVisibleOptions);
        this.page.shareProjectViewMessageCloseModal.click();
        return this;
    }

    public assertLocationIsDisplayed(projectTitle: string, locationName: string): ProjectMePageAssertions {
        expect(this.page.projectLocation(projectTitle,locationName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertActionIsDisplayedInManageProjectPage(projectTitle: string, actionName: string): ProjectMePageAssertions {
        this.page.projectActionsDropDownMenu(projectTitle).click();
        expect(this.page.projectActions(actionName)).toBeVisible(this.isVisibleOptions);
        this.page.projectActionsDropDownMenu(projectTitle).click();
        return this;
    }

    public assertCreateAProjectButtonIsNotDisplayed(): ProjectMePageAssertions {
        expect(this.page.createAProjectButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertProjectStatusIsDisplayedInProjectCard(projectTitle: string, projectStatus: string): ProjectMePageAssertions {
        expect(this.page.projectHorizontalCardStatus(projectTitle, projectStatus)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectDefaultActionIsDisplayedInProjectCard(projectTitle: string, defaultAction: string): ProjectMePageAssertions {
        expect(this.page.projectHorizontalCardDefaultAction(projectTitle, defaultAction)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectDefaultActionIsDisplayedInOwnedByMeCard(projectTitle: string, defaultAction: string): ProjectMePageAssertions {
        expect(this.page.ownedByMeHorizontalCardDefaultAction(projectTitle, defaultAction)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectIsDisplayedInMyProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectHorizontalCardTitle(projectTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectIsNotDisplayedInMyProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectHorizontalCardTitle(projectTitle)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertProjectIsNotDisplayedInOwnedByMeProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.ownedByMeHorizontalCardProjectTitle(projectTitle)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertProjectHorizontalCardActionsLoad(projectTitle: string): ProjectMePageAssertions {
        expect(this.page.projectHorizontalCardActionList(projectTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertSuccessToastIsDisplayed(): ProjectMePageAssertions {
        expect(this.page.successToastMessage).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public appliedConfirmationModalDisplays(): ProjectMePageAssertions {
        expect(this.page.appliedConfirmationModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertAppliedUserDetails(userName: string, projectName: string, userStatus: string): ProjectMePageAssertions {
        expect(this.page.appliedUserUserName(userName)).toBeVisible(this.isVisibleOptions);
        //expect(this.page.appliedUserUserRole(userName, userRole)).toBeVisible(this.isVisibleOptions);
        expect(this.page.appliedUserProjectName(userName,projectName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.appliedUserStatusText(userName,userStatus)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertAppliedUserDetailsBeforeApproval(userName: string, projectName: string): ProjectMePageAssertions {
        expect(this.page.appliedUserUserName(userName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.appliedUserProjectName(userName,projectName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertApprovalRequestsTabDisplays(): ProjectMePageAssertions {
        expect(this.page.approvalRequestsHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertStatusDetailsModalDisplays(): ProjectMePageAssertions {
        expect(this.page.statusDetailsHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserApprovalStatus(user1ApprovalStatus: string, user2ApprovalStatus: string): ProjectMePageAssertions {
        expect(this.page.projectApprover1ApprovalStatusText(user1ApprovalStatus)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectApprover2ApprovalStatusText(user2ApprovalStatus)).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
