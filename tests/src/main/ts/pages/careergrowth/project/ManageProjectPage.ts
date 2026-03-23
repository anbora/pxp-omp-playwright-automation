import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";

export class ManageProjectPage extends BasePage {

    public applicantStatusTab: Locator = this.page.locator("//button[@aria-controls='assign_content_panel'][text()='Applications']");
    public suggestedCandidatesTab: Locator = this.page.locator("//button[@aria-controls='assign_content_panel'][text()='Suggested candidates']");
    public particpantProgressTab: Locator = this.page.locator("//button[@aria-controls='assign_content_panel'][text()='Participants']");
    public suggestedCandidateShareModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Share Project']|//div[@class='ed-dialog-modal-header']/h2[text()='Share Project']");
    public shareModalShareButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Share']");
    public suggestedCandidateShareModalUserName(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='single-user-share']/span[@class='user-name' and text()='%s']", userName);
    }
    public appliedUserName(userName: string): Locator {
      return this.getLocatorWithParam("//span[@class='user-name' and text()='%s']", userName);
    }
    public suggestedCandidateName(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='table-candidate-name']/span[text()='%s'] | //div[@class='table-candidate-name']/div[@aria-label='%s']", userName, userName);
    }
    public suggestedCandidateTitle(userName: string, title: string): Locator {
      return this.getLocatorWithParam("//div[@class='table-candidate-name']/span[text()='%s']/following-sibling::span[text()='%s'] | //div[@class='table-candidate-name']/div[@aria-label='%s']/following-sibling::span[text()='%s']", userName, title, userName, title);
    }
    public suggestedCandidateShareIcon(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='table-candidate-name']/span[text()='%s']/ancestor::tr/descendant::span[@class='icon-share1'] | //div[@class='table-candidate-name']/div[@aria-label='%s']/ancestor::tr/descendant::span[@class='icon-share1']", userName, userName);
    }
    public suggestedCandidateShareMessageTextBox: Locator = this.page.locator("//div[@class='ed-input-container']/textarea");
    public applicantStatusRejectButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Reject']");
    public applicantStatusApproveButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Accept']");
    public applicantStatusAcceptButtonForSpecificUser(userName: string): Locator {
      return this.getLocatorWithParam("//span[@class='user-name' and text()='%s']/ancestor::td/following-sibling::td[contains(@class,'applicant-row action')]/div/button[@class='ed-btn ed-btn-primary' and text()='Accept']", userName);
    }
    public applicantStatusRejectButtonForSpecificUser(userName: string): Locator {
      return this.getLocatorWithParam("//span[@class='user-name' and text()='%s']/ancestor::td/following-sibling::td[contains(@class,'applicant-row action')]/div/button[@class='ed-btn ed-btn-neutral' and text()='Reject']", userName);
    }
    public applicantAcceptedText: Locator = this.page.locator("//div[contains(@class, 'om__manage-project-application-status--label')][text() = 'Accepted']");
    public applicantStatusText_alternative(statusText1: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'om__manage-project-application-status--label')][text() = '%s']", statusText1);
    }
    public applicantRejectedText: Locator = this.page.locator("//span[@class='application-status-text' and text()='Rejected'] | //div[contains(@class, 'om__manage-project-application-status--label')][text() = 'Rejected']");
    public applicantMarkAsCompleteButton: Locator = this.page.locator("//td[@class='applicant-row ']/div/div/button[@class='ed-btn ed-btn-neutral' and text()='Mark as complete']");
    public participantCompletedCount(numCount: string): Locator {
      return this.getLocatorWithParam("//span[@class='stats-type' and text()='Completed']//following-sibling::span[text()='%s']", numCount);
    }
    public backButtonManageProject: Locator = this.page.locator("//button[@class='back-arrow-wrapper']");
    public applicantStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//td[contains(@class, 'applicant-row status')]//div[text()='%s']", statusText);
    }
    public manageProjectActionsDropDownButton: Locator = this.page.locator("//div[@class='project-manage-header__right']//div//div//button[@class='dropdown-btn']");
    public manageProjectsClickOnAAction(actionName: string): Locator {
      return this.getLocatorWithParam("//ul[@class='tm__project-dropdown-list']/li[text()='%s'] | //ul[@class='tm__project-dropdown-list']/li/button[text()='%s']", actionName, actionName);
    }
    public applicantWithdrawnStatusText: Locator = this.page.locator("//div[contains(@class, 'om__project-application-status--label withdrawn')] | //div[contains(@class, 'om__manage-project-application-status--label')][text() = 'Withdrawn']");
    public openingsAvailableCount(numCount: string): Locator {
      return this.getLocatorWithParam("//span[@class='stats-type' and text()='Available']/following-sibling::span[text()='%s'] | //span[@class='stats-type' and text()='Openings left']/following-sibling::span[text()='%s']", numCount, numCount);
    }
    public participantStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//td[@class='applicant-row status']//div[text()='%s']", statusText);
    }
    public subscribedUserName(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='subscribed-user-container']//div//div/a[@id='first-user-profile-link' and text()='%s']", userName);
    }
    public addOpeningsButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Add openings']");
    public viewMessageButton: Locator = this.page.locator("//button[@class='view-comments__btn']");
    public viewMessageText(commentText: string): Locator {
      return this.getLocatorWithParam("//p[@class='show-comments' and text()='%s']", commentText);
    }
    public rejectApplicantConfirmationModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Reject this applicant?']");
    public rejectMessageText: Locator = this.page.locator("//textarea[@id='rejection-input']");
    public rejectButtonRejectConfirmationModal: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Yes, reject']");
    public applicantRejectedConfirmationToaster: Locator = this.page.locator("//div[@class = 'success']/span[@id='toast-message']/span[text()='Project applicant rejected!']");
    public shareProjectSuccessToaster: Locator = this.page.locator("//div[@class = 'success']/span[@id='toast-message']/span[text()='You have successfully shared']");
    public applicantSeeDetailsButton: Locator = this.page.locator("//button[@class='om__manage-project-application-status--see-details-btn']");
    public approvalModalHeaderText: Locator = this.page.locator("//h1[text()='Status Details']");
    public approvalModalCloseButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Close']");
    public projectOwnerNameText(ownerName: string): Locator {
      return this.getLocatorWithParam("//div[@class='project-owner']/a[text()='%s']",ownerName);
    }
    public projectApprover1ApprovalStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//div[@class='approvers-list']/div[1]/div/div[text()='%s']",statusText);
    }
    public projectApprover2ApprovalStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//div[@class='approvers-list']/div[2]/div/div[text()='%s']",statusText);
    }
    public projectOwnerApprovalStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//div[@class='status-section']/div/div[contains(@class,'om__manage-project-application-status') and text()='%s']", statusText);
    }
    public checkInColumnHeader: Locator = this.page.locator("//div[@class='manage-project-column application-checkins ']");
    public projectParticipantExistingCheckInsContainer(username: string): Locator {
      return this.getLocatorWithParam("//span[@class='user-name' and text()='%s']/ancestor::tr/td[@class='applicant-row checkin checkins-visible']/div/div/div/div/div/div/button", username);
    }
    public projectParticipantCreateNewCheckInButton(username: string): Locator {
      return this.getLocatorWithParam("//span[@class='user-name' and text()='%s']/ancestor::tr/td[@class='applicant-row checkin checkins-visible']/div/div/div/div/button[text()='Create a check-in']", username);
    }
    public projectParticipantManageCheckInsButton(username: string): Locator {
      return this.getLocatorWithParam("//span[@class='user-name' and text()='%s']/ancestor::tr/td[@class='applicant-row checkin checkins-visible']/div/div/div/div/div/div/following-sibling::button[text()='Manage check-ins']", username);
    }
    public createNewCheckInModalHeader: Locator = this.page.locator("//div[@data-testid='rcl$modal_standard_header_title']");

    public clickApplicantTab(): ManageProjectPage {
        applicantStatusTab.click();
        return this;
    }

    public clickParticipantProgressTab(): ManageProjectPage {
        particpantProgressTab.click();
        this.pause(5000);
        return this;
    }

    public clickSuggestedCandidatesTab(): ManageProjectPage {
        suggestedCandidatesTab.click();
        this.page.reload(); //(this is to avoid API delays)
        suggestedCandidatesTab.click();
        return this;
    }

    public clickSuggestedCandidatesShareIcon(userName: string): ManageProjectPage {
        this.suggestedCandidateShareIcon(userName).first().click();
        return this;
    }

    public submitShareWithMessage(message: string): ManageProjectPage {
        suggestedCandidateShareMessageTextBox.click();
        suggestedCandidateShareMessageTextBox.fill(message);
        shareModalShareButton.click();
        return this;
    }

    public clickApplicantApproveButton(): ManageProjectPage {
        applicantStatusApproveButton.click();
        return this;
    }

    public clickApplicantAcceptButtonForSpecificUser(userName: string): ManageProjectPage {
        this.applicantStatusAcceptButtonForSpecificUser(userName).click();
        return this;
    }

    public clickApplicantRejectButtonForSpecificUser(userName: string): ManageProjectPage {
        this.applicantStatusRejectButtonForSpecificUser(userName).click();
        return this;
    }

    public clickApplicantRejectButton(): ManageProjectPage {
        applicantStatusRejectButton.click();
        return this;
    }

    public clickMarkAsCompleteButton(): ManageProjectPage {
        applicantMarkAsCompleteButton.click();
        return this;
    }

    public clickBackButtonManageProject(): ManageProjectPage {
        backButtonManageProject.click();
        return this;
    }

    public clickOnAActionManageProjects(actionName: string): ProjectDetailsPage {
        manageProjectActionsDropDownButton.click();
        this.manageProjectsClickOnAAction(actionName).click();
        return this.getPageClassInstance(ProjectDetailsPage);
    }

    public clickAddOpeningsButton(): CreateProjectPage {
        addOpeningsButton.click();
        return this.getPageClassInstance(CreateProjectPage);
    }

    public clickViewMessageDropDownButton(): ManageProjectPage {
        viewMessageButton.first().click();
        return this;
    }

    public rejectApplicantWithMessage(rejectMessage: string): ManageProjectPage {
        rejectMessageText.fill(rejectMessage);
        rejectButtonRejectConfirmationModal.click();
        return this;
    }

    public copyCurrentURL(url: ResultContainer): ManageProjectPage {
        this.page.waitForLoadState();
        url.setValue(this.page.url());
        return this;
    }

    public reloadAndClickParticpantTab(): ManageProjectPage {
        this.page.reload();
        suggestedCandidatesTab.click();
        return this;
    }

    public refreshUntilSuggestedCandidateAppears(candidateName: string): ManageProjectPage {
        this.repeatUntilElementToBeVisible(() => {
        }, suggestedCandidateName(candidateName).first(), 30, 10000, this::reloadAndClickParticpantTab);
        return this;
    }

    public clickApplicantSeeDetailsButton(): ManageProjectPage {
        applicantSeeDetailsButton.click();
        return this;
    }

    public clickApprovalStatusModalCloseButton(): ManageProjectPage {
        approvalModalCloseButton.click();
        return this;
    }

    public clickCreateNewCheckInButtonForUser(userFullName: string): ManageProjectPage {
        this.projectParticipantCreateNewCheckInButton(userFullName).click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
