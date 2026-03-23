import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";

export class ProjectDetailsPage extends BasePage {

    public projectTitleHeader: Locator = this.page.locator(".project-title");
    public projectMetaDetailsSection: Locator = this.page.locator(".project-header-meta");
    public projectOwnersList: Locator = this.page.locator(".project-owners");
    public projectPublishedDate: Locator = this.page.locator(".project-published-date");
    public projectDetailsRightPanel: Locator = this.page.locator(".tm__project-details-right-panel");
    public projectDetailsRightPanelMetaDetails(textToAssert: string): Locator {
      return this.getLocatorWithParam("//span[@class='om__sidebar-meta--label' and text()='%s']", textToAssert);
    }
    public projectDetailsRightPanelOrgDetails(textToAssert: string): Locator {
      return this.getLocatorWithParam("//span[@class='om__sidebar-meta--label']/div/span[2][text()='%s']", textToAssert);
    }
    public projectDetailsRightPanelSRTextOnly(locationName: string): Locator {
      return this.getLocatorWithParam("//span[@class='om__sidebar-meta--label']/div/span[@aria-hidden and text()='%s']", locationName);
    }
    public projectDescriptionHeader: Locator = this.page.locator("//h2[text()='Project Description']");
    public relatedSkillsHeader: Locator = this.page.locator("//h2[@class='om__section--title' and contains(text(),'Related Skills')]");
    public skillLevelAndName(skillLevelHeaderName: string, skillName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'ed-single-skill-section')]/h3[text()='%s']/following-sibling::div/descendant::span[contains(text(), '%s')]", skillLevelHeaderName, skillName);
    }
    public relatedJobRolesHeader: Locator = this.page.locator("//div[@class='role-carousel-header_left__title' and text()='Related Job Roles']");
    public relatedJobRolesCardTitle(roleName: string): Locator {
      return this.getLocatorWithParam("//div[@class='role-card_header']/div[text()='%s']", roleName);
    }
    public projectActionsDropDownButton: Locator = this.page.locator("//div[@class='project-header block']//div[2]//div//div//button[@class='dropdown-btn']");
    public projectDetailsActions(actionName: string): Locator {
      return this.getLocatorWithParam("//ul[@class='tm__project-dropdown-list']/li/button[text()='%s']", actionName);
    }
    public projectLocationsText(locationName: string): Locator {
      return this.getLocatorWithParam("//div/span[@class='om__sidebar-meta--title' and text()='Locations']/following-sibling::span/div/span[@aria-hidden='true' and text()='%s']", locationName);
    }
    public applyButton: Locator = this.page.locator("//div/button[text()='Apply']");
    public getStartedButton: Locator = this.page.locator("//div//button[@class='ed-btn ed-btn-primary cta' and text()='Participate']");
    public applyButtonDisabled: Locator = this.page.locator("//div/button[text()='Apply' and @disabled='']");
    public appliedConfirmationModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Participation confirmed']");
    public appliedConfirmationModalCloseButton: Locator = this.page.locator("//div/button[text()='Close']");
    public applyConfirmationModal: Locator = this.page.locator("//h1[text()='Apply for Project']|//h2[text()='Apply for Project']");
    public applyToAProjectConfirmationModal: Locator = this.page.locator("//h1[text()='Application Confirmation']|//h2[text()='Application Confirmation']");
    public applyToALimitedOpeningProjectMsgTxtBox: Locator = this.page.locator("//textarea[@id='apply-project-comments']");
    public applyToALimitedOpeningProjectManagerConsentChkBox: Locator = this.page.locator("//div[@class='apply-project-modal__manager']/label/input");
    public applyToALimitedOpeningProjectSubmitButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Submit']");
    public applyToAProjectConfirmationModalCloseButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Close']");
    public withdrawConfirmationModal: Locator = this.page.locator("//h1[text()='Are you sure you want to withdraw?']|//h2[text()='Are you sure you want to withdraw?']");
    public withdrawConfirmationModalYesButton: Locator = this.page.locator("//button[contains(text(), 'Yes, withdraw')]");
    public withdrawConfirmationModalMessageTextArea: Locator = this.page.locator("//textarea['input-area supporting-text font-size-xl input-field-border']");
    public orgUnitTypeFieldLabel(orgUnitTypeName: string): Locator {
      return this.getLocatorWithParam("//span[@class='om__sidebar-meta--title' and text()='%s']", orgUnitTypeName);
    }
    public projectDetailsApplicantStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'om__project-application-status--label') and text()='%s']", statusText);
    }
    public closeProjectModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Close Project?']|//div[@class='ed-dialog-modal-header']/h2[text()='Close Project?'] | //div[@class='ed-dialog-modal-header']/h2[text()='Confirm']");
    public closeButtonCloseProjectModal: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Close']");
    public bookmarkButton: Locator = this.page.locator("//i[@class='icon-bookmark']");
    public shareButton: Locator = this.page.locator("//i[@class='icon-share1']");
    public confirmationToaster(toasterText: string): Locator {
      return this.getLocatorWithParam("//div[@class='info']/span/span[text()='%s']", toasterText);
    }
    public withdrawConfirmationToaster(toasterText: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'success']/span[@id='toast-message']/span[text()='%s']", toasterText);
    }
    public opportunitiesTab: Locator = this.page.locator("//div[@class='menu-items-wrapper']/ul/li/a[@href='/career']");
    public capacityFullText: Locator = this.page.locator("//div[@class='notify-container m-margin-top']/span[text()='This Project is full. Sign up to get notified if openings are added.']");
    public notifyMeButton: Locator = this.page.locator("//div[@class='notify-container m-margin-top']/div/button[text()='Notify me']");
    public subscribedText: Locator = this.page.locator("//div[@class='subscribed-container m-margin-top' and text()='Thanks for your interest. We will notify you if openings are added.']");
    public projectDetailsLocation: Locator = getByText("Locations").build();
    public backButton: Locator = getByRole(AriaRole.BUTTON, "Back").build();

    public clickApplyForAProject(): ProjectDetailsPage {
        applyButton.click();
        return this;
    }

    public clickGetStartedForAProject(): ProjectDetailsPage {
        getStartedButton.click();
        return this;
    }

    public clickCloseButtonAppliedToAProjectConfModal(): ProjectDetailsPage {
        appliedConfirmationModalCloseButton.click();
        return this;
    }

    public clickApplyForAProjectLimitedOpenings(): ProjectDetailsPage {
        applyButton.click();
        return this;
    }

    public clickSubmitButtonApplyToLimitedOpeningProject(): ProjectDetailsPage {
//        applyToALimitedOpeningProjectMsgTxtBox.fill(UUID.randomUUID().toString());
//        applyToALimitedOpeningProjectManagerConsentChkBox.click();
        applyToALimitedOpeningProjectSubmitButton.click();
        return this;
    }

    public clickSubmitButtonWithMsgAndConsentYesToProject(textmessage: string): ProjectDetailsPage {
        applyToALimitedOpeningProjectMsgTxtBox.fill(textmessage);
        applyToALimitedOpeningProjectManagerConsentChkBox.click();
        applyToALimitedOpeningProjectSubmitButton.click();
        return this;
    }

    public clickCloseButtonApplyToALimitedOpeningProjectConfModal(): ProjectDetailsPage {
        applyToAProjectConfirmationModalCloseButton.click();
        return this;
    }

    public clickCloseButtonCloseProjectModal(): ProjectDetailsPage {
        closeButtonCloseProjectModal.click();
        return this;
    }

    public <T extends BasePage> clickOnAProjectAction(actionName: string, clazz: Class<T>): T {
        projectActionsDropDownButton.click();
        this.projectDetailsActions(actionName).click();
        return this.getPageClassInstance(clazz);
    }

    public clickonBookmarkIcon(): ProjectDetailsPage {
        bookmarkButton.click();
        return this;
    }

    public clickonShareIcon(): ProjectDetailsPage {
        shareButton.click();
        return this;
    }

    public clickNotifyMeButton(): ProjectDetailsPage {
        notifyMeButton.click();
        return this;
    }

    public clickWithdrawYesButton(): ProjectDetailsPage {
        withdrawConfirmationModalYesButton.click();
        return this;
    }

    public clickWithdrawYesButtonWithMsg(textmessage: string): ProjectDetailsPage {
        withdrawConfirmationModalMessageTextArea.fill(textmessage);
        withdrawConfirmationModalYesButton.click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickBackButton(): ProjectDiscoveryPage {
        backButton.click();
        this.page.waitForLoadState();
        return this.getPageClassInstance(ProjectDiscoveryPage);
    }
}
