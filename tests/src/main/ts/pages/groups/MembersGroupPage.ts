import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Download, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { BulkRemovalPage } from "pages/groups/BulkRemovalPage";
import { InviteTeamMembersPage } from "pages/groups/InviteTeamMembersPage";

export class MembersGroupPage extends BasePage {
  static pageModel = { pageName: "Group Members Page", url: "/teams/%s/members" };

    public optionToSelect(groupMemberName: string): Locator {

      return this.getLocatorWithParam("//select[@aria-label='Select role of %s']", groupMemberName);

    }
    private checkboxToBeSelected(groupMemberName: string): Locator {
      return this.getLocatorWithParam("//select[@aria-label='Select role of %s']/ancestor::tr/descendant::label", groupMemberName);
    }
    public bulkRemovalTab: Locator = this.page.locator("//a[text()='Bulk Removal']");
    public totalNumberOfGroupMembers: Locator = this.page.locator("//div[@class='block grp-member-list']/label");
    public selectedUsersText: Locator = this.page.locator("//div[@class='block grp-member-list']/descendant::p[5]");
    public removeGroupMembersButton: Locator = this.page.locator("//button[text()='Remove']");
    public cancelButton: Locator = this.page.locator("//button[text()='Cancel']");
    public removeButtonInModal: Locator = this.page.locator("//div[@class='content']/descendant::div[5]/button[text()='Remove']");
    public closeButtonInModal: Locator = this.page.locator("//div[@class='content']/descendant::div[5]/button[text()='Close']");
    public confirmationModalText: Locator = this.page.locator("//div[@class='ed-dialog-modal-content ']/descendant::p[1]");
    public inviteTeamMembersButton: Locator = this.page.locator("//button[text()='Invite Team Members']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public changeGroupMemberRole(username: string, role: string): MembersGroupPage {
        this.optionToSelect(username).selectOption(role);
        return this;
    }

    public selectCheckbox(username: string): MembersGroupPage {
        this.checkboxToBeSelected(username).click();
        return this;
    }

    public clickCancelButton(): MembersGroupPage {
        cancelButton.click();
        return this;
    }

    public clickRemoveButton(): MembersGroupPage {
        removeGroupMembersButton.click();
        return this;
    }

    public clickCloseConfirmationModal(): MembersGroupPage {
        closeButtonInModal.click();
        return this;
    }

    public clickRemoveButtonInModal(): MembersGroupPage {
        removeButtonInModal.click();
        return this;
    }

    public clickBulkRemovalTab(): BulkRemovalPage {
        bulkRemovalTab.click();
        return this.getPageClassInstance(BulkRemovalPage);
    }

    public clickInviteTeamMembers(): InviteTeamMembersPage {
        inviteTeamMembersButton.click();
        return this.getPageClassInstance(InviteTeamMembersPage);
    }

}
