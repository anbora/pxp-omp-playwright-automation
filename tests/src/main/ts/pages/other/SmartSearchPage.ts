// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { MePageProfile } from "pages/me/MePageProfile";

export class SmartSearchPage extends BasePage {

    public peopleTab: Locator = this.getByRole(AriaRole.TAB, "People");
    public followButton: Locator = this.getByRole(AriaRole.BUTTON, "Follow").first();
    public unfollowButton: Locator = this.getByRole(AriaRole.BUTTON, "Unfollow");

    public userContainer(userName: string): Locator {

      return this.getByText(userName);

    }
    public hoverOverCards(cardName: string): Locator {
      return this.getByRole(AriaRole.BUTTON, cardName).first();
    }
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public visitPeopleTab(): SmartSearchPage {
        peopleTab.click();
        return this;
    }

    public clickFollowButton(): SmartSearchPage {
        followButton.click();
        return this;
    }

    public clickUnfollowButton(): SmartSearchPage {
        unfollowButton.click();
        return this;
    }

	public goToUserProfile(userName: string): MePageProfile {
        this.userContainer(userName).first().click();
        return this.getPageClassInstance(MePageProfile);
    }
}
