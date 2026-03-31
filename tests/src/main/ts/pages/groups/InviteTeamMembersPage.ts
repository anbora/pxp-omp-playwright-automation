// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export class InviteTeamMembersPage  extends BasePage {
  static pageModel = { pageName: "Invite Team Members Page", url: "/teams/%s/group-invite" };
    private inviteUserToGroupCheckboxToBeSelected(username: string): Locator {
      return this.getLocatorWithParam("//div[@class='user-email']/div[text()='%s']/ancestor::div[4]/label", username);
    }
    public searchForTeamMembers: Locator = this.page.locator("//input[@placeholder='Search for People']");
    public searchIcon: Locator = this.page.locator("//button[@aria-label='Search']");
    public inviteButton: Locator = this.page.locator("//button[text()='Invite']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public searchForUserToBeInvited(fullName: string): InviteTeamMembersPage {
        searchForTeamMembers.fill(fullName);
        searchIcon.click();
        return this;
    }

    public selectUserToBeInvited(username: string): InviteTeamMembersPage {
        this.inviteUserToGroupCheckboxToBeSelected(username).click();
        return this;
    }

    public inviteUser(): InviteTeamMembersPage {
        inviteButton.click();
        return this;
    }
}
