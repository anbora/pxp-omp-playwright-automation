import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class ProjectMePageAssertions extends BaseAssertion<ProjectsMePage> {

    public assertProjectIsDisplayed(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectTitleMePage(projectTitle)).isVisible(this.isVisibleOptions);
//        this.page.projectTitleMePage(projectTitle).should('exist')
        return this;
    }

    public assertProjectIsDisplayedInMyProjectsTab(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectTitleMyProjectsPage(projectTitle)).isVisible(this.isVisibleOptions);
//        this.page.projectTitleMyProjectsPage(projectTitle).should('exist')
        return this;
    }

    public assertProjectIsNotDisplayedInMyProjectsTab(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectTitleMyProjectsPage(projectTitle)).isHidden();
//        this.page.projectTitleMyProjectsPage(projectTitle).should('not.exist')
        return this;
    }

    public assertOpeningsCountMatches(projectTitle: string, openingsCount: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectOpeningsCountField(projectTitle, openingsCount)).isVisible(this.isVisibleOptions);
//        this.page.projectOpeningsCountField(projectTitle,openingsCount).should('exist')
        return this;
    }

    public assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.ownedByMeHorizontalCardProjectTitle(projectTitle)).isVisible(this.isVisibleOptions);
//        this.page.ownedByMeHorizontalCardProjectTitle(projectTitle).should('exist')
        return this;
    }

    public assertProjectIsDisplayedInSharedWithMe(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectTitleSharedWithMePage(projectTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertPublishedTabIsDisplayed(): ProjectMePageAssertions {
        this.assertThat(this.page.publishedLeftTab).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertSharedByUserIsExpected(projectTitle: string, userName: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectSharedByUserName(projectTitle, userName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertShareMessageIsDisplayed(shareMessage: string): ProjectMePageAssertions {
        this.assertThat(this.page.shareProjectViewMessageModalHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.shareProjectMessageText(shareMessage)).isVisible(this.isVisibleOptions);
        this.page.shareProjectViewMessageCloseModal.click();
        return this;
    }

    public assertMyProjectsRejectMessageIsDisplayed(rejectMessage: string, senderUserName: string): ProjectMePageAssertions {
        this.assertThat(this.page.myProjectsViewMessageModalHeader(senderUserName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.myProjectsViewRejectionMessageText(rejectMessage)).isVisible(this.isVisibleOptions);
        this.page.shareProjectViewMessageCloseModal.click();
        return this;
    }

    public assertLocationIsDisplayed(projectTitle: string, locationName: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectLocation(projectTitle,locationName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertActionIsDisplayedInManageProjectPage(projectTitle: string, actionName: string): ProjectMePageAssertions {
        this.page.projectActionsDropDownMenu(projectTitle).click();
        this.assertThat(this.page.projectActions(actionName)).isVisible(this.isVisibleOptions);
        this.page.projectActionsDropDownMenu(projectTitle).click();
        return this;
    }

    public assertCreateAProjectButtonIsNotDisplayed(): ProjectMePageAssertions {
        this.assertThat(this.page.createAProjectButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertProjectStatusIsDisplayedInProjectCard(projectTitle: string, projectStatus: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectHorizontalCardStatus(projectTitle, projectStatus)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectDefaultActionIsDisplayedInProjectCard(projectTitle: string, defaultAction: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectHorizontalCardDefaultAction(projectTitle, defaultAction)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectDefaultActionIsDisplayedInOwnedByMeCard(projectTitle: string, defaultAction: string): ProjectMePageAssertions {
        this.assertThat(this.page.ownedByMeHorizontalCardDefaultAction(projectTitle, defaultAction)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectIsDisplayedInMyProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectHorizontalCardTitle(projectTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectIsNotDisplayedInMyProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectHorizontalCardTitle(projectTitle)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertProjectIsNotDisplayedInOwnedByMeProjectsHorizontalCard(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.ownedByMeHorizontalCardProjectTitle(projectTitle)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertProjectHorizontalCardActionsLoad(projectTitle: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectHorizontalCardActionList(projectTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertSuccessToastIsDisplayed(): ProjectMePageAssertions {
        this.assertThat(this.page.successToastMessage).isVisible(this.isVisibleOptions);
        return this;
    }

    public appliedConfirmationModalDisplays(): ProjectMePageAssertions {
        this.assertThat(this.page.appliedConfirmationModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertAppliedUserDetails(userName: string, projectName: string, userStatus: string): ProjectMePageAssertions {
        this.assertThat(this.page.appliedUserUserName(userName)).isVisible(this.isVisibleOptions);
        //assertThat(this.page.appliedUserUserRole(userName, userRole)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.appliedUserProjectName(userName,projectName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.appliedUserStatusText(userName,userStatus)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertAppliedUserDetailsBeforeApproval(userName: string, projectName: string): ProjectMePageAssertions {
        this.assertThat(this.page.appliedUserUserName(userName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.appliedUserProjectName(userName,projectName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertApprovalRequestsTabDisplays(): ProjectMePageAssertions {
        this.assertThat(this.page.approvalRequestsHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertStatusDetailsModalDisplays(): ProjectMePageAssertions {
        this.assertThat(this.page.statusDetailsHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertUserApprovalStatus(user1ApprovalStatus: string, user2ApprovalStatus: string): ProjectMePageAssertions {
        this.assertThat(this.page.projectApprover1ApprovalStatusText(user1ApprovalStatus)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectApprover2ApprovalStatusText(user2ApprovalStatus)).isVisible(this.isVisibleOptions);
        return this;
    }
}
