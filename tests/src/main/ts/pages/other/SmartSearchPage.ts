import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { MePageProfile } from "pages/me/MePageProfile";

export class SmartSearchPage extends BasePage {

    public peopleTab: Locator = getByRole(AriaRole.TAB, "People").build();
    public followButton: Locator = getByRole(AriaRole.BUTTON, "Follow").build().first();
    public unfollowButton: Locator = getByRole(AriaRole.BUTTON, "Unfollow").build();

    public userContainer(userName: string): Locator {

      return this.getByText(userName).build();

    }
    public hoverOverCards(cardName: string): Locator {
      return this.getByRole(AriaRole.BUTTON, cardName).build().first();
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
