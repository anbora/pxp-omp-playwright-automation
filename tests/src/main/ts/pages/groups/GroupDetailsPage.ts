import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { EditGroupPage } from "pages/groups/EditGroupPage";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { CreateJourneyPage } from "pages/journeys/CreateJourneyPage";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { CreatePathwayPage } from "pages/pathways/CreatePathwayPage";
import { PathwayDetailsPage } from "pages/pathways/PathwayDetailsPage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";

export class GroupDetailsPage extends BasePage {
  static pageModel = { pageName: "Group Details Page", url: "/teams/%s" };
    public settings: Locator = this.page.locator("//button[@aria-label='Settings']");
    public manageGroupOption: Locator = this.page.locator("//button[text()='Manage Group']");
    public editGroupOption: Locator = this.page.locator("//div[@class='group-setting-dropdown']/descendant::button[text()='Edit Group']");
    public uploadFileNotification: Locator = this.page.locator("//div[@class='info']/descendant::span[2]");
    public groupNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public sharePathwayInGroupButton: Locator = this.page.locator("//button[starts-with(@class, 'content-text')]/descendant::span[starts-with(@class, 'icon-pathway')]");
    public shareJourneyInGroupButton: Locator = this.page.locator("//button[starts-with(@class, 'content-text')]/descendant::span[starts-with(@class, 'icon-route')]");
    public sharedJourneyTitle: Locator = this.page.locator("//div[@class='card-std-content card-std-content-bigcard journey-tile']/descendant::span[2]");
    public sharedPathwayTitle: Locator = this.page.locator("//div[@class='card-std-content card-std-content-bigcard pack-tile']/descendant::span[2]");
    public groupTitle: Locator = this.page.locator("//div[contains(@class, 'group-info-header')]/descendant::h3");
    public displayAllContentButton: Locator = this.page.locator("//span[starts-with(@class,'language-banner')]/descendant::button");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickSettings(): GroupDetailsPage {
        settings.click();
        return this;
    }

    public clickManageGroupOption(): MembersGroupPage {
        manageGroupOption.click();
        return this.getPageClassInstance(MembersGroupPage);
    }

    public clickEditGroupOption(): EditGroupPage {
        editGroupOption.click();
        return this.getPageClassInstance(EditGroupPage);
    }

    public clickSharePathwayButton(): CreatePathwayPage {
        sharePathwayInGroupButton.click();
        return this.getPageClassInstance(CreatePathwayPage);
    }

    public clickShareJourneyButton(): CreateJourneyPage {
        shareJourneyInGroupButton.click();
        return this.getPageClassInstance(CreateJourneyPage);
    }

    public clickDisplayAllContentButton(): GroupDetailsPage {
        displayAllContentButton.click();
        return this;
    }

    public clickPathwayTitle(): PathwayDetailsPage {
        sharedPathwayTitle.click();
        return this.getPageClassInstance(PathwayDetailsPage);
    }

    public clickJourneyTitle(): JourneyDetailsPage {
        sharedJourneyTitle.click();
        this.pause(2000);
        return this.getPageClassInstance(JourneyDetailsPage);
    }

}
