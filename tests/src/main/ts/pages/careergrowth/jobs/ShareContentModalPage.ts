// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator } from "common/testing/playwright";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { InviteTeamMembersPage } from "pages/groups/InviteTeamMembersPage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";

export class ShareContentModalPage extends BasePage {

    private shareUserCheckboxToBeSelected(username: string): Locator {

      return this.getLocatorWithParam("//div[@class='ed-avatar']/descendant::img[contains(@alt, '%s')]/ancestor::label/descendant::input", username);

    }
    public readonly modalHeader: Locator = this.getByTestId("ed-dialog-modal-title");
    private readonly closeModalButton: Locator = this.page.locator("button.ed-dialog-modal-header-close-button");
    public searchForUsersInput: Locator = this.page.locator("//input[@placeholder='Search Users...']");
    public searchIcon: Locator = this.page.locator("//button[@aria-label='Search']");
    public shareButton: Locator = this.page.locator("//button[text()='Share']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public closeModal(): SuggestionsPage_New {
        closeModalButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(SuggestionsPage_New);
    }

	public closeModalAndGoBackToJobVacancyDetailsPage(): JobVacancyDetailsPage {
        closeModalButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public searchForUserToShareContentWith(fullName: string): ShareContentModalPage {
        searchForUsersInput.fill(fullName);
        searchIcon.click();
        return this;
    }

    public selectUserToShareContentWith(username: string): ShareContentModalPage {
        this.shareUserCheckboxToBeSelected(username).click();
        return this;
    }

    public clickShareButton(): SmartCardStandAlonePage {
        shareButton.click();
        return this.getPageClassInstance(SmartCardStandAlonePage);
    }
}
