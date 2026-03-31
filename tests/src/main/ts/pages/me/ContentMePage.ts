// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { AbstractMePage } from "pages/me/share/AbstractMePage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";

export class ContentMePage extends AbstractMePage <ContentMePage> {
  static pageModel = { pageName: "Content Me Page", url: "/me/content" };

    public createdCard(cardTitle: string): Locator {

      return this.getLocatorWithParam("//div[starts-with(@id, 'card-title')]/descendant::span[2][text()='%s']", cardTitle);

    }
    public threeDotMenuForSpecificCard(cardTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='insight-dropdown']/descendant::button[contains (@aria-label, '%s')]",cardTitle);
    }
    public bookmarkCardIcon(cardTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@id, 'card-title')]/span/span[text() = '%s']/ancestor::div[contains(@class, 'card-std-tile')]/descendant::i[contains(@class, 'icon-bookmark')]", cardTitle);
    }
    public firstCreatedCard(cardName: string): Locator {
      return this.getLocatorWithParam("//a[1]/div[@class='card-std-text card-std-text-without-thumbnails']/span/span[.='%s']",cardName);
    }
    public threeDotsCardMenu: Locator = this.page.locator("//button[@class='cursor-pointer insight-dropdown-button']");

    public editSmartCard: Locator = this.page.locator("//ul[@role='menu']/descendant::li[contains(text(), 'Edit')]");
    public assignToMe: Locator = this.page.locator("//ul[@role='menu']/li[contains(text(), 'Assign to Me')]");
    public assignButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary']");
    public assignedByMeTab: Locator = this.getByRole(AriaRole.TAB,"Assigned by Me");
    public shareCardButton: Locator = this.page.locator("//button//i[@class='card-icon icon-share1']");
    public shareContentUser: Locator = this.page.locator("//div[3]/div/table/tbody/tr[1]/td/div//input");
    public shareButton: Locator = this.page.locator("//button[text() = 'Share']");
    public sharedByMeTab: Locator = this.getByRole(AriaRole.TAB,"Shared by Me");
    public deleteCard: Locator = this.page.locator("//ul[@role='menu']/li[contains(text(), 'Delete')]");
    public areYouSureDeleteButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-negative']");
    public deletedTab: Locator = this.getByRole(AriaRole.TAB,"Deleted");
    public sharedByMeEmpty: Locator = this.page.locator("//div[@class='margin-auto text-center']");
    public cardNotification: Locator = this.page.locator("//div[@class='success']/descendant::span[2]");
    public cardTile: Locator = this.page.locator("//div[starts-with(@id, 'card-title')]/descendant::span[2]");

    public archiveDate: Locator = this.page.locator("//span[@class='date-range-placeholder']");
    public deletePathway: Locator = this.page.locator("//button[text()='Delete Pathway']");
    public deleteJourney: Locator = this.page.locator("//button[text()='Delete Journey']");
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public clickBookmarkForSmartCard(title: string): ContentMePage {
        this.bookmarkCardIcon(title).click();
        this.pause(3000);
        return this;
    }

    public clickThreeDotsCardMenu(): ContentMePage {
        threeDotsCardMenu.click();
        return this;
    }

    public clickAssignToMe(): ContentMePage {
        assignToMe.click();
        return this;
    }

    public clickAssignButton(): ContentMePage {
        assignButton.click();
        return this;
    }

    public clickAssignedByMeTab(): ContentMePage {
        assignedByMeTab.click();
        return this;
    }

    public clickShareCardButton(): ContentMePage {
        shareCardButton.click();
        return this;
    }

    public clickShareContentUser(): ContentMePage {
        shareContentUser.click();
        this.pause(2000);
        return this;
    }

    public clickShareButton(): ContentMePage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(2000);
        shareButton.first().click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(2000);
        return this;
    }

    public clickSharedByMeTab(): ContentMePage {
        sharedByMeTab.click();
        return this;
    }

    public clickDeleteCard(): ContentMePage {
        deleteCard.click();
        return this;
    }

    public clickAreYouSureDeleteButton(): ContentMePage {
        areYouSureDeleteButton.click();
        return this;
    }

    public clickDeletedTab(): ContentMePage {
        deletedTab.click();
        return this;
    }

    public goToCardStandAloneView(cardTitle: string): SmartCardStandAlonePage {
        this.createdCard(cardTitle).click();
        return this.getPageClassInstance(SmartCardStandAlonePage);
    }

    public clickThreeDotsMenuForSpecificCards(cardTitle: string): ContentMePage {
        this.threeDotMenuForSpecificCard(cardTitle).click();
        return this;
    }

    public confirmPathwayDeletion(): ContentMePage {
        deletePathway.click();
        return this;
    }

    public confirmJourneyDeletion(): ContentMePage {
        deleteJourney.click();
        return this;
    }
}
