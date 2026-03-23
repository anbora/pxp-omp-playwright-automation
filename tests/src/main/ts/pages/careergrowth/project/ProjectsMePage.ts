import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { CreateProjectMePage } from "pages/me/CreateProjectMePage";

export class ProjectsMePage extends BasePage {
  static pageModel = { pageName: "Project Me Page", url: "/me/project" };

    public publishedLeftTab: Locator = this.page.locator("//button[text()='Published']");
    public approvalRequestsTab: Locator = this.page.locator("//button[text()='Approval requests']");
    public projectTitleMePage(projectTitle: string): Locator {
      return this.getByRole(AriaRole.BUTTON, projectTitle).build();
    }
    public projectCard: Locator = this.page.locator("//div[@class='me__projects-project-cards-container']");
    public projectTitleMyProjectsPage(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__project-card-header']/h3[text()='%s']", projectTitle);
    }
    public draftsLeftTab: Locator = this.page.locator("//button[@aria-label='Drafts']|//button[text()='Drafts']");
    public closedLeftTab: Locator = this.page.locator("//button[@aria-label='Closed']|//button[text()='Closed']");
    public bookmarkedLeftTab: Locator = this.page.locator("//button[text()='Bookmarked']");
    public projectHorizontalCardStatus(projectTitle: string, projectStatus: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-project-card-meta']/h3[text()='%s']//following-sibling::div[text()='%s']", projectTitle, projectStatus);
    }
    public projectHorizontalCardTitle(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-project-card-meta']/h3[text()='%s']", projectTitle);
    }
    public appliedConfirmationModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Participation confirmed']");
    public projectHorizontalCardDefaultAction(projectTitle: string, defaultAction: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-project-card-meta']/h3[text()='%s']/../following-sibling::div/button[text()='%s']", projectTitle, defaultAction);
    }
    public projectHorizontalCardDropdownMenu(projectTitle: string): Locator {
      return this.getLocatorWithParam("//h3[text()='%s']/parent::div/following-sibling::div/descendant::button[@class = 'dropdown-btn']", projectTitle);
    }
    public projectHorizontalCardAction(projectTitle: string, actionName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-project-card-meta']/h3[text()='%s']/../following-sibling::div/div//div//div/ul/li[text()='%s']", projectTitle, actionName);
    }
    public projectHorizontalCardActionList(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-project-card-meta']/h3[text()='%s']/../following-sibling::div/div//div//div/ul", projectTitle);
    }
    public ownedByMeHorizontalCardProjectTitle(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__owner-project-card-meta']/h3[text()='%s']", projectTitle);
    }
    public ownedByMeHorizontalCardDefaultAction(projectTitle: string, defaultAction: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__owner-project-card-meta']/h3[text()='%s']/../following-sibling::div/button[text()='%s']", projectTitle, defaultAction);
    }
    public ownedByMeHorizontalCardDropdownMenu(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__owner-project-card-meta']/h3[text()='%s']/../following-sibling::div/div/descendant::button", projectTitle);
    }
    public projectActionsDropDownMenu(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__owner-project-card-meta']/h3[text()='%s']/following-sibling::span/../following-sibling::div/div/descendant::button", projectTitle);
    }
    public projectActions(actionName: string): Locator {
      return this.getLocatorWithParam("//ul[@class='tm__project-dropdown-list']/li/button[text()='%s']", actionName);
    }
    public projectUnBookmarkIcon(projectName: string): Locator {
      return this.getLocatorWithParam("//button[@aria-label='%s']//i[@class='icon-bookmark-fill']", projectName);
    }
    public projectOpeningsCountField(projectTitle: string, openingsCount: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__owner-project-card-meta']/h3[text()='%s']//following-sibling::span[2]//span//span[text()='%s']", projectTitle, openingsCount);
    }
    public projectTitleSharedWithMePage(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__shared-project-card-meta']/h3[text()='%s']", projectTitle);
    }
    public projectSharedByUserName(projectTitle: string, userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__shared-project-card-meta']/h3[text()='%s']//following-sibling::div//div//div//following-sibling::div/a[text()='%s']", projectTitle, userName);
    }
    public projectLocation(projectTitle: string, locationName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__shared-project-card-meta']/h3[text()='%s']//following-sibling::span//span[text()='%s']", projectTitle, locationName);
    }
    public projectSharedViewMessageButton(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__shared-project-card-meta']/h3[text()='%s']//following-sibling::div[@class='project-shared-name-list']//button", projectTitle);
    }
    public projectMyProjectsViewMessageButton(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-project-card-meta']/h3[text()='%s']//following-sibling::button[@class='view-message-btn']", projectTitle);
    }
    public appliedConfirmationModalCloseButton: Locator = this.page.locator("//div/button[text()='Close']");
    public shareProjectViewMessageModalHeader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1[text()='Message']|//div[@class='ed-dialog-modal-header']/h2[text()='Message']");
    public myProjectsViewMessageModalHeader(senderUserName: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-dialog-modal-header']/h1[text()='Message from %s']", senderUserName);
    }
    public shareProjectMessageText(messageText: string): Locator {
      return this.getLocatorWithParam("//div[@class='view-message-modal-container-user-info-message']/p[text()='%s']", messageText);
    }
    public myProjectsViewRejectionMessageText(messageText: string): Locator {
      return this.getLocatorWithParam("//div[@class='view-comment-modal-container-comment rejection-comment']/p[text()='%s']", messageText);
    }
    public shareProjectViewMessageCloseModal: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Close']");
    public sharedWithMeTab: Locator = this.page.locator("//button[text()='Shared with me']");
    public myProjectsTab: Locator = this.page.locator("//button[text()='My Projects']");
    public successToastMessage: Locator = this.page.locator("//div[@class = 'success']/span[@id='toast-message']");
    public myProjectsFilter: Locator = this.page.locator("//div[@class='me__projects-container-header']//div//div[@class='ed-dropdown']");
    public myProjectsFilterName(filterName: string): Locator {
      return this.getLocatorWithParam("//div[@class='me__projects-container-header']//div//div[@class='ed-dropdown']//div//div/fieldset/label[@for='%s']", filterName);
    }
    public myProjectsFilterApplyButton: Locator = this.page.locator("//div[@class='me__projects-container-header']//div//div[@class='ed-dropdown']//div//div//div[@class='justflex justify-center']//button[@class='ed-btn ed-btn-primary action-button']");
    public createAProjectButton: Locator = this.page.locator("//button[@class='me__projects-create-project-btn ed-btn ed-btn-neutral' and text()='Create a Project']");
    public editButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral primary-action s-margin-right']");
    public threeDotMenuButton: Locator = this.page.locator("//div[@class='dropdown-wrapper undefined']/button[@class='dropdown-btn']/i");
    public bookmarkProjectButton: Locator = this.page.locator("//button[.='Bookmark']");
    public shareProjectDropdownButton: Locator = this.page.locator("//button[.='Share']");
    public selectIndividualsShareProject: Locator = this.page.locator("//table/tbody/tr[1]/td/div//input");
    public shareProjectButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary']");
    public bookmarkedProjectsEmpty: Locator = this.page.locator("//div[@class='tm-opportunities__no-data']");
    public unbookmarkButton: Locator = this.page.locator("//button[text()='Unbookmark']");
    public closeProjectThreeDotMenu: Locator = this.page.locator("//button[.='Close']");
    public areYouSureCloseProjectButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary']");
    public appliedUserUserName(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']",userName);
    }
    public appliedUserUserRole(userName: string, userRole: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/../following-sibling::span[text()='%s']",userName, userRole );
    }
    public appliedUserUserOrg(userName: string, userOrg: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/../following-sibling::div/span[text()='%s']",userName, userOrg );
    }
    public appliedUserUserLocation(userName: string, userLocation: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/../following-sibling::span[2][text()='%s']",userName, userLocation );
    }
    public appliedUserProjectName(userName: string, projectName: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/ancestor::td/following-sibling::td[@class='applicant-row ']/div/div/a/span[text()='%s']",userName, projectName );
    }
    public appliedUserActionButton(userName: string, actionName: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/ancestor::td/following-sibling::td[@class='applicant-row action']/div/button[text()='%s']",userName, actionName );
    }
    public appliedUserStatusText(userName: string, statusText: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/ancestor::td/following-sibling::td[@class='applicant-row status']/div/div/div[text()='%s']",userName, statusText );
    }
    public appliedUserSeeDetailsButton(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-info']/a/span[text()='%s']/ancestor::td/following-sibling::td[@class='applicant-row status']/div/div/button[@class='see-details-btn']", userName);
    }
    public projectApprover1ApprovalStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//div[@class='approvers-list']/div[1]/div/div[text()='%s']",statusText);
    }
    public projectApprover2ApprovalStatusText(statusText: string): Locator {
      return this.getLocatorWithParam("//div[@class='approvers-list']/div[2]/div/div[text()='%s']",statusText);
    }
    public approvalRequestsFilterButton(selectedFilter: string): Locator {
      return  getLocatorWithParam("//div[@class='ed-dropdown']/div/button/span[text()='%s']", selectedFilter);
    }
    public approvalRequestsFilterDropdownValue(selectedFilter: string, filterValue: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-dropdown']/div/button/span[text()='%s']/../following-sibling::div[@class='dropdown-content']/fieldset/label[@for='%s']",selectedFilter, filterValue);
    }
    public approvalRequestsFilterDropdownApplyButton: Locator = this.page.locator("//div[@class='dropdown-content']/fieldset/following-sibling::div/button[text()='Apply']");
    public approvalRequestsHeader: Locator = this.page.locator("//h2[text()='Approval request']");
    public statusDetailsHeader: Locator = this.page.locator("//h1[text()='Status Details']");
    public approvalModalCloseButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Close']");
    public searchProject: Locator = getByPlaceholder("Search here...").build();
    public searchButton: Locator = getByLabel("Search").build();

    public clickAnActionForAProject(projectTitle: string, actionName: string): ManageProjectPage {
        this.projectActionsDropDownMenu(projectTitle).click();
        this.projectActions(actionName).click();
        return this.getPageClassInstance(ManageProjectPage);
    }

    public searchForProject(projectName: string): ProjectsMePage {
        searchProject.click();
        searchProject.fill(projectName);
        searchButton.click();
        return this;
    }
    public clickAnActionForAProjectCreatePage(projectTitle: string, actionName: string): ProjectsMePage {
        this.projectActionsDropDownMenu(projectTitle).click();
        this.projectActions(actionName).click();
        return this;
    }

    public clickUnBookmarkIconForAProject(projectTitle: string): ProjectsMePage {
        this.projectUnBookmarkIcon(projectTitle).click();
        return this;
    }

    public clickPublishedTab(): ProjectsMePage {
        publishedLeftTab.click();
        this.pause(5000);
        return this;
    }

    public clickDraftTab(): ProjectsMePage {
        draftsLeftTab.click();
        return this;
    }

    public clickClosedTab(): ProjectsMePage {
        closedLeftTab.click();
        this.pause(3000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public waitForProjectCardToBeVisible(): ProjectsMePage {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshCurrentPage(ProjectsMePage);
        }, projectCard, 10, 10000, () => {
            try {
                Thread.sleep(3000);
            } catch (e) {
            }
        });
        this.pause(2000);
        return this;
    }

    public copyCurrentURL(urlContainer: ResultContainer): ProjectsMePage {
        this.page.waitForLoadState();
        urlContainer.setValue(this.page.url());
        return this;
    }

    public clickMyProjectsTab(): ProjectsMePage {
        myProjectsTab.click();
        return this;
    }

    public clickBookmarkedTab(): ProjectsMePage {
        bookmarkedLeftTab.click();
        return this;
    }

    public clickCloseButtonAppliedToAProjectConfModal(): ProjectsMePage {
        appliedConfirmationModalCloseButton.click();
        return this;
    }

    public clickThreeDotMenuButton(): ProjectsMePage {
        threeDotMenuButton.click();
        return this;
    }

    public clickBookmarkButton(): ProjectsMePage {
        bookmarkProjectButton.click();
        return this;
    }

    public clickUnBookmarkButton(): ProjectsMePage {
        unbookmarkButton.click();
        return this;
    }

    public clickCloseProjectThreeDotMenuButton(): ProjectsMePage {
        closeProjectThreeDotMenu.click();
        return this;
    }

    public clickAreYouSureCloseProjectButton(): ProjectsMePage {
        areYouSureCloseProjectButton.click();
        this.pause(500);
        return this;
    }

    public clickShareProjectDropdownButton(): ProjectsMePage {
        shareProjectDropdownButton.click();
        return this;
    }

    public clickSelectIndividualShareProject(): ProjectsMePage {
        selectIndividualsShareProject.click();
        return this;
    }

    public clickShareProject(): ProjectsMePage {
        shareProjectButton.click();
        return this;
    }

    public clickEditButton(): CreateProjectMePage {
        editButton.click();
        return this.getPageClassInstance(CreateProjectMePage);
    }

    public clickDefaultActionInProjectCard(projectTitle: string, defaultAction: string): ProjectsMePage {
        this.projectHorizontalCardDefaultAction(projectTitle,defaultAction).click();
        return this;
    }

    public clickDefaultActionInOwnedByMeProjectCard(projectTitle: string, defaultAction: string): ProjectsMePage {
        this.ownedByMeHorizontalCardDefaultAction(projectTitle,defaultAction).click();
        return this;
    }

    public clickProjectHorizontalCardActionsDropDown(projectTitle: string): ProjectsMePage {
        this.projectHorizontalCardDropdownMenu(projectTitle).click();
        return this;
    }

    public clickOwnedByMeProjectHorizontalCardActionsDropDown(projectTitle: string): ProjectsMePage {
        this.ownedByMeHorizontalCardDropdownMenu(projectTitle).first().click();
        return this;
    }

    public clickProjectHorizontalCardDropDownAction(projectTitle: string, actionName: string): ProjectsMePage {
        this.projectHorizontalCardAction(projectTitle, actionName).first().click();
        return this;
    }

    public <T extends BasePage> clickOwnedByMeProjectHorizontalCardDropDownAction(actionName: string, clazz: Class<T>): T {
        this.projectActions(actionName).first().click();
        return this.getPageClassInstance(clazz);
    }

    public clickMyProjectsFilterDropDown(): ProjectsMePage {
        myProjectsFilter.click();
        return this;
    }

    public selectMyProjectsFilterValue(filterName: string): ProjectsMePage {
        this.myProjectsFilterName(filterName).click();
        return this;
    }

    public clickMyProjectFilterApplyButton(): ProjectsMePage {
        myProjectsFilterApplyButton.click();
        return this;
    }

    public clickSharedWithMeTab(): ProjectsMePage {
        sharedWithMeTab.click();
        return this;
    }

    public clickSharedProjectViewMessage(projectTitle: string): ProjectsMePage {
        this.projectSharedViewMessageButton(projectTitle).click();
        return this;
    }

    public clickMyProjectsViewMessage(projectTitle: string): ProjectsMePage {
        this.projectMyProjectsViewMessageButton(projectTitle).click();
        return this;
    }

    public clickApprovalRequestsTab(): ProjectsMePage {
        approvalRequestsTab.click();
        return this;
    }

    public clickAppliedUserSeeDetailsButton(userName: string): ProjectsMePage {
        this.page.reload();
        this.pause(5000);
        this.appliedUserSeeDetailsButton(userName).click();
        return this;
    }

    public clickAppliedUserSeeDetailsButton_ApprovedFilter(userName: string): ProjectsMePage {
        this.pause(5000);
        this.appliedUserSeeDetailsButton(userName).click();
        return this;
    }

    public ProjectsMePage clickApprovalModalCloseButton()
    {
        approvalModalCloseButton.click();
        return this;
    }

    public ProjectsMePage clickActionEndUser(String userName, String actionName)
    {
        appliedUserActionButton(userName,actionName).click();
        this.page.reload();
        this.pause(5000);
        return this;
    }

    public ProjectsMePage clickApprovalRequestsFilterAndSelectAValue(String currentFilter, String SelectFilter)
    {
        approvalRequestsFilterButton(currentFilter).click();
        approvalRequestsFilterDropdownValue(currentFilter, SelectFilter).click();
        approvalRequestsFilterDropdownApplyButton.click();
        this.page.reload();
        approvalRequestsFilterButton(currentFilter).click();
        approvalRequestsFilterDropdownValue(currentFilter, SelectFilter).click();
        approvalRequestsFilterDropdownApplyButton.click();
        this.page.waitForLoadState();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
